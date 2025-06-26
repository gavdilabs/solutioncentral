import BaseController from "./BaseController";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import DraftIndicator from "sap/m/DraftIndicator";
import Button, { Button$PressEvent } from "sap/m/Button";
import Context from "sap/ui/model/odata/v4/Context";
import MessageToast from "sap/m/MessageToast";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import {
	activateDraftEdit,
	discardDraft,
	draftActivate,
	getDiscardDraftPopover,
} from "../lib/utils/draftUtils";
import Event from "sap/ui/base/Event";
import Popover from "sap/m/Popover";
import Fragment from "sap/ui/core/Fragment";
import List from "sap/m/List";
import { ListBase$SelectionChangeEvent } from "sap/m/ListBase";
import StandardListItem from "sap/m/StandardListItem";
import MessageBox from "sap/m/MessageBox";
import { Link$PressEvent } from "sap/m/Link";
import Table from "sap/m/Table";
import { SoftwareSolutionPersonalization } from "../lib/utils/personalization";
import JSONModel from "sap/ui/model/json/JSONModel";
import {
	DefaultDependentSolutionTableConfig,
	DefaultTableSearchColumns,
	DefaultTechnologiesTableConfig,
	DefaultVersionsTableConfig,
} from "../lib/defaults";
import { MenuBase$BeforeOpenEvent } from "sap/m/table/columnmenu/MenuBase";
import { QuickSort$ChangeEvent } from "sap/m/table/columnmenu/QuickSort";
import { QuickGroup$ChangeEvent } from "sap/m/table/columnmenu/QuickGroup";
import { MessagingUtils } from "../lib/utils/messagingUtils";
import { CustomControlType } from "../lib/types";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import History from "sap/ui/core/routing/History";
import Breadcrumbs from "sap/m/Breadcrumbs";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import { searchTableColumns } from "../lib/utils/filters";
import Menu from "sap/m/table/columnmenu/Menu";
import ODataListBinding from "sap/ui/model/odata/v2/ODataListBinding";
import { CustomModels, PageKeys } from "../lib/constants";
import { BreadcrumbsHandler } from "../lib/utils/breadcrumbsUtils";

export enum DraftSwitchIndex {
	DRAFT = 0,
	SAVED = 1,
}

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral.controller
 */
export default class SoftwareSolutionObjectPage extends BaseController {
	private readonly VERSION_PERSONALIZATION = "versionsPersonalization";
	private readonly ACTIVE_TECHNOLOGIES_PERSONALIZATION =
		"activeTechnologiesPerso";
	private readonly DEPENDENT_PERSONALIZATION = "dependentSolutionsPerso";

	private readonly VERSIONS_TABLE_ID = "versionsTable";
	private readonly ACTIVE_TECHNOLOGIES_TABLE_ID = "activeTechnologiesTable";
	private readonly DEPENDENT_TABLE_ID = "dependentSolutionsTable";
	private breadCrumbHandler: BreadcrumbsHandler;

	private draftIndicator: DraftIndicator;
	private draftSwitcherPopover: Popover;
	private itemIndex: number;
	private messageHandler: MessagingUtils;
	private i18nBundle: ResourceBundle;

	private defaultSearchColumns: JSONModel | undefined;

	private readonly personalizationInstances = new Map<
		string,
		SoftwareSolutionPersonalization
	>();

	private readonly tableConfigInstances = new Map<string, JSONModel>();

	public onInit(): void {
		this.history = History.getInstance();
		this.tableConfigInstances.set(
			CustomModels.VERSIONS_TABLE_CONFIG,
			new JSONModel(DefaultVersionsTableConfig),
		);
		this.tableConfigInstances.set(
			CustomModels.ACTIVE_TECHNOLOGIES_TABLE_CONFIG,
			new JSONModel(DefaultTechnologiesTableConfig),
		);
		this.tableConfigInstances.set(
			CustomModels.DEPENDENT_TABLE_CONFIG,
			new JSONModel(DefaultDependentSolutionTableConfig),
		);

		this.setModel(
			this.tableConfigInstances.get(CustomModels.VERSIONS_TABLE_CONFIG),
			CustomModels.VERSIONS_TABLE_CONFIG,
		);
		this.setModel(
			this.tableConfigInstances.get(
				CustomModels.ACTIVE_TECHNOLOGIES_TABLE_CONFIG,
			),
			CustomModels.ACTIVE_TECHNOLOGIES_TABLE_CONFIG,
		);
		this.setModel(
			this.tableConfigInstances.get(CustomModels.DEPENDENT_TABLE_CONFIG),
			CustomModels.DEPENDENT_TABLE_CONFIG,
		);
		this.defaultSearchColumns = new JSONModel(DefaultTableSearchColumns);

		this.getRouter()
			.getRoute(PageKeys.SOFTWARE_SOLUTION_OBJECT_PAGE)
			.attachPatternMatched(this.onPatternMatched.bind(this), this);
	}

