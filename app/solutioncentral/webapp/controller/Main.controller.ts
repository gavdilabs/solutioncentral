import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import BaseController from "./BaseController";
import { Button$PressEvent } from "sap/m/Button";
import JSONModel from "sap/ui/model/json/JSONModel";
import { CustomModels } from "../lib/constants";
import { DefaultSolutionTableConfig } from "../lib/defaults";
import {
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

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral.controller
 */
export default class Main extends BaseController {
	private readonly TABLE_ID = "solutionCatalogueTable";

	private tableConfigModel: JSONModel | undefined;
	private softwareSolutionPersonalization: SoftwareSolutionPersonalization;

	public onInit(): void {
		this.tableConfigModel = new JSONModel(DefaultSolutionTableConfig);
		this.setModel(this.tableConfigModel, CustomModels.SOLUTION_TABLE_CONFIG);
		this.getRouter()
			.getRoute("main")
			.attachPatternMatched(this._onPatternMatched.bind(this), this);
	}

	private _onPatternMatched(): void {
		const table = this.getView().byId("solutionCatalogueTable") as Table;
		this.getResourceBundle()
			.then((bundle) => {
				this.softwareSolutionPersonalization =
					new SoftwareSolutionPersonalization(
						table,
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
	}

	public onPressCreate(event: Button$PressEvent): void {
		// TODO: Implement
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
}
