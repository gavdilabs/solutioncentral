import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import { ButtonType } from "sap/m/library";
import OverflowToolbar from "sap/m/OverflowToolbar";
import TextArea from "sap/m/TextArea";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import View from "sap/ui/core/mvc/View";
import {
	createMessagingButtonFromController,
	MessagingUtils,
} from "./messagingUtils";
import Validator from "learnin/ui5/validator/Validator";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Context from "sap/ui/model/odata/v4/Context";
import MessageToast from "sap/m/MessageToast";
import VBox from "sap/m/VBox";
import { Icon$PressEvent } from "sap/ui/core/Icon";
import Popover from "sap/m/Popover";
import FormattedText from "sap/m/FormattedText";
import { CompanyConfiguration } from "../types";
import List from "sap/m/List";
import JSONModel from "sap/ui/model/json/JSONModel";
import Fragment from "sap/ui/core/Fragment";
import { ListBase$SelectionChangeEvent } from "sap/m/ListBase";

export enum ReviewTypes {
	SOLUTION_REVIEW = "SoftwareSolution",
	VERSION_REVIEW = "SolutionVersion",
}

export const REVIEW_MODEL_NAME = "reviewModel";
export enum ReviewModelProperties {
	CLEAN_CORE_LEVEL = "/cleanCoreLevel",
	CODE_QUALITY_LEVEL = "/codeQualityLevel",
	REASON_NOT_CLEAN_CORE = "/reasonNotCleanCore",
	REASON_REQUIRED = "/reasonRequired",
	INFO_STRIP_VISIBLE = "/infoStripVisible",
}

export class ReviewUtils {
	private view: View;
	private i18nBundle: ResourceBundle;
	private reviewType: ReviewTypes;
	private messagingHandler: MessagingUtils;
	private messagingBtn: Button;
	private validator: Validator;

	private static readonly dialogs = new Map<string, Dialog>();
	private static companyConfig: CompanyConfiguration;

	constructor(
		view: View,
		reviewType: ReviewTypes,
		i18nBundle: ResourceBundle,
		messagingUtils: MessagingUtils,
		companyConfig: CompanyConfiguration,
	) {
		this.view = view;
		this.reviewType = reviewType;
		this.i18nBundle = i18nBundle;
		this.messagingHandler = messagingUtils;
		this.validator = new Validator();

		if (!ReviewUtils.companyConfig) {
			ReviewUtils.companyConfig = companyConfig;
		}
	}

	public async initDialog(): Promise<void> {
		if (!ReviewUtils.dialogs.has(this.reviewType)) {
			const dialog = await this.createReviewDialogNew();
			ReviewUtils.dialogs.set(this.reviewType, dialog);
		}
	}

	private async createReviewDialogNew() {
		const dialog = (await Fragment.load({
			name: "com.gavdilabs.techtransmgt.solutioncentral.view.fragments.ReviewDialog",
			controller: this,
		})) as Dialog;
		this.view.addDependent(dialog);

		dialog.setTitle(
			this.reviewType === ReviewTypes.SOLUTION_REVIEW
				? this.i18nBundle.getText("title.reviewSolution")
				: this.i18nBundle.getText("title.reviewVersion"),
		);

		const footerToolbar = this.createDialogFooter();
		dialog.setFooter(footerToolbar);
		return dialog;
	}

	private getListControlsFromDialog(initDialog?: Dialog): List[] {
		const dialog = initDialog || ReviewUtils.dialogs.get(this.reviewType);
		const codeQualityList = (
			dialog.getContent()[1] as VBox
		).getItems()[1] as List;
		const cleanCoreList = (
			dialog.getContent()[2] as VBox
		).getItems()[1] as List;

		return [codeQualityList, cleanCoreList];
	}

	private createDialogFooter(): OverflowToolbar {
		this.messagingBtn = createMessagingButtonFromController(
			this.reviewType + "MessagingBtn",
			this.messagingHandler,
		);

		return new OverflowToolbar({
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
		});
	}

	public openDialog(context: Context) {
		const reviewModel = this.view.getModel(REVIEW_MODEL_NAME) as JSONModel;
		reviewModel.setProperty(
			ReviewModelProperties.INFO_STRIP_VISIBLE,
			this.reviewType === ReviewTypes.SOLUTION_REVIEW,
		);

		this.validator.removeErrors(this.view);
		ReviewUtils.dialogs.get(this.reviewType).setBindingContext(context);
		ReviewUtils.dialogs.get(this.reviewType).open();
	}

