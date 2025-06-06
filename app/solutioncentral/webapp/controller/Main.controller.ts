import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import BaseController from "./BaseController";
import { Button$PressEvent } from "sap/m/Button";
import JSONModel from "sap/ui/model/json/JSONModel";
import { CustomModels } from "../lib/constants";
import { DefaultSolutionTableConfig } from "../lib/defaults";
import { SettingsDialogItem, SolutionCatalogueTableEntry, SolutionTableConfig } from "../lib/types";
import { SoftwareSolutionFilterConstructor } from "../lib/utils/filters";
import Table from "sap/m/Table";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import { ListBase$SelectionChangeEvent } from "sap/m/ListBase";
import Context from "sap/ui/model/odata/v4/Context";
import MessageBox from "sap/m/MessageBox";
import Spreadsheet from "sap/ui/export/Spreadsheet";
import { getSoftwareSolutionColumnConfig } from "../lib/utils/export";
import Fragment from "sap/ui/core/Fragment";
import ViewSettingsDialog from "sap/m/ViewSettingsDialog";
import { bindViewSettingsColumnAggregration, bindViewSettingsDialog } from "../lib/utils/binding";
import List from "sap/m/List";

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral.controller
 */
export default class Main extends BaseController {
	private readonly TABLE_ID = "solutionCatalogueTable";
	private readonly CONFIG_MODEL = "solutionTableConfig";

	private tableConfigModel: JSONModel | undefined;
	private settingsDialog: ViewSettingsDialog | undefined;
	private columnSettingsList: List | undefined;

	public onInit(): void {
		this.tableConfigModel = new JSONModel(DefaultSolutionTableConfig);
		this.setModel(this.tableConfigModel, CustomModels.SOLUTION_TABLE_CONFIG);
	}

	public async formatTableTitle(count: number | string): Promise<string> {
		const resourceBundle = await this.getResourceBundle();
		return resourceBundle.getText("tableSolutionCatalogue", [count]);
	}

	public onTableSelect(event: ListBase$SelectionChangeEvent): void {
		const source = event.getSource();
		const selected = source.getSelectedItems();
		const entries = selected.map((el) => el.getBindingContext().getObject() as SolutionCatalogueTableEntry);

		this.tableConfigModel.setProperty("/selectedItems", entries);
	}

	public onTableItemPress(event: ListItemBase$PressEvent): void {
		// TODO: Implement
	}

	public onPressCreate(event: Button$PressEvent): void {
		// TODO: Implement
	}

	public async onPressDelete(): Promise<void> {
		const resourceBundle = await this.getResourceBundle();

		MessageBox.confirm(resourceBundle.getText("confirmDelete"), {
			onClose: (action: unknown) => {
				if (action !== MessageBox.Action.OK) return;

				const table = this.getView().byId(this.TABLE_ID) as Table;
				const selected = table.getSelectedItems();

				for (const el of selected) {
					const ctx = el.getBindingContext() as Context;
					ctx.delete().catch((e) => {
						console.error("Failed to delete entry", e);
					});
				}
			}
		})
	}

	public async onPressTableSettings(): Promise<void> {
		if (!this.settingsDialog) {
			const resourceBundle = await this.getResourceBundle();

			this.settingsDialog = await Fragment.load({
				id: "solutionTableSettingsDialog",
				name: "com.gavdilabs.techtransmgt.solutioncentral.view.fragments.TableSettingsDialog",
				controller: this,
			}) as ViewSettingsDialog;

			this.getView().addDependent(this.settingsDialog);
			this.settingsDialog.setModel(this.getView().getModel(this.CONFIG_MODEL));

			bindViewSettingsDialog(this.settingsDialog, this.CONFIG_MODEL, resourceBundle);
			this.columnSettingsList = bindViewSettingsColumnAggregration(this.settingsDialog, this.CONFIG_MODEL, resourceBundle);
		}

		this.settingsDialog.open();
	}

	public handleSettingsConfirm(): void {
		// TODO: Implement
	}

	public handleSettingsReset(): void {
		this.tableConfigModel.setProperty("/columnItems", DefaultSolutionTableConfig.columnItems);
		this.tableConfigModel.setProperty("/sortItems", DefaultSolutionTableConfig.sortItems);
		this.tableConfigModel.setProperty("/groupItems", DefaultSolutionTableConfig.groupItems);
		this.columnSettingsList?.getBinding("items")?.getModel().refresh(true);

		// TODO: Apply to table
	}

	public async onPressTableExport(): Promise<void> {
		const resourceBundle = await this.getResourceBundle();
		const table = this.getView().byId(this.TABLE_ID) as Table;
		const binding = table.getBinding("items") as ODataListBinding;
		const columns = this.tableConfigModel.getProperty("/columnItems") as Array<SettingsDialogItem>;
		const visibleColumns = columns.filter((el) => el.selected).map((el) => el.key);
		const spreadsheet = new Spreadsheet({
			workbook: {
				columns: getSoftwareSolutionColumnConfig(visibleColumns, resourceBundle),
				hierarchyLevel: "Level",
			},
			dataSource: binding,
			fileName: resourceBundle.getText("sheetSoftwareSolution"),
			showProgress: true,
		});

		spreadsheet.build().catch(e => {
			console.error("Failed to build spreadsheet", e);
		}).finally(() => {
			spreadsheet.destroy();
		});
	}

	public onFilterBarClear(): void {
		this.tableConfigModel.setProperty("/filters", {});
		this.tableConfigModel.setProperty("/search", undefined);
		this.onFilterBarSearch();
	}

	public onFilterBarSearch(): void {
		const configData = this.tableConfigModel.getData() as SolutionTableConfig;
		const filter = SoftwareSolutionFilterConstructor.constructFilter(configData.filters);
		const table = this.getView().byId(this.TABLE_ID) as Table;

		if (!table) {
			console.error("Failed to locate table for filtering");
			return;
		}

		const binding = table.getBinding("items") as ODataListBinding;
		binding.changeParameters({
			$search: configData.search
		});

		binding.filter(filter ?? undefined);
	}

}
