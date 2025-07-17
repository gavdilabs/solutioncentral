import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import Label from "sap/m/Label";
import { ButtonType } from "sap/m/library";
import OverflowToolbar from "sap/m/OverflowToolbar";
import RatingIndicator, {
	RatingIndicator$ChangeEvent,
} from "sap/m/RatingIndicator";
import TextArea from "sap/m/TextArea";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import View from "sap/ui/core/mvc/View";
import {
	createMessagingButtonFromController,
	MessagingUtils,
} from "./messagingUtils";
import Validator from "learnin/ui5/validator/Validator";
import MessageStrip, { MessageStrip$CloseEvent } from "sap/m/MessageStrip";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Context from "sap/ui/model/odata/v4/Context";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import HBox from "sap/m/HBox";
import VBox from "sap/m/VBox";
import Icon, { Icon$PressEvent } from "sap/ui/core/Icon";
import Popover from "sap/m/Popover";
import FormattedText from "sap/m/FormattedText";
import IconPool from "sap/ui/core/IconPool";

export enum ReviewTypes {
	SOLUTION_REVIEW = "SoftwareSolution",
	VERSION_REVIEW = "SolutionVersion",
}

export class ReviewUtils {
	private view: View;
	private i18nBundle: ResourceBundle;
	private reviewType: ReviewTypes;
	private messagingHandler: MessagingUtils;
	private messagingBtn: Button;
	private validator: Validator;

	private static reasonLabel: Label;
	private static infoStrip: MessageStrip;
	private reasonTextArea: TextArea;
	private codeQualityRating: RatingIndicator;
	private cleanCoreRating: RatingIndicator;

	private static readonly dialogs = new Map<string, Dialog>();
	private static reviewModel: JSONModel;

	constructor(
		view: View,
		reviewType: ReviewTypes,
		i18nBundle: ResourceBundle,
		messagingUtils: MessagingUtils,
	) {
		this.view = view;
		this.reviewType = reviewType;
		this.i18nBundle = i18nBundle;
		this.messagingHandler = messagingUtils;
		this.validator = new Validator();

		if (!ReviewUtils.reviewModel) {
			ReviewUtils.reviewModel = this.view.getModel("reviewModel") as JSONModel;
		}

		if (!ReviewUtils.dialogs.has(this.reviewType)) {
			const dialog = this.createReviewDialog();
			ReviewUtils.dialogs.set(this.reviewType, dialog);
		}
	}

	private createReviewDialog(): Dialog {
		this.messagingBtn = createMessagingButtonFromController(
			this.reviewType + "MessagingBtn",
			this.messagingHandler,
		);

		ReviewUtils.reasonLabel = new Label({
			required: true,
			text: this.i18nBundle.getText("column.reasonNotCleanCore"),
		});

		this.reasonTextArea = new TextArea({
			rows: 3,
			width: "100%",
			required: true,
		});

		this.codeQualityRating = new RatingIndicator({
			editable: true,
			maxValue: 5,
			value: 0,
		});

		this.cleanCoreRating = new RatingIndicator({
			editable: true,
			maxValue: 5,
			value: 0,
			change: (event: RatingIndicator$ChangeEvent) =>
				this.onCleanCoreLevelChange(event),
		});

		ReviewUtils.infoStrip = new MessageStrip({
			showIcon: true,
			showCloseButton: true,
			text: this.i18nBundle.getText("msg.reviewSolutionInfo"),
			type: "Information",
			close: (event: MessageStrip$CloseEvent) => {
				event.getSource().setVisible(false);
			},
		});

		const dialog = new Dialog({
			draggable: true,
			title:
				this.reviewType === ReviewTypes.SOLUTION_REVIEW
					? this.i18nBundle.getText("title.reviewSolution")
					: this.i18nBundle.getText("title.reviewVersion"),
			contentWidth: "30rem",
			content: [
				new VBox({
					width: "100%",
					items: [
						ReviewUtils.infoStrip,
						new VBox({
							items: [
								new HBox({
									items: [
										new Label({
											text: this.i18nBundle.getText("column.codeQualityLevel"),
										}),
										new Icon({
											src: IconPool.getIconURI("information"),
											color: "Marker",
											press: (event: Icon$PressEvent) => {
												const text = this.i18nBundle.getText(
													"msg.infoPOCodeQualityLevel",
												);

												this.openInfoPopover(event.getSource(), text);
											},
										}).addStyleClass("sapUiSmallMarginBegin"),
									],
								}).addStyleClass("sapUiSmallMarginTop"),
								this.codeQualityRating,
							],
						}),
						new VBox({
							items: [
								new HBox({
									items: [
										new Label({
											text: this.i18nBundle.getText("column.cleanCoreLevel"),
										}),
										new Icon({
											src: IconPool.getIconURI("information"),
											color: "Marker",
											press: (event: Icon$PressEvent) => {
												const text = this.i18nBundle.getText(
													"msg.infoPOCleanCoreLevel",
												);

												this.openInfoPopover(event.getSource(), text);
											},
										}).addStyleClass("sapUiSmallMarginBegin"),
									],
								}).addStyleClass("sapUiSmallMarginTop"),
								this.cleanCoreRating,
							],
						}),

						ReviewUtils.reasonLabel.addStyleClass("sapUiSmallMarginTop"),
						this.reasonTextArea,
					],
				}),
			],
			footer: new OverflowToolbar({
				content: [
					this.messagingBtn,
					new ToolbarSpacer(),
					new Button({
						text: this.i18nBundle.getText("button.submit"),
						type: ButtonType.Emphasized,
						press: this.handleSubmit.bind(this),
					}),
					new Button({
						text: this.i18nBundle.getText("button.cancel"),
						type: ButtonType.Transparent,
						press: this.handleCancel.bind(this),
					}),
				],
			}),
		}).addStyleClass("sapUiContentPadding");

		this.view.addDependent(dialog);
		return dialog;
	}

