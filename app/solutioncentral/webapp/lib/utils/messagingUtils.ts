import Bar from "sap/m/Bar";
import Button, { Button$PressEvent } from "sap/m/Button";
import { ButtonType, PlacementType } from "sap/m/library";
import MessageItem from "sap/m/MessageItem";
import MessageView, {
	MessageView$ActiveTitlePressEvent,
} from "sap/m/MessageView";
import Popover from "sap/m/Popover";
import Control from "sap/ui/core/Control";
import IconPool from "sap/ui/core/IconPool";
import Message from "sap/ui/core/message/Message";
import MessageProcessor from "sap/ui/core/message/MessageProcessor";
import Messaging from "sap/ui/core/Messaging";
import View from "sap/ui/core/mvc/View";
import MessageModel from "sap/ui/model/message/MessageModel";
import { CustomControlType, CustomMessageType } from "../types";
import { ValueState } from "sap/ui/core/library";
import Table from "sap/ui/table/Table";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * Generic function for creating messaging open button from controller
 * @param {string} id
 * @returns {button}
 */
export function createMessagingButtonFromController(
	id: string,
	messagingHandler: MessagingUtils,
): Button {
	const button = new Button({
		id: id,
		press: (event: Button$PressEvent) =>
			messagingHandler.handleMessageViewOpen(event.getSource()),
	});

	button.bindProperty("text", {
		path: "message>/",
		formatter: (messages: Message[]) => {
			return messages ? messages.length : 0;
		},
	});

	button.bindProperty("icon", {
		path: "message>/",
		formatter: (messages: Message[]) => {
			return messages && messages.length > 0
				? IconPool.getIconURI("error")
				: IconPool.getIconURI("sys-enter-2");
		},
	});

	button.bindProperty("type", {
		path: "message>/",
		formatter: function (messages: Message[]) {
			return messages && messages.length > 0
				? ButtonType.Negative
				: ButtonType.Ghost;
		},
	});

	button.bindProperty("enabled", {
		path: "message>/",
		formatter: function (messages: Message[]) {
			return messages && messages.length > 0;
		},
	});

	return button;
}

/**
 * Message Handler class for SAPUI5 application
 * Provides centralized message management functionality
 */
export class MessagingUtils {
	private readonly messaging: typeof Messaging;
	private messageModel: MessageModel;
	private messageView: MessageView;
	private popover: Popover;
	private view: View;

	/**
	 * Constructor
	 * @param {View} view
	 */
	constructor(view: View) {
		this.view = view;
		this.messaging = Messaging;
		this.messageModel = this.messaging.getMessageModel();

		this.messaging.registerObject(this.view, true);
		this.view.setModel(this.messageModel, "message");
		this.createMessageView();
	}

	/**
	 * Registers message processor
	 * @param {object} processor - The object which the message handling is registered for
	 */
	public registerMessageProcessor(processor: object): void {
		this.messaging.registerMessageProcessor(processor as MessageProcessor);
	}

	/**
	 * Unregisters message processor
	 * @param {object} processor - The object which the message handling is registered for
	 */
	public unregisterMessageProcessor(processor: object): void {
		this.messaging.unregisterMessageProcessor(processor as MessageProcessor);
	}

	/**
	 * Clears all messages from message model
	 * @void
	 */
	public clearAllMessages(): void {
		this.messaging.removeAllMessages();
	}

	/**
	 * Retrives all messages from message model
	 * @returns Array of messages
	 * */
	public getAllMessages(): Message[] {
		return this.messaging.getMessageModel().getData() as Message[];
	}

	/**
	 * Handles pressing active title for error message
	 * @param {MessageView$ActiveTitlePressEvent} event
	 * @void
	 */
	private async handleActiveTitlePress(
		event: MessageView$ActiveTitlePressEvent,
	): Promise<void> {
		const message = event
			.getParameters()
			.item.getBindingContext()
			.getObject() as CustomMessageType;
		let control = this.view.byId(message.getControlId());

		this.popover.close();

		if (control) {
			let fullTarget = null;
			if (message.fullTarget) {
				if (Array.isArray(message.fullTarget)) {
					if (message.fullTarget.length > 0) {
						fullTarget = message.fullTarget[0];
					}
				} else {
					fullTarget = message.fullTarget;
				}
			}
			if (
				fullTarget &&
				control.getParent() instanceof Table &&
				control.getParent().getBinding("rows").getModel() instanceof JSONModel
			) {
				const column = control;
				const table = column.getParent() as Table;
				const targetDataRowIndex = fullTarget.replace(
					`${table.getBinding("rows").getPath()}/`,
					"",
				);
				const columnIndex = table
					.getColumns()
					.filter((col) => col.getVisible())
					.findIndex((col) => col.getId() === column.getId());
				if (columnIndex === -1) {
					return;
				}
				const sTableModelName = table.getBindingInfo("rows").model;

				table.setFirstVisibleRow(parseInt(targetDataRowIndex));
				await new Promise((resolve) => setTimeout(resolve, 100));

				control = table
					.getRows()
					.find(
						(oRow) =>
							oRow
								.getCells()
								[columnIndex].getBindingContext(sTableModelName)
								.getPath() === fullTarget,
					)
					.getCells()[columnIndex];
				if (!control) {
					return;
				}
			}
			setTimeout(() => control.focus(), 300);
		}
	}

