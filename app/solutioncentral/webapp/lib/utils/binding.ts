import ResourceBundle from "sap/base/i18n/ResourceBundle";
import CheckBox from "sap/m/CheckBox";
import CustomListItem from "sap/m/CustomListItem";
import HBox from "sap/m/HBox";
import List from "sap/m/List";
import Text from "sap/m/Text";
import ViewSettingsCustomTab from "sap/m/ViewSettingsCustomTab";
import ViewSettingsDialog from "sap/m/ViewSettingsDialog";
import ViewSettingsItem from "sap/m/ViewSettingsItem";

export function bindViewSettingsDialog(dialog: ViewSettingsDialog, modelName: string, resourceBundle: ResourceBundle): void {
	bindSortItems(dialog, modelName, resourceBundle);
	bindGroupItems(dialog, modelName, resourceBundle);
}

export function bindSortItems(dialog: ViewSettingsDialog, modelName: string, resourceBundle: ResourceBundle): void {
	bindViewSettingsAggregration(dialog, modelName, resourceBundle, "sortItems");
}

export function bindGroupItems(dialog: ViewSettingsDialog, modelName: string, resourceBundle: ResourceBundle): void {
	bindViewSettingsAggregration(dialog, modelName, resourceBundle, "groupItems");
}

export function bindViewSettingsAggregration(
	dialog: ViewSettingsDialog,
	modelName: string,
	resourceBundle: ResourceBundle,
	target: "sortItems" | "groupItems",
): void {
	dialog.bindAggregation(target, {
		path: `${modelName}>/${target}`,
		template: new ViewSettingsItem({
			key: `{${modelName}>key}`,
			text: {
				path: `${modelName}>text`,
				formatter: (key: string) => resourceBundle.getText(key),
			},
			selected: `{${modelName}>selected}`,
		}),
	});
}

export function bindViewSettingsColumnAggregration(
	dialog: ViewSettingsDialog,
	modelName: string,
	resourceBundle: ResourceBundle,
): List {
	const container = new List({
		showSeparators: "Inner",
	}).addStyleClass("sapUiTinyMarginBegin")
		.bindAggregation("items", {
		path: `${modelName}>/columnItems`,
		template: new CustomListItem({
			content: new HBox({
				items: [
					new CheckBox({
						selected: `{${modelName}>selected}`
					}),
					new Text({
						text: {
							path: `${modelName}>text`,
							formatter: (key: string) => resourceBundle.getText(key),
						}
					}).addStyleClass("sapUiSmallMarginTop")
				],
			}),
		}),
	});

	dialog.addCustomTab(new ViewSettingsCustomTab({
		key: "columns",
		tooltip: resourceBundle.getText("columnsTab"),
		icon: "sap-icon://multi-select",
		title: resourceBundle.getText("columnsTab"),
		content: container,
	}));

	return container;
}
