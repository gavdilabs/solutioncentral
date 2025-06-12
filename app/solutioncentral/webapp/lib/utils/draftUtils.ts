import Popover from "sap/m/Popover";
import Context from "sap/ui/model/odata/v4/Context";
import VBox from "sap/m/VBox";
import Button from "sap/m/Button";
import Text from "sap/m/Text";
import {
	FlexAlignItems,
	FlexJustifyContent,
	PlacementType,
} from "sap/m/library";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Event from "sap/ui/base/Event";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

export async function discardDraft(context: Context): Promise<boolean> {
	const hasActiveEntity = context.getProperty("HasActiveEntity") as boolean;
	await context.delete("$auto", true);
	return hasActiveEntity;
}

export function getDiscardDraftPopover(
	i18n: ResourceBundle,
	discardEvent: (event: Event) => void,
): Popover {
	return new Popover({
		placement: PlacementType.Top,
		showHeader: false,
		content: [
			new VBox({
				justifyContent: FlexJustifyContent.Center,
				alignItems: FlexAlignItems.Center,
				items: [
					new Text({ text: i18n.getText("default.discardMsg") }),
					new Button({
						width: "8rem",
						text: i18n.getText("default.discard"),
						press: discardEvent,
					}),
				],
			}).addStyleClass("sapUiSmallMargin"),
		],
	});
}

export async function activateDraftEdit(
	context: Context,
	model: ODataModel,
): Promise<Context> {
	return new Promise((resolve) => {
		const operation = model.bindContext("RadarService.draftEdit(...)", context);
		operation.setParameter("PreserveChanges", true);
		operation
			.invoke()
			.then((draftContext: Context) => {
				resolve(draftContext);
			})
			.catch((e) => {
				throw e;
			});
	});
}

export async function draftActivate(
	context: Context,
	model: ODataModel,
): Promise<void> {
	return new Promise((resolve, reject) => {
		const operation = model.bindContext(
			"RadarService.draftActivate(...)",
			context,
		);
		operation
			.invoke()
			.then(() => {
				resolve();
			})
			.catch((e: Error) => {
				reject(e);
			});
	});
}
