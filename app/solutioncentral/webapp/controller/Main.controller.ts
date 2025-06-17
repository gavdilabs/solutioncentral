import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import BaseController from "./BaseController";
import Button, { Button$PressEvent } from "sap/m/Button";
import JSONModel from "sap/ui/model/json/JSONModel";
import { CustomModels } from "../lib/constants";
import { DefaultSolutionTableConfig } from "../lib/defaults";
import {
	CustomControlType,
	SolutionCatalogueTableEntry,
	SolutionTableConfig,
	ViewSettingsDialogItem,
} from "../lib/types";
import { SoftwareSolutionFilterConstructor } from "../lib/utils/filters";
import Table from "sap/m/Table";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import { ListBase$SelectionChangeEvent } from "sap/m/ListBase";
import Context from "sap/ui/model/odata/v4/Context";
import MessageBox from "sap/m/MessageBox";
import Spreadsheet from "sap/ui/export/Spreadsheet";
import { getSoftwareSolutionColumnConfig } from "../lib/utils/export";
import Engine from "sap/m/p13n/Engine";
import { SoftwareSolutionPersonalization } from "../lib/utils/personalization";
import { QuickSort$ChangeEvent } from "sap/m/table/columnmenu/QuickSort";
import { QuickGroup$ChangeEvent } from "sap/m/table/columnmenu/QuickGroup";
import { MenuBase$BeforeOpenEvent } from "sap/m/table/columnmenu/MenuBase";
import Menu from "sap/m/table/columnmenu/Menu";
import { SelectionState } from "sap/m/p13n/SelectionController";
import Dialog from "sap/m/Dialog";
import Fragment from "sap/ui/core/Fragment";
import { discardDraft, draftActivate } from "../lib/utils/draftUtils";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import { MessagingUtils } from "../lib/utils/messagingUtils";
import Event from "sap/ui/base/Event";

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral.controller
 */
export default class Main extends BaseController {
	private readonly TABLE_ID = "solutionCatalogueTable";

	private tableConfigModel: JSONModel | undefined;
	private softwareSolutionPersonalization: SoftwareSolutionPersonalization;
	private createSoftwareSolutionDialog: Dialog;
	private messageHandler: MessagingUtils;

	public onInit(): void {
		this.tableConfigModel = new JSONModel(DefaultSolutionTableConfig);
		this.setModel(this.tableConfigModel, CustomModels.SOLUTION_TABLE_CONFIG);
		this.getRouter()
			.getRoute("main")
			.attachPatternMatched(this._onPatternMatched.bind(this), this);
	}

	private _onPatternMatched(): void {
		this.messageHandler = new MessagingUtils(this.getView());
		this.messageHandler.clearAllMessages();
		const table = this.getView().byId("solutionCatalogueTable") as Table;
		if (table.getBinding("items").isSuspended()) {
			table.getBinding("items").resume();
		} else {
			table.getBinding("items").refresh();
		}

		if (this.softwareSolutionPersonalization) return;

		this.getResourceBundle()
			.then((bundle) => {
				this.softwareSolutionPersonalization =
					new SoftwareSolutionPersonalization(
						table,
						{ key: "column.name", descending: false },
						"/items",
						this.tableConfigModel,
						bundle,
					);
			})
			.catch((e) => {
				console.error("Failed to configure personalization engine", e);
			});
	}

	public beforeOpenColumnMenu(event: MenuBase$BeforeOpenEvent) {
		const menu = this.getView().byId("menu") as Menu;
		this.softwareSolutionPersonalization.beforeOpenQuickMenu(event, menu);
	}

	public onSort(event: QuickSort$ChangeEvent) {
		this.softwareSolutionPersonalization.onSort(event);
	}

	public onGroup(event: QuickGroup$ChangeEvent) {
		this.softwareSolutionPersonalization.onGroup(event);
	}

	public async formatTableTitle(count: number | string): Promise<string> {
		const resourceBundle = await this.getResourceBundle();
		return resourceBundle.getText("table.solutionCatalogue", [count]);
	}

	public onTableSelect(event: ListBase$SelectionChangeEvent): void {
		const source = event.getSource();
		const selected = source.getSelectedItems();
		const entries = selected.map(
			(el) => el.getBindingContext().getObject() as SolutionCatalogueTableEntry,
		);

		this.tableConfigModel.setProperty("/selectedItems", entries);
	}

	public onTableItemPress(event: ListItemBase$PressEvent): void {
		// TODO: Implement
		const context = event.getSource().getBindingContext() as Context;
		const softwareSolutionID = context.getProperty("ID") as string;
		const hasDraftEntity = context.getProperty("HasActiveEntity") as boolean;

		this.getRouter().navTo("softwareSolutionObjectPage", {
			key: `ID=${softwareSolutionID},IsActiveEntity=${!hasDraftEntity}`,
		});
	}

	public async onPressCreate(): Promise<void> {
		this.messageHandler.clearAllMessages();
		const companyConfig =
			await this.getOwnerComponent().getCompanyConfiguration();

		const hasApprovalFlow = companyConfig?.approvalFlow_code === 1;

		const table = this.getView().byId(this.TABLE_ID) as Table;
		const context = (table.getBinding("items") as ODataListBinding).create({
			IsActiveEntity: false,
		});

		await context
			.created()
			.then(async () => {
				if (hasApprovalFlow) {
					await this.handleCreateForApprovalFlow(context);
				} else {
					this.handleCreateForNoneApprovalFlow(context);
				}
			})
			.catch((e) => {
				console.error("Failed during create of Software Solution draft. ", e);
			});
	}

