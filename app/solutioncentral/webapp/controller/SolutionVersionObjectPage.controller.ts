import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import BaseController from "./BaseController";
import { CustomModels, PageKeys, TableKeys } from "../lib/constants";
import { MessagingUtils } from "../lib/utils/messagingUtils";
import Table from "sap/m/Table";
import { SoftwareSolutionPersonalization } from "../lib/utils/personalization";
import JSONModel from "sap/ui/model/json/JSONModel";
import {
	DefaultTableSearchColumns,
	DefaultTechnologiesTableConfig,
} from "../lib/defaults";
import { QuickSort$ChangeEvent } from "sap/m/table/columnmenu/QuickSort";
import { QuickGroup$ChangeEvent } from "sap/m/table/columnmenu/QuickGroup";
import { Button$PressEvent } from "sap/m/Button";
import { CustomControlType } from "../lib/types";
import Event from "sap/ui/base/Event";
import { ListBase$SelectionChangeEvent } from "sap/m/ListBase";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import { searchTableColumns } from "../lib/utils/filters";
import MessageBox from "sap/m/MessageBox";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import Validator from "learnin/ui5/validator/Validator";
import Context from "sap/ui/model/odata/v4/Context";
import { BreadcrumbsHandler } from "../lib/utils/breadcrumbsUtils";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Breadcrumbs from "sap/m/Breadcrumbs";
import { MenuBase$BeforeOpenEvent } from "sap/m/table/columnmenu/MenuBase";
import Menu from "sap/m/table/columnmenu/Menu";
import MessageToast from "sap/m/MessageToast";
import Dialog from "sap/m/Dialog";
import { ReviewTypes, ReviewUtils } from "../lib/utils/reviewUtils";

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral.controller
 */
export default class SolutionVersionObjectPage extends BaseController {
	private readonly TECHNOLOGIES_PERSONALIZATION = "technologiesPerso";

	private messageHandler: MessagingUtils;
	private defaultSearchColumns: JSONModel | undefined;
	private validator: Validator;
	private i18nBundle: ResourceBundle;
	private breadCrumbHandler: BreadcrumbsHandler;
	private reviewUtils: ReviewUtils;

	private readonly personalizationInstances = new Map<
		string,
		SoftwareSolutionPersonalization
	>();
	private readonly tableConfigInstances = new Map<string, JSONModel>();

	onInit(): void {
		this.validator = new Validator();
		this.tableConfigInstances.set(
			CustomModels.TECHNOLOGIES_TABLE_CONFIG,
			new JSONModel(DefaultTechnologiesTableConfig),
		);
		this.setModel(
			this.tableConfigInstances.get(CustomModels.TECHNOLOGIES_TABLE_CONFIG),
			CustomModels.TECHNOLOGIES_TABLE_CONFIG,
		);

		this.defaultSearchColumns = new JSONModel(DefaultTableSearchColumns);

		this.getRouter()
			.getRoute(PageKeys.SOLUTION_VERSION_OBJECT_PAGE)
			.attachPatternMatched(this.onPatternMatched.bind(this), this);
	}

	private onPatternMatched(event: Route$PatternMatchedEvent): void {
		const args = event.getParameter("arguments") as Record<string, unknown>;
		const key = args["key"] as string;

		if (key == null) {
			window.history.go(-1);
		} else {
			this.getView().bindElement({
				path: `/SolutionVersion(${key})`,
				parameters: {
					$expand: "technologies",
					$$updateGroupId: "solutionVersionGroup",
				},
				events: {
					dataReceived: async () => {
						this.i18nBundle = await this.getResourceBundle();
						this.messageHandler = new MessagingUtils(this.getView());
						this.messageHandler.clearAllMessages();
						this.breadCrumbHandler = new BreadcrumbsHandler(
							this,
							this.i18nBundle,
						);
						this.setBreadcrumbs();
						this.initTablePersonalizations();
						this.reviewUtils = new ReviewUtils(
							this.getView(),
							ReviewTypes.VERSION_REVIEW,
							this.i18nBundle,
							this.messageHandler,
						);
					},
				},
			});
		}
	}

	private setBreadcrumbs() {
		const breadCrumbContainer = this.getView().byId(
			"breadcrumbsContainerVersions",
		) as Breadcrumbs;

		this.breadCrumbHandler.setBreadcrumbLinks(breadCrumbContainer);
	}

