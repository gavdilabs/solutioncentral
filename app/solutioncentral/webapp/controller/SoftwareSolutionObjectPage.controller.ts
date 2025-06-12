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
import { DefaultVersionsTableConfig } from "../lib/defaults";
import { MenuBase$BeforeOpenEvent } from "sap/m/table/columnmenu/MenuBase";
import Menu from "sap/m/table/columnmenu/Menu";
import { QuickSort$ChangeEvent } from "sap/m/table/columnmenu/QuickSort";
import { QuickGroup$ChangeEvent } from "sap/m/table/columnmenu/QuickGroup";
import { MessagingUtils } from "../lib/utils/messagingUtils";

export enum DraftSwitchIndex {
	DRAFT = 0,
	SAVED = 1,
}

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral.controller
 */
export default class ObjectPage extends BaseController {
	private draftIndicator: DraftIndicator;
	private draftSwitcherPopover: Popover;
	private itemIndex: number;
	private versionsTableConfig: JSONModel | undefined;
	private versionsPersonalization: SoftwareSolutionPersonalization;
	private messageHandler: MessagingUtils;

	public onInit(): void {
		this.versionsTableConfig = new JSONModel(DefaultVersionsTableConfig);
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
					$expand: "solutionStatus,versions",
				},
				events: {
					dataReceived: () => {
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
						// this.initVersionsPersonalization();
					},
				},
			});
		}
	}

	private initVersionsPersonalization() {
		const versionsTable = this.getView().byId("versionsTable") as Table;

		if (this.versionsPersonalization) return;

		this.getResourceBundle()
			.then((bundle) => {
				this.versionsPersonalization = new SoftwareSolutionPersonalization(
					versionsTable,
					{ key: "column.version", descending: true },
					"/items",
					this.versionsTableConfig,
					bundle,
				);
			})
			.catch((e) => {
				console.error("Failed to configure personalization engine", e);
			});
	}

	public onNavBack() {
		this.getRouter().navTo("main");
	}

	private async handleDiscardDraft(context: Context): Promise<void> {
		this.messageHandler.clearAllMessages();
		const i18n = await this.getResourceBundle();
		const softwareSolutionId = context.getProperty("ID") as string;
		discardDraft(context)
			.then((hasActiveEntity: boolean) => {
				MessageToast.show(i18n.getText("default.draftDiscarded"), {
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

	public async onSaveDraft() {
		this.messageHandler.clearAllMessages();
		const context = this.getView().getBindingContext() as Context;
		const softwareSolutionId = context.getProperty("ID") as string;
		const model = this.getView().getModel() as ODataModel;
		const i18n = await this.getResourceBundle();

		draftActivate(context, model)
			.then(() => {
				MessageToast.show(i18n.getText("default.objectSaved"), {
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

	public async onDeleteSolutionPress(): Promise<void> {
		const context = this.getView().getBindingContext() as Context;
		const i18n = await this.getResourceBundle();
		const name = context.getProperty("name") as string;

		MessageBox.warning(i18n.getText("solution.deleteWarning", [name]), {
			actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
			emphasizedAction: MessageBox.Action.DELETE,
			onClose: (action: string) => {
				if (action === (MessageBox.Action.DELETE as string)) {
					context
						.delete("$auto")
						.then(() => {
							MessageToast.show(i18n.getText("solution.deletedMsg", [name]), {
								closeOnBrowserNavigation: false,
							});
							this.getRouter().navTo("main");
						})
						.catch((e) => {
							throw e;
						});
				}
			},
		});
	}

	public async onRejectSolution(): Promise<void> {
		this.messageHandler.clearAllMessages();
		const model = this.getView().getModel() as ODataModel;
		const i18n = await this.getResourceBundle();
		const context = this.getView().getBindingContext() as Context;
		const operation = model.bindContext(
			"RadarService.rejectSolution(...)",
			context,
		);

		await operation
			.invoke()
			.then(() => {
				MessageToast.show(i18n.getText("solution.rejectedMsg"));
				this.getView().getElementBinding().refresh();
			})
			.catch((e) => {
				console.log("Failed to approve solution", e);
			});
	}

	public async onApproveSolution(): Promise<void> {
		this.messageHandler.clearAllMessages();
		const model = this.getView().getModel() as ODataModel;
		const i18n = await this.getResourceBundle();
		const context = this.getView().getBindingContext() as Context;
		const operation = model.bindContext(
			"RadarService.approveSolution(...)",
			context,
		);

		await operation
			.invoke()
			.then(() => {
				MessageToast.show(i18n.getText("solution.approvedMsg"));
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

	public beforeOpenColumnMenuVersions(event: MenuBase$BeforeOpenEvent) {
		const menu = this.getView().byId("versionsQuickMenu") as Menu;
		this.versionsPersonalization.beforeOpenQuickMenu(event, menu);
	}

	public onSortVersions(event: QuickSort$ChangeEvent) {
		this.versionsPersonalization.onSort(event);
	}

	public onGroupVersions(event: QuickGroup$ChangeEvent) {
		this.versionsPersonalization.onGroup(event);
	}

	public onPressVersionsTableSettings(event: Button$PressEvent): void {
		this.versionsPersonalization.openTableSettings(event);
	}

	public openMessageView(event: Button$PressEvent) {
		this.messageHandler.handleMessageViewOpen(event.getSource());
	}
}