	private onPatternMatched(event: Route$PatternMatchedEvent): void {
		const args = event.getParameter("arguments") as Record<string, unknown>;
		const key = args["key"] as string;

		if (key == null) {
			this.getRouter().navTo(PageKeys.MAIN_VIEW);
		} else {
			this.getView().bindElement({
				path: `/SoftwareSolution(${key})`,
				parameters: {
					$select: "HasActiveEntity,HasDraftEntity",
					$expand: "solutionStatus,versions,activeVersion",
				},
				events: {
					dataReceived: async () => {
						this.i18nBundle = await this.getResourceBundle();
						this.draftIndicator = this.getView().byId(
							"draftIndicator",
						) as DraftIndicator;

						const model = this.getView().getModel() as ODataModel;
						model.attachPropertyChange(() => {
							this.draftIndicator.showDraftSaving();
							this.draftIndicator.showDraftSaved();
						}, this);

						this.itemIndex = this.getView()
							.getBindingContext()
							.getProperty("IsActiveEntity")
							? DraftSwitchIndex.SAVED
							: DraftSwitchIndex.DRAFT;

						this.messageHandler = new MessagingUtils(this.getView());
						this.messageHandler.clearAllMessages();
						this.breadCrumbHandler = new BreadcrumbsHandler(
							this,
							this.i18nBundle,
						);
						this.setBreadcrumbs();
						this.initTablePersonalizations();
					},
				},
			});
		}
	}

	private setBreadcrumbs() {
		const breadCrumbContainer = this.getView().byId(
			"breadcrumbsContainer",
		) as Breadcrumbs;

		this.breadCrumbHandler.setBreadcrumbLinks(breadCrumbContainer);
	}

	private initTablePersonalizations() {
		this.initVersionsPersonalization();
		this.initTechnologiesPersonalization();
		this.initDependentSolutionsPersonalization();
	}

	private initVersionsPersonalization() {
		const versionsTable = this.getView().byId(this.VERSIONS_TABLE_ID) as Table;

		if (this.personalizationInstances.has(this.VERSION_PERSONALIZATION)) return;

		this.getResourceBundle()
			.then((bundle) => {
				const versionsPersonalization = new SoftwareSolutionPersonalization(
					versionsTable,
					{ key: "column.versionVersion", descending: true },
					"/items",
					this.tableConfigInstances.get(CustomModels.VERSIONS_TABLE_CONFIG),
					bundle,
				);

				this.personalizationInstances.set(
					this.VERSION_PERSONALIZATION,
					versionsPersonalization,
				);
			})
			.catch((e) => {
				console.error(
					"Failed to configure personalization engine Versions table",
					e,
				);
			});
	}

