import Table from "sap/m/Table";
import Engine, { State } from "sap/m/p13n/Engine";
import MetadataHelper, { MetadataObject } from "sap/m/p13n/MetadataHelper";
import GroupController, { GroupState } from "sap/m/p13n/GroupController";
import SortController, { SortState } from "sap/m/p13n/SortController";
import SelectionController, {
	SelectionState,
} from "sap/m/p13n/SelectionController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import Column from "sap/m/Column";
import { SortOrder } from "sap/ui/core/library";
import ColumnListItem from "sap/m/ColumnListItem";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import Sorter from "sap/ui/model/Sorter";
import QuickSortItem from "sap/m/table/columnmenu/QuickSortItem";
import QuickGroupItem from "sap/m/table/columnmenu/QuickGroupItem";
import Menu from "sap/m/table/columnmenu/Menu";
import QuickSort from "sap/m/table/columnmenu/QuickSort";
import QuickGroup from "sap/m/table/columnmenu/QuickGroup";
import { ViewSettingsDialogItem } from "../types";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

export interface CustomState extends State {
	Columns?: Array<SelectionState>;
	Sorter?: Array<SortState>;
	Group?: Array<GroupState>;
}

export interface CustomSorter extends Sorter {
	bDescending: boolean;
	sPath: string;
	vGroup: boolean;
}

export interface DefaultSortProperty {
	key: string;
	descending: boolean;
}

export class SoftwareSolutionPersonalization {
	private table: Table;
	private target: string;
	private model: JSONModel;
	private defaultSortProperty: DefaultSortProperty;
	private resourceBundle: ResourceBundle;
	private metadataHelper: MetadataHelper;

	private static readonly metadataHelpers = new Map<string, MetadataHelper>();

	constructor(
		table: Table,
		defaultSortProperty: DefaultSortProperty,
		target: string,
		model: JSONModel,
		resourceBundle?: ResourceBundle,
	) {
		this.table = table;
		this.defaultSortProperty = defaultSortProperty;
		this.target = target;
		this.model = model;
		this.resourceBundle = resourceBundle;

		this.processInternationlization();
		this.initializeTableForP13n();
	}

	private processInternationlization(): void {
		const data = this.model.getData() as { items: ViewSettingsDialogItem[] };
		if (!data.items || data.items.length <= 0 || !this.resourceBundle) {
			return; // No reason to process
		}

		for (const el of data.items) {
			if (!el.key) continue;
			el.label = this.resourceBundle.getText(el.key);
		}

		this.model.setData(data);
	}

	private initializeTableForP13n(): void {
		const columns = this.model.getProperty(this.target) as MetadataObject[];
		this.metadataHelper = new MetadataHelper(columns);

		if (
			!SoftwareSolutionPersonalization.metadataHelpers.has(this.table.getId())
		) {
			SoftwareSolutionPersonalization.metadataHelpers.set(
				this.table.getId(),
				this.metadataHelper,
			);
		}

		Engine.getInstance().register(this.table, {
			helper: this.metadataHelper,
			controller: {
				Columns: new SelectionController({
					targetAggregation: "columns",
					control: this.table,
				}),
				Sorter: new SortController({
					control: this.table,
				}),
				Group: new GroupController({
					control: this.table,
				}),
			},
		});

		Engine.getInstance().attachStateChange(this.handleStateChange.bind(this));

		Engine.getInstance()
			.retrieveState(this.table)
			.then((state) => {
				const controllerState = state as CustomState;
				if (controllerState.Sorter.length === 0) {
					controllerState.Sorter.push(this.defaultSortProperty);
					Engine.getInstance()
						.applyState(this.table, state)
						.catch((e) => {
							throw e;
						});
				}
			})
			.catch((e) => {
				console.error("Failed to handle table personalization", e);
			});
	}

	public openTableSettings(event: Event): void {
		Engine.getInstance()
			.show(this.table, ["Columns", "Sorter", "Group"], {
				contentWidth: "25rem",
				contentHeight: "55rem",
				source: event.getSource() || this.table,
			} as Record<string, unknown>)
			.catch((e) => {
				console.error("Failed to open table settings menu", e);
			});
	}

	public onSort(event: Event): void {
		const params = event.getParameters() as Record<string, unknown>;
		const sortItem = params["item"] as QuickSortItem;
		const affectedProperty = sortItem.getKey();
		const sSortOrder = sortItem.getSortOrder();

		this.table.setBusyIndicatorDelay(0).setBusy(true);

		Engine.getInstance()
			.retrieveState(this.table)
			.then((state) => {
				const customState = state as CustomState;
				customState.Sorter.forEach((sorter: SortState) => {
					sorter.sorted = false;
				});

				if (sSortOrder !== SortOrder.None) {
					customState.Sorter.push({
						key: affectedProperty,
						descending: sSortOrder === SortOrder.Descending,
					});
				}

				Engine.getInstance()
					.applyState(this.table, customState)
					.catch((e) => {
						throw e;
					});
			})
			.catch((e) => {
				console.error("Failed to sort using personalization", e);
			})
			.finally(() => {
				this.table.setBusy(false);
			});
	}