	private onCleanCoreLevelChange(event: RatingIndicator$ChangeEvent) {
		const value =
			!event.getSource().getValue() || event.getSource().getValue() <= 0
				? true
				: false;
		this.setReasonRequired(value);
		this.messagingHandler.clearMessagesByControl(this.reasonTextArea.getId());
		this.reasonTextArea.setValueState("None");
	}

	private setReasonRequired(required: boolean) {
		ReviewUtils.reasonLabel.setRequired(required);
		this.reasonTextArea.setRequired(required);
	}

	public openDialog(context: Context) {
		ReviewUtils.infoStrip.setVisible(
			this.reviewType === ReviewTypes.SOLUTION_REVIEW,
		);

		this.validator.removeErrors(this.view);
		ReviewUtils.dialogs.get(this.reviewType).setBindingContext(context);
		ReviewUtils.dialogs.get(this.reviewType).open();
	}

	private resetFields() {
		this.cleanCoreRating.setValue(0);
		this.codeQualityRating.setValue(0);
		this.reasonTextArea.setRequired(true);
		this.reasonTextArea.setValue(null);
	}

	private openInfoPopover(src: Icon, infoText: string): void {
		const popover = new Popover({
			placement: "HorizontalPreferedRight",
			showHeader: false,
			content: new FormattedText({ htmlText: infoText }),
		}).addStyleClass("sapUiContentPadding");

		popover.openBy(src, true);
	}

	private async handleSubmit(): Promise<void> {
		this.messagingHandler.clearAllMessages();
		if (
			!this.validator.validate(ReviewUtils.dialogs.get(this.reviewType), {
				isDoConstraintsValidation: true,
			})
		) {
			return;
		}

		await this.handleReviewSubmit();
		this.resetFields();
		ReviewUtils.dialogs.get(this.reviewType).close();
	}

	private handleCancel(): void {
		this.messagingHandler.clearAllMessages();
		ReviewUtils.dialogs.get(this.reviewType).close();
	}

	private async handleReviewSubmit(): Promise<void> {
		const codeQualityRating = this.codeQualityRating.getValue();
		const cleanCoreLevel = this.cleanCoreRating.getValue();
		const reasonNotCleanCore = this.reasonTextArea.getValue();

		const model = ReviewUtils.dialogs
			.get(this.reviewType)
			.getModel() as ODataModel;
		const context = ReviewUtils.dialogs
			.get(this.reviewType)
			.getBindingContext() as Context;
		const operation = model.bindContext(
			"RadarService.submitReview(...)",
			context,
		);
		operation.setParameter("codeQuality", codeQualityRating);
		operation.setParameter("cleanCore", cleanCoreLevel);
		operation.setParameter("reasonNotCleanCore", reasonNotCleanCore);
		await operation
			.invoke()
			.then(() => {
				MessageToast.show(this.i18nBundle.getText("msg.reviewSubmitted"));
				this.view.getElementBinding().refresh();
			})
			.catch((e) => {
				throw new Error("Failed to submit review. Error: " + e);
			});
	}
}