	/**
	 * Creates new message view and message popover
	 * @private
	 * @void
	 */
	private createMessageView() {
		const messageTemplate = new MessageItem({
			title: "{message}",
			subtitle: "{additionalText}",
			activeTitle: "{= ${controlIds}.length > 0}",
			type: "{type}",
			description: "{description}",
		});

		this.messageView = new MessageView({
			showDetailsPageHeader: false,
			itemSelect: function () {
				backBtn.setVisible(true);
			},
			activeTitlePress: async (event: MessageView$ActiveTitlePressEvent) =>
				await this.handleActiveTitlePress(event),
			items: {
				path: "/",
				template: messageTemplate,
			},
		});

		const backBtn = new Button({
			icon: IconPool.getIconURI("nav-back"),
			visible: false,
			press: () => {
				this.messageView.navigateBack();
				this.popover.focus();
				backBtn.setVisible(false);
			},
		});

		this.messageView.setModel(this.messageModel);

		const closeBtn = new Button({
				icon: IconPool.getIconURI("sap-icon://decline"),
				press: () => {
					this.popover.close();
				},
			}),
			popoverBar = new Bar({
				contentLeft: [backBtn],
				contentRight: [closeBtn],
			});

		this.popover = new Popover({
			resizable: true,
			placement: PlacementType.Top,
			showArrow: false,
			customHeader: popoverBar,
			contentWidth: "440px",
			contentHeight: "440px",
			verticalScrolling: false,
			content: [this.messageView],
		});
	}

	/**
	 * Handles opening message view popover
	 * @param {Control} control - openBy control
	 * @void
	 */
	public handleMessageViewOpen(control: Control): void {
		this.messageView.navigateBack();
		if (this.popover.isOpen()) {
			this.popover.close();
		} else {
			this.popover.openBy(control);
		}
	}

	/**
	 * Clear messages releated to control id
	 * @param {string} controlId
	 * @void
	 */
	public clearMessagesByControl(controlId: string): void {
		const messages = this.getAllMessages();
		const messagesToRemove = messages.filter(
			(msg) => msg.getControlId() === controlId,
		);
		this.messaging.removeMessages(messagesToRemove);
		this.updateMessages();
	}

	/**
	 * Checks all messages to find if any message has a control reference
	 * Removes all remaining messages if not control related message is left
	 * @void
	 */
	private updateMessages(): void {
		const messages = this.getAllMessages();
		const hasMessagesWithControlReference = messages.some(
			(msg) => msg.getControlId() !== undefined,
		);

		if (!hasMessagesWithControlReference) {
			this.clearAllMessages();
		}
	}

	/**
	 * Clears input Value state and removes error related error message
	 * @param {CustomControlType} control
	 * @void
	 */
	public handleChangeEvent(control: CustomControlType): void {
		control.setValueState(ValueState.None);
		this.clearMessagesByControl(control.getId());
	}

	/**
	 * Removes all duplicate message by control id
	 * Necessary after validation due to issue between standard ui5 validation and the thirdparty ui5 validator
	 * @void
	 */
	public removeDuplicateMessagesByTarget() {
		const messages = this.messageModel.getData() as Message[];
		const seenTargets = new Map<string, boolean>();
		const uniqueMessages: Message[] = [];

		messages.forEach((msg) => {
			if (!seenTargets.has(msg.getControlId())) {
				seenTargets.set(msg.getControlId(), true);
				uniqueMessages.push(msg);
			}
		});

		this.clearAllMessages();
		uniqueMessages.forEach((msg) => {
			const controlLabel = this.getAdditionalTextForTableEntries(
				msg.getControlId(),
			);
			if (controlLabel) {
				msg.setAdditionalText(controlLabel);
			}

			this.messaging.addMessages(msg);
		});
	}

	private getAdditionalTextForTableEntries(
		controlId: string,
	): string | undefined {
		if (!this.view.byId(controlId)?.getId().includes("clone")) return undefined;

		const customData = this.view.byId(controlId).getCustomData() as unknown[];
		if (!customData) return undefined;

		const properties = (customData[0] as Record<string, unknown>).mProperties;
		const label = (properties as Record<string, unknown>).value as string;

		return label;
	}
}