	private initTechnologiesPersonalization() {
		const technoTable = this.getView().byId(
			this.ACTIVE_TECHNOLOGIES_TABLE_ID,
		) as Table;

		if (
			this.personalizationInstances.has(
				this.ACTIVE_TECHNOLOGIES_PERSONALIZATION,
			)
		)
			return;

		this.getResourceBundle()
			.then((bundle) => {
				const technologiesPerso = new SoftwareSolutionPersonalization(
					technoTable,
					{ key: "column.technoName", descending: true },
					"/items",
					this.tableConfigInstances.get(
						CustomModels.ACTIVE_TECHNOLOGIES_TABLE_CONFIG,
					),
					bundle,
				);

				this.personalizationInstances.set(
					this.ACTIVE_TECHNOLOGIES_PERSONALIZATION,
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

	private initDependentSolutionsPersonalization() {
		const dependentSolutionsTable = this.getView().byId(
			this.DEPENDENT_TABLE_ID,
		) as Table;

		if (this.personalizationInstances.has(this.DEPENDENT_PERSONALIZATION))
			return;

		this.getResourceBundle()
			.then((bundle) => {
				const dependentSolutionsPerso = new SoftwareSolutionPersonalization(
					dependentSolutionsTable,
					{ key: "column.dependentName", descending: true },
					"/items",
					this.tableConfigInstances.get(CustomModels.DEPENDENT_TABLE_CONFIG),
					bundle,
				);

				this.personalizationInstances.set(
					this.DEPENDENT_PERSONALIZATION,
					dependentSolutionsPerso,
				);
			})
			.catch((e) => {
				console.error(
					"Failed to configure personalization engine for Dependent Solutions Table",
					e,
				);
			});
	}

	private handleDiscardDraft(context: Context): void {
		this.messageHandler.clearAllMessages();
		const softwareSolutionId = context.getProperty("ID") as string;
		discardDraft(context)
			.then((hasActiveEntity: boolean) => {
				MessageToast.show(this.i18nBundle.getText("default.draftDiscarded"), {
					closeOnBrowserNavigation: false,
				});
				if (hasActiveEntity) {
					this.getRouter().navTo(
						PageKeys.SOFTWARE_SOLUTION_OBJECT_PAGE,
						{
							key: `ID=${softwareSolutionId},IsActiveEntity=true`,
						},
						true,
					);
				} else {
					this.getRouter().navTo(PageKeys.MAIN_VIEW);
				}
			})
			.catch((e) => {
				throw e;
			});
	}

	public async onDiscardDraftPress(event: Button$PressEvent) {
		const context = this.getView().getBindingContext() as Context;
		const bundle = await this.getResourceBundle();

		const discardPopover = getDiscardDraftPopover(
			bundle,
			this.handleDiscardDraft.bind(this, context) as (event: Event) => void,
		);

		this.getView().setBusyIndicatorDelay(0);
		this.getView().setBusy(true);

		discardPopover.attachAfterClose(() => {
			event.getSource().setEnabled(true);
			this.getView().setBusy(false);
		});

		event.getSource().setEnabled(false);
		discardPopover.openBy(event.getSource());
	}

	public async onEditSolution() {
		const activeContext = this.getView().getBindingContext() as Context;
		const model = this.getView().getModel() as ODataModel;
		const draftContext = await activateDraftEdit(activeContext, model);
		this.getRouter().navTo(
			PageKeys.SOFTWARE_SOLUTION_OBJECT_PAGE,
			{
				key: `ID=${draftContext.getProperty("ID")},IsActiveEntity=false`,
			},
			true,
		);
	}

	public onSaveDraft() {
		this.messageHandler.clearAllMessages();
		const context = this.getView().getBindingContext() as Context;
		const softwareSolutionId = context.getProperty("ID") as string;
		const model = this.getView().getModel() as ODataModel;

		draftActivate(context, model)
			.then(() => {
				MessageToast.show(this.i18nBundle.getText("default.objectSaved"), {
					closeOnBrowserNavigation: false,
				});
				this.getRouter().navTo(
					PageKeys.SOFTWARE_SOLUTION_OBJECT_PAGE,
					{
						key: `ID=${softwareSolutionId},IsActiveEntity=true`,
					},
					true,
				);
			})
			.catch((e: Error) => {
				const btn = this.getView().byId("objectPageMessagingBtn") as Button;
				this.messageHandler.handleMessageViewOpen(btn);
			});
	}

	public async onDraftSwitcherPress(event: Button$PressEvent): Promise<void> {
		const button = event.getSource();

		if (!this.draftSwitcherPopover) {
			await this.createDraftSwitcherPopover().then((popover: Popover) => {
				this.draftSwitcherPopover = popover;
				this.openPopover(button);
				this.setDraftSwitcherSelected(this.itemIndex);
			});
		} else {
			this.openPopover(button);
			this.setDraftSwitcherSelected(this.itemIndex);
		}
	}

	private async createDraftSwitcherPopover(): Promise<Popover> {
		const popover = (await Fragment.load({
			id: this.getView()?.getId(),
			name: "com.gavdilabs.techtransmgt.solutioncentral.view.fragments.DraftSwitcher",
			controller: this,
		})) as Popover;

		this.getView()?.addDependent(popover);
		return popover;
	}

	private openPopover(button: Button): void {
		if (this.draftSwitcherPopover) {
			this.draftSwitcherPopover.openBy(button);
		}
	}

	private setDraftSwitcherSelected(itemIndex: number) {
		const list = this.getView().byId("versionList") as List;
		list.setSelectedItem(list.getItems()[itemIndex]);
	}

	public onVersionSelect(event: ListBase$SelectionChangeEvent) {
		this.draftSwitcherPopover.close();
		const selectedItem = event
			.getSource()
			.getSelectedItem() as StandardListItem;
		const isActiveEntity = selectedItem.getId().includes("saved");
		const context = this.getView().getBindingContext() as Context;
		this.getRouter().navTo(
			PageKeys.SOFTWARE_SOLUTION_OBJECT_PAGE,
			{
				key: `ID=${context.getProperty("ID")},IsActiveEntity=${isActiveEntity}`,
			},
			true,
		);
	}

	public onDeleteSolutionPress(): void {
		const context = this.getView().getBindingContext() as Context;
		const name = context.getProperty("name") as string;

		MessageBox.warning(
			this.i18nBundle.getText("solution.deleteWarning", [name]),
			{
				actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.DELETE,
				onClose: (action: string) => {
					if (action === (MessageBox.Action.DELETE as string)) {
						context
							.delete("$auto")
							.then(() => {
								MessageToast.show(
									this.i18nBundle.getText("solution.deletedMsg", [name]),
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

	public async onRejectSolution(): Promise<void> {
		this.messageHandler.clearAllMessages();
		const model = this.getView().getModel() as ODataModel;
		const context = this.getView().getBindingContext() as Context;
		const operation = model.bindContext(
			"RadarService.rejectSolution(...)",
			context,
		);

		await operation
			.invoke()
			.then(() => {
				MessageToast.show(this.i18nBundle.getText("solution.rejectedMsg"));
				this.getView().getElementBinding().refresh();
			})
			.catch((e) => {
				console.log("Failed to approve solution", e);
			});
	}

	public async onApproveSolution(): Promise<void> {
		this.messageHandler.clearAllMessages();
		const model = this.getView().getModel() as ODataModel;
		const context = this.getView().getBindingContext() as Context;
		const operation = model.bindContext(
			"RadarService.approveSolution(...)",
			context,
		);

		await operation
			.invoke()
			.then(() => {
				MessageToast.show(this.i18nBundle.getText("solution.approvedMsg"));
				this.getView().getElementBinding().refresh();
			})
			.catch((e) => {
				console.log("Failed to approve solution", e);
			});
	}

	public onLinkPress(event: Link$PressEvent) {
		const link = event.getSource().getText();
		window.open(link, "_blank");
	}

	public async formatTableTitle(
		i18nTextId: string,
		count: number | string,
	): Promise<string> {
		const resourceBundle = await this.getResourceBundle();
		return resourceBundle.getText(i18nTextId, [!count ? 0 : count]);
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

	public openMessageView(event: Button$PressEvent) {
		this.messageHandler.handleMessageViewOpen(event.getSource());
	}

	public handleChangeEvent(event: Event) {
		this.messageHandler.handleChangeEvent(event.getSource<CustomControlType>());
	}

	public onDependentSolutionTablePress(event: ListItemBase$PressEvent) {
		this.getOwnerComponent().setBreadcrumbNavBack(false);
		const softwareSolutionId = event
			.getSource()
			.getBindingContext()
			.getProperty("dependentSoftwareSolution_ID") as string;

		const currentViewKey = this.breadCrumbHandler.getKeyFromContextPath(
			this.getView().getBindingContext().getPath(),
		);

		this.breadCrumbHandler.createObjectPageLink(
			this.getView().getBindingContext().getProperty("name") as string,
			currentViewKey,
		);

		this.getRouter().navTo(PageKeys.SOFTWARE_SOLUTION_OBJECT_PAGE, {
			key: `ID=${softwareSolutionId},IsActiveEntity=true`,
		});
	}

	public onVersionTableItemPress(event: ListItemBase$PressEvent) {
		this.getOwnerComponent().setBreadcrumbNavBack(false);
		const versionId = event
			.getSource()
			.getBindingContext()
			.getProperty("ID") as string;
		const solution_ID = this.getView()
			.getBindingContext()
			.getProperty("ID") as string;

		const currentViewKey = this.breadCrumbHandler.getKeyFromContextPath(
			this.getView().getBindingContext().getPath(),
		);

		this.breadCrumbHandler.createObjectPageLink(
			this.getView().getBindingContext().getProperty("name") as string,
			currentViewKey,
		);

		this.getRouter().navTo(PageKeys.SOLUTION_VERSION_OBJECT_PAGE, {
			key: `ID=${versionId},solution_ID=${solution_ID},IsActiveEntity=true`,
		});
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
			ID: this.getView().getBindingContext().getProperty("ID") as string,
			path: solutionPath,
		};
		searchTableColumns(event, table, solution, props);
	}

	public onCreateNewDependentSolutionPress(): void {
		this.messageHandler.clearAllMessages();
		const table = this.getView().byId(this.DEPENDENT_TABLE_ID) as Table;
		(table.getBinding("items") as ODataListBinding).create({
			IsActiveEntity: false,
			up__ID: this.getView().getBindingContext().getProperty("ID") as string,
		});
	}

	public onCreateNewVersionPress(): void {
		this.messageHandler.clearAllMessages();
		const table = this.getView().byId(this.VERSIONS_TABLE_ID) as Table;
		(table.getBinding("items") as ODataListBinding).create({
			IsActiveEntity: false,
			solution_ID: this.getView()
				.getBindingContext()
				.getProperty("ID") as string,
		});
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
}