	private async handleCreateForApprovalFlow(context: Context): Promise<void> {
		if (!this.createSoftwareSolutionDialog) {
			this.createSoftwareSolutionDialog = (await Fragment.load({
				id: "CreateSoftwareSolutionDialog",
				name: "com.gavdilabs.techtransmgt.solutioncentral.view.fragments.CreateSoftwareSolutionDialog",
				controller: this,
			})) as Dialog;

			this.getView().addDependent(this.createSoftwareSolutionDialog);
		}

		this.createSoftwareSolutionDialog.setBindingContext(context);
		this.createSoftwareSolutionDialog.open();
	}

	private handleCreateForNoneApprovalFlow(context: Context) {
		this.getRouter().navTo("softwareSolutionObjectPage", {
			key: `ID=${context.getProperty("ID")},IsActiveEntity=false`,
		});
	}

	public async onPressDelete(): Promise<void> {
		const resourceBundle = await this.getResourceBundle();

		MessageBox.confirm(resourceBundle.getText("confirmation.listDelete"), {
			onClose: (action: unknown) => {
				if (action !== MessageBox.Action.OK) return;

				const table = this.getView().byId(this.TABLE_ID) as Table;
				const selected = table.getSelectedItems();

				for (const el of selected) {
					const ctx = el.getBindingContext() as Context;
					ctx.delete().catch((e) => {
						console.error("Failed to delete entry", e);
					});
				}
			},
		});
	}

	public onPressTableSettings(event: Button$PressEvent): void {
		this.softwareSolutionPersonalization.openTableSettings(event);
	}

	public async onPressTableExport(): Promise<void> {
		const resourceBundle = await this.getResourceBundle();
		const table = this.getView().byId(this.TABLE_ID) as Table;
		const binding = table.getBinding("items") as ODataListBinding;
		const state = await Engine.getInstance().retrieveState(table);
		const selectedColumnP13nKeys = new Set(
			(state.controller.Columns as Array<SelectionState>).map((el) => el.key),
		);
		const configColumns = this.tableConfigModel.getProperty(
			"/items",
		) as Array<ViewSettingsDialogItem>;

		if (!configColumns) return;

		const visibleColumns = configColumns
			.filter((el) => selectedColumnP13nKeys.has(el.key))
			.map((el) => el.path);

		const spreadsheet = new Spreadsheet({
			workbook: {
				columns: getSoftwareSolutionColumnConfig(
					visibleColumns,
					resourceBundle,
				),
				hierarchyLevel: "Level",
			},
			dataSource: binding,
			fileName: resourceBundle.getText("sheet.softwareSolutionFileName"),
			showProgress: true,
		});

		spreadsheet
			.build()
			.catch((e) => {
				console.error("Failed to build spreadsheet", e);
			})
			.finally(() => {
				spreadsheet.destroy();
			});
	}

	public onFilterBarClear(): void {
		this.tableConfigModel.setProperty("/filters", {});
		this.tableConfigModel.setProperty("/search", undefined);
		this.onFilterBarSearch();
	}

	public onFilterBarSearch(): void {
		const configData = this.tableConfigModel.getData() as SolutionTableConfig;
		const filter = SoftwareSolutionFilterConstructor.constructFilter(
			configData.filters,
		);
		const table = this.getView().byId(this.TABLE_ID) as Table;

		if (!table) {
			console.error("Failed to locate table for filtering");
			return;
		}

		const binding = table.getBinding("items") as ODataListBinding;
		binding.changeParameters({
			$search: configData.search,
		});

		binding.filter(filter ?? undefined);
	}

	public handleCreateDialogCancel(event: Button$PressEvent): void {
		const context = event.getSource().getBindingContext() as Context;
		this.createSoftwareSolutionDialog.close();
		discardDraft(context).catch((e) => {
			throw e;
		});
	}

	public handleCreateDialogConfirm(event: Button$PressEvent): void {
		this.messageHandler.clearAllMessages();
		const context = event.getSource().getBindingContext() as Context;
		const softwareSolutionId = context.getProperty("ID") as string;
		const model = this.getView().getModel() as ODataModel;
		draftActivate(context, model)
			.then(() => {
				this.createSoftwareSolutionDialog.close();
				this.getRouter().navTo(
					"softwareSolutionObjectPage",
					{
						key: `ID=${softwareSolutionId},IsActiveEntity=true`,
					},
					true,
				);
			})
			.catch(() => {
				const btn = Fragment.byId(
					"CreateSoftwareSolutionDialog",
					"createSolutionDialogMessageBtn",
				) as Button;
				this.messageHandler.handleMessageViewOpen(btn);
			});
	}

	public openMessageView(event: Button$PressEvent) {
		this.messageHandler.handleMessageViewOpen(event.getSource());
	}

	public handleChangeEvent(event: Event) {
		this.messageHandler.handleChangeEvent(event.getSource<CustomControlType>());
	}
}
