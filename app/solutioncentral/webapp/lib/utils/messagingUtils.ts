import Bar from "sap/m/Bar";
import Button from "sap/m/Button";
import { PlacementType } from "sap/m/library";
import MessageItem from "sap/m/MessageItem";
import MessageView from "sap/m/MessageView";
import Popover from "sap/m/Popover";
import Control from "sap/ui/core/Control";
import IconPool from "sap/ui/core/IconPool";
import Message from "sap/ui/core/message/Message";
import MessageProcessor from "sap/ui/core/message/MessageProcessor";
import Messaging from "sap/ui/core/Messaging";
import View from "sap/ui/core/mvc/View";
import MessageModel from "sap/ui/model/message/MessageModel";
import { CustomControlType } from "../types";
import { ValueState } from "sap/ui/core/library";

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
	 * Creates new message view and message popover
	 * @private
	 * @void
	 */
	private createMessageView() {
		const messageTemplate = new MessageItem({
			type: "{type}",
			title: "{message}",
			description: "{description}",
			subtitle: "{additionalText}",
		});

		this.messageView = new MessageView({
			showDetailsPageHeader: false,
			itemSelect: function () {
				backBtn.setVisible(true);
			},
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
			(msg: Message) => msg.getControlId() === controlId,
		);
		this.messaging.removeMessages(messagesToRemove);
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
}