	public onGroup(event: Event): void {
		const params = event.getParameters() as Record<string, unknown>;
		const groupItem = params["item"] as QuickGroupItem;
		const affectedProperty = groupItem.getKey();

		Engine.getInstance()
			.retrieveState(this.table)
			.then((state) => {
				const customState = state as CustomState;
				customState.Group.forEach((group: GroupState) => {
					group.grouped = false;
				});

				if (groupItem.getGrouped()) {
					customState.Group.push({ key: affectedProperty });
				}

				Engine.getInstance()
					.applyState(this.table, customState)
					.catch((e) => {
						throw e;
					});
			})
			.catch((e) => {
				console.error("Failed to apply grouping based on personalization", e);
			});
	}

	public beforeOpenQuickMenu(event: Event, menu: Menu): void {
		const params = event.getParameters() as Record<string, unknown>;
		const column = params["openBy"] as Column;
		const sortItem = (menu.getQuickActions()[0] as QuickSort).getItems()[0];
		const groupItem = (menu.getQuickActions()[1] as QuickGroup).getItems()[0];
		sortItem.setKey(column.data("p13nKey") as string);
		sortItem.setLabel(column.getHeader().getProperty("text") as string);
		sortItem.setSortOrder(column.getSortIndicator());

		groupItem.setKey(column.data("p13nKey") as string);
		groupItem.setLabel(column.getHeader().getProperty("text") as string);
		groupItem.setGrouped(column.data("grouped") as boolean);
	}

	private handleStateChange(event: Event) {
		const params = event.getParameters() as Record<string, unknown>;
		const table = params["control"] as Table;
		const state = params["state"] as CustomState;
		if (!state || !state?.Columns) return;

		this.updateColumns(state, table);

		const groups = this.createGroups(state, table);
		const sorter = this.createSorters(state, table, groups);
		(table.getBinding("items") as ODataListBinding).sort(sorter);
	}

	private updateColumns(state: CustomState, table: Table) {
		if (!state || !state?.Columns) return;

		table.getColumns().forEach((column: Column, index: number) => {
			column.setVisible(false);
			column.data("grouped", false);
		});

		state.Columns.forEach((oProp, index) => {
			const col = table
				.getColumns()
				.find((column) => column.data("p13nKey") === oProp.key);
			col.setSortIndicator(SortOrder.None);

			if (!col) return;
			const oldIndex = table.getColumns().indexOf(col);
			col.setVisible(true);

			table.removeColumn(col);
			table.insertColumn(col, index);

			const fnMoveCells = (columnListItem: unknown) => {
				if (columnListItem instanceof ColumnListItem) {
					const cell = columnListItem.removeCell(oldIndex);
					if (cell != null) columnListItem.insertCell(cell, index);
				}
			};

			const itemsBindingInfo = table.getBindingInfo(
				"items",
			) as AggregationBindingInfo;
			fnMoveCells(itemsBindingInfo.template);
			table.getItems().forEach((item) => fnMoveCells(item));
		});
	}

	private createSorters(
		state: CustomState,
		table: Table,
		exisitingSorters?: Sorter[],
	) {
		const sorters: Array<Sorter> = exisitingSorters || [];
		state.Sorter.forEach((sorter) => {
			const exisitingSorter = sorters.find((sort: Sorter) => {
				return (
					sort.getPath() ===
					SoftwareSolutionPersonalization.metadataHelpers
						.get(table.getId())
						.getProperty(sorter.key).path
				);
			}) as CustomSorter;

			if (exisitingSorter) {
				exisitingSorter.bDescending = !!sorter.descending;
			} else {
				sorters.push(
					new Sorter(
						SoftwareSolutionPersonalization.metadataHelpers
							.get(table.getId())
							.getProperty(sorter.key).path,
						sorter.descending,
					),
				);
			}
		});

		state.Sorter.forEach((sorter) => {
			const oCol = table
				.getColumns()
				.find((column) => column.data("p13nKey") === sorter.key);
			if (sorter.sorted !== false) {
				oCol.setSortIndicator(sorter.descending ? "Descending" : "Ascending");
			}
		});
		return sorters;
	}

	private createGroups(state: CustomState, table: Table) {
		const groupings: Array<Sorter> = [];
		state.Group.forEach((group) => {
			groupings.push(
				new Sorter(
					SoftwareSolutionPersonalization.metadataHelpers
						.get(table.getId())
						.getProperty(group.key).path,
					false,
					true,
				),
			);
		});

		state.Group.forEach((sorter) => {
			const col = table
				.getColumns()
				.find((column) => column.data("p13nKey") === sorter.key);
			col.data("grouped", true);
		});

		return groupings;
	}
}