	private resetFields() {
		const reviewModel = this.view.getModel("reviewModel") as JSONModel;
		reviewModel.setProperty("/cleanCoreLevel", 0);
		reviewModel.setProperty("/codeQualityLevel", 0);
		reviewModel.setProperty("/reasonNotCleanCore", null);
		reviewModel.setProperty("/reasonRequired", true);
		reviewModel.setProperty("/infoStripVisible", false);

		const lists = this.getListControlsFromDialog();
		lists.forEach((list) => list.removeSelections(true));
	}

	public openInfoPopover(event: Icon$PressEvent, textId: string): void {
		const src = event.getSource();
		const text = this.i18nBundle.getText(textId);
		const popover = new Popover({
			placement: "HorizontalPreferedRight",
			showHeader: false,
			contentWidth: "20rem",
			content: new FormattedText({ htmlText: text }),
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
		this.resetFields();
		ReviewUtils.dialogs.get(this.reviewType).close();
	}

	private async handleReviewSubmit(): Promise<void> {
		const reviewModel = this.view.getModel(REVIEW_MODEL_NAME) as JSONModel;
		const codeQualityRating = reviewModel.getProperty(
			ReviewModelProperties.CODE_QUALITY_LEVEL,
		) as number;
		const cleanCoreLevel = reviewModel.getProperty(
			ReviewModelProperties.CLEAN_CORE_LEVEL,
		) as number;
		const reasonNotCleanCore = reviewModel.getProperty(
			ReviewModelProperties.REASON_NOT_CLEAN_CORE,
		) as string;

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

	public onListSelectionChange(
		event: ListBase$SelectionChangeEvent,
		prop: ReviewModelProperties,
	) {
		const list = event.getSource();
		const selectedItem = event.getParameter("listItem");
		const selected = event.getParameter("selected");

		const allItems = list.getItems();
		const selectedIndex = allItems.indexOf(selectedItem);
		if (selected) {
			list.removeSelections(true);
			const itemsToSelect = allItems.slice(0, selectedIndex + 1);
			itemsToSelect.forEach((item) => {
				list.setSelectedItem(item, true);
			});
		} else {
			list.removeSelections(true);

			if (selectedIndex > 0) {
				const itemsToSelect = allItems.slice(0, selectedIndex);
				itemsToSelect.forEach((item) => {
					list.setSelectedItem(item, true);
				});
			}
		}

		const selectedItems = list.getSelectedItems();
		let highestIndex = -1;
		if (selectedItems.length > 0) {
			selectedItems.forEach((item) => {
				const itemIndex = allItems.indexOf(item);
				if (itemIndex > highestIndex) {
					highestIndex = itemIndex;
				}
			});
		}

		this.updateSelectedPropLevel(highestIndex, prop);

		if (prop === ReviewModelProperties.CLEAN_CORE_LEVEL) {
			this.setReasonNotCleanCoreRequired(highestIndex);
		}
	}

	private updateSelectedPropLevel(index: number, prop: ReviewModelProperties) {
		const level = index === -1 ? 0 : index + 1;
		const reviewModel = this.view.getModel(REVIEW_MODEL_NAME) as JSONModel;
		reviewModel.setProperty(prop, level);
	}

	private setReasonNotCleanCoreRequired(index: number) {
		const level = index === -1 ? 0 : index + 1;
		const required =
			level < ReviewUtils.companyConfig.expectedMinimalCleanCoreValue_code
				? true
				: false;
		const reviewModel = this.view.getModel(REVIEW_MODEL_NAME) as JSONModel;
		reviewModel.setProperty(ReviewModelProperties.REASON_REQUIRED, required);

		this.resetTextAreaValueState();
	}

	private resetTextAreaValueState(): void {
		const dialog = ReviewUtils.dialogs.get(this.reviewType);
		const textArea = (
			(dialog.getContent()[2] as VBox).getItems()[2] as VBox
		).getItems()[1] as TextArea;
		textArea.setValueState("None");
		this.messagingHandler.clearMessagesByControl(textArea.getId());
	}
}