	private initTablePersonalizations() {
		const technologiesTable = this.getView().byId(
			TableKeys.TECHNOLOGIES_TABLE_ID,
		) as Table;

		if (this.personalizationInstances.has(TableKeys.TECHNOLOGIES_TABLE_ID))
			return;

		this.getResourceBundle()
			.then((bundle) => {
				const technologiesPerso = new SoftwareSolutionPersonalization(
					technologiesTable,
					{ key: "column.technoName", descending: true },
					"/items",
					this.tableConfigInstances.get(CustomModels.TECHNOLOGIES_TABLE_CONFIG),
					bundle,
				);

				this.personalizationInstances.set(
					this.TECHNOLOGIES_PERSONALIZATION,
					technologiesPerso,
				);
			})
			.catch((e) => {
				console.error(
					"Failed to configure personalization engine for Technologies Table",
					e,
				);
			});
	}

	public async formatTableTitle(
		i18nTextId: string,
		count: number | string,
	): Promise<string> {
		const resourceBundle = await this.getResourceBundle();
		return resourceBundle.getText(i18nTextId, [!count ? 0 : count]);
	}

	public onSort(event: QuickSort$ChangeEvent, persEngineKey: string) {
		this.personalizationInstances.get(persEngineKey).onSort(event);
	}

	public onGroup(event: QuickGroup$ChangeEvent, persEngineKey: string) {
		this.personalizationInstances.get(persEngineKey).onGroup(event);
	}

	public onPressTableSettings(
		event: Button$PressEvent,
		persEngineKey: string,
	): void {
		this.personalizationInstances.get(persEngineKey).openTableSettings(event);
	}

	public beforeOpenColumnMenu(
		event: MenuBase$BeforeOpenEvent,
		persEngineKey: string,
	) {
		const menu = event.getSource();
		this.personalizationInstances
			.get(persEngineKey)
			.beforeOpenQuickMenu(event, menu as Menu);
	}

	public openMessageView(event: Button$PressEvent) {
		this.messageHandler.handleMessageViewOpen(event.getSource());
	}

	public handleChangeEvent(event: Event) {
		this.messageHandler.handleChangeEvent(event.getSource<CustomControlType>());
	}

	public onEditSolutionVersion() {
		const versionHeaderInfoSection = this.getView().byId(
			"versionHeaderInfoSection",
		) as ObjectPageSection;
		const objectPage = this.getView().byId(
			"solutionVersionObjectPage",
		) as ObjectPageLayout;
		const appConfig = this.getModel("appConfig") as JSONModel;
		appConfig.setProperty("/versionViewEditMode", true);

		objectPage.setSelectedSection(versionHeaderInfoSection);
	}

	public onTableSelect(
		event: ListBase$SelectionChangeEvent,
		modelKey: string,
	): void {
		const source = event.getSource();
		const selected = source.getSelectedItems();
		const entries = selected.map((el) => el.getBindingContext().getObject());

		this.tableConfigInstances
			.get(modelKey)
			.setProperty("/selectedItems", entries);
	}

	public onSearchFieldChange(
		event: SearchField$SearchEvent,
		tableId: string,
		solutionPath: string,
	) {
		const props = (
			this.defaultSearchColumns.getData() as Record<string, unknown>
		)[tableId] as string[];
		const table = this.getView().byId(tableId) as Table;
		const solution = {
			ID: this.getView()
				.getBindingContext()
				.getProperty("solution_ID") as string,
			path: solutionPath,
		};
		searchTableColumns(event, table, solution, props);
	}

	public async onCancelVersionEdit() {
		const model = this.getView().getModel() as ODataModel;
		const appConfig = this.getView().getModel("appConfig") as JSONModel;
		const i18n = await this.getResourceBundle();
		if (model.hasPendingChanges()) {
			MessageBox.warning(i18n.getText("solutionVersion.editCancel"), {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: (action: string) => {
					if (action === (MessageBox.Action.OK as string)) {
						model.resetChanges("solutionVersionGroup");
						appConfig.setProperty("/versionViewEditMode", false);
					}
				},
			});
		} else {
			appConfig.setProperty("/versionViewEditMode", false);
		}
	}

