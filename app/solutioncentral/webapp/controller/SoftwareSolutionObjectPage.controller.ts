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
import Link, { Link$PressEvent } from "sap/m/Link";
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

export enum DraftSwitchIndex {
	DRAFT = 0,
	SAVED = 1,
}

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral.controller
 */
export default class ObjectPage extends BaseController {
	private readonly VERSION_PERSONALIZATION = "versionsPersonalization";
	private readonly TECHNOLOGIES_PERSONALIZATION = "technologiesPerso";
	private readonly DEPENDENT_PERSONALIZATION = "dependentSolutionsPerso";

	private draftIndicator: DraftIndicator;
	private draftSwitcherPopover: Popover;
	private itemIndex: number;
	private messageHandler: MessagingUtils;
	private history: History;
	private i18nBundle: ResourceBundle;

	private versionsTableConfig: JSONModel | undefined;
	private technologiesTableConfig: JSONModel | undefined;
	private dependentSolutionsTableConfig: JSONModel | undefined;
	private defaultSearchColumns: JSONModel | undefined;

	private versionsPersonalization: SoftwareSolutionPersonalization;
	private technologiesPerso: SoftwareSolutionPersonalization;
	private dependentSolutionsPerso: SoftwareSolutionPersonalization;
	private readonly personalizationInstances = new Map<
		string,
		SoftwareSolutionPersonalization
	>();

	public onInit(): void {
		this.history = History.getInstance();
		this.versionsTableConfig = new JSONModel(DefaultVersionsTableConfig);
		this.technologiesTableConfig = new JSONModel(
			DefaultTechnologiesTableConfig,
		);
		this.dependentSolutionsTableConfig = new JSONModel(
			DefaultDependentSolutionTableConfig,
		);
		this.defaultSearchColumns = new JSONModel(DefaultTableSearchColumns);

		this.getRouter()
			.getRoute("softwareSolutionObjectPage")
			.attachPatternMatched(this.onPatternMatched.bind(this), this);
	}

	private onPatternMatched(event: Route$PatternMatchedEvent): void {
		const args = event.getParameter("arguments") as Record<string, unknown>;
		const key = args["key"] as string;

		if (key == null) {
			this.getRouter().navTo("main");
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
						this.createBreadcrumbs();
						this.initTablePersonalizations();
					},
				},
			});
		}
	}

	private createBreadcrumbs() {
		const breadCrumbContainer = this.getView().byId(
			"breadcrumbsContainer",
		) as Breadcrumbs;

		const previousHash = this.history.getPreviousHash();
		const id = previousHash?.substring(
			previousHash.indexOf("ID=") + 3,
			previousHash.indexOf(",") || undefined,
		);

		// If id is not present > meaning a refresh on objectpage
		// Set breadcrumb to navigate to main view
		if (!id) {
			breadCrumbContainer.removeAllLinks();
			breadCrumbContainer.addLink(
				new Link({
					text: this.i18nBundle.getText("breadcrumb.solutions"),
					press: () => this.navToMain(),
				}),
			);
			return;
		}

		if (!this.getOwnerComponent().getBreadcrumbNavBack()) {
			// Navigation from main view
			if (!previousHash || previousHash === "") {
				breadCrumbContainer.removeAllLinks();
				breadCrumbContainer.addLink(
					new Link({
						text: this.i18nBundle.getText("breadcrumb.solutions"),
						press: () => this.navToMain(),
					}),
				);
			} else {
				breadCrumbContainer.addLink(
					new Link({
						text: id,
						press: (event: Link$PressEvent) => this.navToObjectPage(event, id),
					}),
				);
			}
		}
	}

	private navToObjectPage(event: Link$PressEvent, id: string) {
		const breadcrumbContainer = event.getSource().getParent() as Breadcrumbs;
		breadcrumbContainer.removeLink(event.getSource());
		this.getOwnerComponent().setBreadcrumbNavBack(true);
		this.getRouter().navTo("softwareSolutionObjectPage", {
			key: `ID=${id},IsActiveEntity=true`,
		});
	}

	private navToMain(): void {
		this.getRouter().navTo("main");
	}

	private initTablePersonalizations() {
		this.initVersionsPersonalization();
		this.initTechnologiesPersonalization();
		this.initDependentSolutionsPersonalization();
	}

	private initVersionsPersonalization() {
		const versionsTable = this.getView().byId("versionsTable") as Table;

		if (this.personalizationInstances.has(this.VERSION_PERSONALIZATION)) return;

		this.getResourceBundle()
			.then((bundle) => {
				const versionsPersonalization = new SoftwareSolutionPersonalization(
					versionsTable,
					{ key: "column.versionVersion", descending: true },
					"/items",
					this.versionsTableConfig,
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
		const technoTable = this.getView().byId("technologiesTable") as Table;

		if (this.personalizationInstances.has(this.TECHNOLOGIES_PERSONALIZATION))
			return;

		this.getResourceBundle()
			.then((bundle) => {
				const technologiesPerso = new SoftwareSolutionPersonalization(
					technoTable,
					{ key: "column.technoName", descending: true },
					"/items",
					this.technologiesTableConfig,
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

	private initDependentSolutionsPersonalization() {
		const dependentSolutionsTable = this.getView().byId(
			"dependentSolutionsTable",
		) as Table;

		if (this.personalizationInstances.has(this.DEPENDENT_PERSONALIZATION))
			return;

		this.getResourceBundle()
			.then((bundle) => {
				const dependentSolutionsPerso = new SoftwareSolutionPersonalization(
					dependentSolutionsTable,
					{ key: "column.dependentName", descending: true },
					"/items",
					this.dependentSolutionsTableConfig,
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

	private handleDiscardDraft(context: Context): Promise<void> {
		this.messageHandler.clearAllMessages();
		const softwareSolutionId = context.getProperty("ID") as string;
		discardDraft(context)
			.then((hasActiveEntity: boolean) => {
				MessageToast.show(this.i18nBundle.getText("default.draftDiscarded"), {
					closeOnBrowserNavigation: false,
				});
				if (hasActiveEntity) {
					this.getRouter().navTo(
						"softwareSolutionObjectPage",
						{
							key: `ID=${softwareSolutionId},IsActiveEntity=true`,
						},
						true,
					);
				} else {
					this.getRouter().navTo("main");
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
			"softwareSolutionObjectPage",
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
					"softwareSolutionObjectPage",
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
			"softwareSolutionObjectPage",
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
								this.getRouter().navTo("main");
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
		return resourceBundle.getText(i18nTextId, [count]);
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

		this.getRouter().navTo("softwareSolutionObjectPage", {
			key: `ID=${softwareSolutionId},IsActiveEntity=true`,
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
}
