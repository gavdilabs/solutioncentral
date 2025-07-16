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
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import {
	createMessagingButtonFromController,
	MessagingUtils,
} from "./messagingUtils";
import Validator from "learnin/ui5/validator/Validator";
import MessageStrip from "sap/m/MessageStrip";

export enum ReviewTypes {
	SOLUTION_REVIEW = "SoftwareSolution",
	VERSION_REVIEW = "SolutionVersion",
}

export class ReviewUtils {
	private view: View;
	private i18nBundle: ResourceBundle;
	private static dialog: Dialog;
	private reviewType: ReviewTypes;
	private messagingHandler: MessagingUtils;

	private static reasonLabel: Label;
	private static infoStrip: MessageStrip;
	private static reasonTextArea: TextArea;
	private static codeQualityRating: RatingIndicator;
	private static cleanCoreRating: RatingIndicator;
	private validator: Validator;
	private messagingBtn: Button;

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
		this.createReviewDialog();
	}

	private createReviewDialog() {
		if (!ReviewUtils.dialog) {
			this.messagingBtn = createMessagingButtonFromController(
				"reviewDialogMessagingBtn",
				this.messagingHandler,
			);

			ReviewUtils.reasonLabel = new Label({
				required: true,
				text: this.i18nBundle.getText("column.reasonNotCleanCore"),
			});

			ReviewUtils.reasonTextArea = new TextArea({
				rows: 3,
				required: true,
			});

			ReviewUtils.codeQualityRating = new RatingIndicator({
				editable: true,
				maxValue: 5,
				value: 0,
			});

			ReviewUtils.cleanCoreRating = new RatingIndicator({
				editable: true,
				maxValue: 5,
				value: 0,
				change: (event: RatingIndicator$ChangeEvent) =>
					this.onCleanCoreLevelChange(event),
			});

			ReviewUtils.infoStrip = new MessageStrip({
				showIcon: true,
				text: this.i18nBundle.getText("msg.reviewSolutionInfo"),
				type: "Information",
			});

			ReviewUtils.dialog = new Dialog({
				draggable: true,
				contentWidth: "30rem",
				content: [
					new SimpleForm({
						content: [
							ReviewUtils.infoStrip,
							new Label({
								text: this.i18nBundle.getText("column.codeQualityLevel"),
							}),
							ReviewUtils.codeQualityRating,

							new Label({
								text: this.i18nBundle.getText("column.cleanCoreLevel"),
							}),
							ReviewUtils.cleanCoreRating,

							ReviewUtils.reasonLabel,
							ReviewUtils.reasonTextArea,
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
		}

		this.view.addDependent(ReviewUtils.dialog);
	}

	private onCleanCoreLevelChange(event: RatingIndicator$ChangeEvent) {
		this.setReasonRequired(event.getSource().getValue() <= 0);
		this.messagingHandler.clearMessagesByControl(
			ReviewUtils.reasonTextArea.getId(),
		);
		ReviewUtils.reasonTextArea.setValueState("None");
	}

	private setReasonRequired(required: boolean) {
		ReviewUtils.reasonLabel.setRequired(required);
		ReviewUtils.reasonTextArea.setRequired(required);
	}

	public openDialog() {
		const title =
			this.reviewType === ReviewTypes.SOLUTION_REVIEW
				? this.i18nBundle.getText("title.reviewSolution")
				: this.i18nBundle.getText("title.reviewVersion");

		ReviewUtils.infoStrip.setVisible(
			this.reviewType === ReviewTypes.SOLUTION_REVIEW,
		);

		this.resetFields();
		this.validator.removeErrors(this.view);
		ReviewUtils.dialog.setTitle(title);
		ReviewUtils.dialog.open();
	}

	private resetFields() {
		ReviewUtils.cleanCoreRating.setValue(0);
		ReviewUtils.codeQualityRating.setValue(0);
		ReviewUtils.reasonTextArea.setRequired(true);
		ReviewUtils.reasonTextArea.setValue(null);
	}

	private handleSubmit() {
		this.messagingHandler.clearAllMessages();
		if (
			!this.validator.validate(ReviewUtils.dialog, {
				isDoConstraintsValidation: true,
			})
		) {
			return;
		}

		if (this.reviewType === ReviewTypes.SOLUTION_REVIEW) {
			// do action for solution
			this.handleSolutionReviewSubmit();
		} else if (this.reviewType === ReviewTypes.VERSION_REVIEW) {
			// do action for version
			this.handleVersionReviewSubmit();
		}
		ReviewUtils.dialog.close();
	}

	private handleCancel(): void {
		this.messagingHandler.clearAllMessages();
		ReviewUtils.dialog.close();
	}

	private handleSolutionReviewSubmit() {
		const codeQualityRating = ReviewUtils.codeQualityRating.getValue();
		const cleanCoreLevel = ReviewUtils.cleanCoreRating.getValue();
		const reasonNotCleanCore = ReviewUtils.reasonTextArea.getValue();
	}

	private handleVersionReviewSubmit() {
		const codeQualityRating = ReviewUtils.codeQualityRating.getValue();
		const cleanCoreLevel = ReviewUtils.cleanCoreRating.getValue();
		const reasonNotCleanCore = ReviewUtils.reasonTextArea.getValue();
	}
}