	public onCreateNewTechnologyPress(): void {
		this.messageHandler.clearAllMessages();
		const table = this.getView().byId(TableKeys.TECHNOLOGIES_TABLE_ID) as Table;
		const context = (table.getBinding("items") as ODataListBinding).create({
			softwareVersion_solution_ID: this.getView()
				.getBindingContext()
				.getProperty("solution_ID") as string,
		});

		context.created().catch((e) => {
			if (!(e as Record<string, unknown>).canceled) {
				throw e;
			}
		});
	}

	public async onSaveSolutionVersion(): Promise<void> {
		const view = this.getView();
		this.validator.removeErrors(view);
		this.getOwnerComponent().removeAllTechnicalMessages();

		if (
			!this.validator.validate(view, {
				isDoConstraintsValidation: true,
			}) ||
			this.getOwnerComponent().hasErrorMessages()
		) {
			this.messageHandler.removeDuplicateMessagesByTarget();
			return;
		}

		const model = this.getView().getModel() as ODataModel;
		const appConfig = this.getView().getModel("appConfig") as JSONModel;

		await model.submitBatch("solutionVersionGroup").then(() => {
			appConfig.setProperty("/versionViewEditMode", false);

			const bindingPath = this.getView().getElementBinding().getPath();
			this.rebindView(bindingPath);
		});
	}

	private rebindView(path: string) {
		if (this.getView().getObjectBinding()) this.getView().unbindObject();
		this.getView().bindElement({
			path: path,
			parameters: {
				$expand: "technologies",
				$$updateGroupId: "solutionVersionGroup",
			},
		});
	}

	public onDeleteTableEntry(event: Button$PressEvent, tableId: string): void {
		const table = this.getView().byId(tableId) as Table;
		const selectedItems = table.getSelectedContexts() as Context[];

		MessageBox.warning("Delete selected objects?", {
			actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
			emphasizedAction: MessageBox.Action.DELETE,
			onClose: (action: string) => {
				if (action === (MessageBox.Action.DELETE as string)) {
					this.tableConfigInstances
						.get(`${tableId}Config`)
						.setProperty("/selectedItems", []);

					selectedItems.forEach((item) => {
						item.delete("$auto").catch((e) => {
							throw e;
						});
					});
				}
			},
		});
	}

	public onDeleteSolutionVersion(): void {
		const context = this.getView().getBindingContext() as Context;
		const version = context.getProperty("version") as string;

		MessageBox.warning(
			this.i18nBundle.getText("solution.deleteWarning", [version]),
			{
				actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.DELETE,
				onClose: (action: string) => {
					if (action === (MessageBox.Action.DELETE as string)) {
						context
							.delete("$auto")
							.then(() => {
								MessageToast.show(
									this.i18nBundle.getText("solutionVersion.deletedMsg", [
										version,
									]),
									{
										closeOnBrowserNavigation: false,
									},
								);
								this.getRouter().navTo(PageKeys.MAIN_VIEW);
							})
							.catch((e) => {
								throw e;
							});
					}
				},
			},
		);
	}

	public async onRejectSolutionVersion(): Promise<void> {
		this.messageHandler.clearAllMessages();
		const model = this.getView().getModel() as ODataModel;
		const context = this.getView().getBindingContext() as Context;
		const operation = model.bindContext(
			"RadarService.rejectVersion(...)",
			context,
		);

		await operation
			.invoke()
			.then(() => {
				MessageToast.show(
					this.i18nBundle.getText("solutionVersion.rejectedMsg"),
				);
				this.getView().getElementBinding().refresh();
			})
			.catch((e) => {
				console.log("Failed to approve solution", e);
			});
	}

	public async onApproveSolutionVersion(): Promise<void> {
		this.messageHandler.clearAllMessages();
		const model = this.getView().getModel() as ODataModel;
		const context = this.getView().getBindingContext() as Context;
		const operation = model.bindContext(
			"RadarService.approveVersion(...)",
			context,
		);

		await operation
			.invoke()
			.then(() => {
				MessageToast.show(
					this.i18nBundle.getText("solutionVersion.approvedMsg"),
				);
				this.getView().getElementBinding().refresh();
			})
			.catch((e) => {
				console.log("Failed to approve solution", e);
			});
	}

	public onReviewVersionPress(): void {
		this.reviewUtils.openDialog(this.getView().getBindingContext() as Context);
	}
}
