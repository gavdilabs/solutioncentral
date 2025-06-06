import Table from "sap/m/Table";
import Engine, { State } from "sap/m/p13n/Engine";
import MetadataHelper from "sap/m/p13n/MetadataHelper";
import GroupController, { GroupState } from "sap/m/p13n/GroupController";
import SortController, { SortState } from "sap/m/p13n/SortController";
import SelectionController, { SelectionState } from "sap/m/p13n/SelectionController";
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

export interface CustomState extends State {
	Columns?: Array<SelectionState>,
	Sorter?: Array<SortState>,
	Group?: Array<GroupState>
}

export interface CustomSorter extends Sorter {
	bDescending: boolean;
	sPath: string;
	vGroup: boolean;
}

export class SoftwareSolutionPersonalization {
	private readonly table: Table;
	private readonly target: string;
	private readonly model: JSONModel;
	private metadataHelper: MetadataHelper;

	constructor(
		table: Table,
		target: string,
		model: JSONModel) {
		this.table = table;
		this.target = target;
		this.model = model;
		this.initializeTableForP13n();
	}

	private initializeTableForP13n(): void {
		const columns = this.model.getProperty(this.target);
		this.metadataHelper = new MetadataHelper(columns);
		Engine.getInstance().register(this.table, {
			helper: this.metadataHelper,
			controller: {
				Columns: new SelectionController({
					targetAggregation: 'columns',
					control: this.table
				}),
				Sorter: new SortController({
					control: this.table
				}),
				Group: new GroupController({
					control: this.table
				})
			}
		});

		Engine.getInstance().attachStateChange(this.handleStateChange.bind(this));

		Engine.getInstance()
		.retrieveState(this.table)
		.then((state) => {
			const controllerState = state as CustomState;
			if (controllerState.Sorter.length === 0) {
				controllerState.Sorter.push({
					key: "colSolutionName",
					descending: true,
				});
				Engine.getInstance().applyState(this.table, state);
			}
		});
	}

	public openTableSettings(event: Event): void {
		Engine.getInstance().show(this.table, ["Columns", "Sorter", "Group"], {
			contentWidth: '25rem',
			contentHeight: '55rem',
			source: event.getSource() || this.table,
		} as Record<string, unknown>);
	}

	public onSort(event: Event): void {
		const params = event.getParameters() as Record<string, unknown>;
		const sortItem = params["item"] as QuickSortItem;
		const affectedProperty = sortItem.getKey();
		const sSortOrder = sortItem.getSortOrder();

		this.table.setBusyIndicatorDelay(0).setBusy(true);

		Engine.getInstance()
			.retrieveState(this.table)
			.then((state) =>  {
				const customState = state as CustomState;
				customState.Sorter.forEach(function (sorter: any) {
					sorter.sorted = false;
				});

				if (sSortOrder !== SortOrder.None) {
					customState.Sorter.push({
						key: affectedProperty,
						descending: sSortOrder === 'Descending',
					});
				}

				Engine.getInstance().applyState(this.table, customState);
				this.table.setBusy(false);
			});
	}

	public onGroup(event: Event): void {
		const params = event.getParameters() as Record<string, unknown>;
		const groupItem = params["item"] as QuickGroupItem;
		const affectedProperty = groupItem.getKey() as string;

		Engine.getInstance().retrieveState(this.table).then((state) => {
			const customState = state as CustomState;
			customState.Group.forEach((group: GroupState) => {
				group.grouped = false;
			});

			if (groupItem.getGrouped()) {
				customState.Group.push({key: affectedProperty});
			}

			Engine.getInstance().applyState(this.table, customState);
		})
	}

	public beforeOpenQuickMenu(event: Event, menu: Menu): void {
		const params = event.getParameters() as Record<string, unknown>;
		const column = params["openBy"] as Column;
		const sortItem = (menu.getQuickActions()[0] as QuickSort).getItems()[0];
		const groupItem = (menu.getQuickActions()[1] as QuickGroup).getItems()[0];
		sortItem.setKey(column.data("p13nKey"));
		sortItem.setLabel(column.getHeader().getProperty("text"));
		sortItem.setSortOrder(column.getSortIndicator());

		groupItem.setKey(column.data("p13nKey"));
		groupItem.setLabel(column.getHeader().getProperty("text"));
		groupItem.setGrouped(column.data("grouped"));
	}

	private handleStateChange(event: Event) {
		const params = event.getParameters() as Record<string, unknown>;
		const state = params["state"] as CustomState;
		if(!state || !state?.Columns) return;

		this.updateColumns(state);

		const groups = this.createGroups(state);
		const sorter = this.createSorters(state, groups);
		(this.table.getBinding("items") as ODataListBinding).sort(sorter as any);
	}

	private updateColumns(state: CustomState) {
		if (!state || !state?.Columns) return;

		this.table.getColumns().forEach((column: Column, index: number) => {
			column.setVisible(false);
			column.data("grouped", false);
		});

		state.Columns.forEach((oProp: any, index: any) => {
			const col = this.table
				.getColumns()
				.find((column) => column.data("p13nKey") === oProp.key);
			col.setSortIndicator(SortOrder.None);

			if (!col) return;
			const oldIndex = this.table.getColumns().indexOf(col);
			col.setVisible(true);

			this.table.removeColumn(col);
			this.table.insertColumn(col, index);

			const fnMoveCells = (columnListItem: ColumnListItem | unknown) => {
				if (columnListItem instanceof ColumnListItem) {
					const cell = columnListItem.removeCell(oldIndex);
					if (cell != null) columnListItem.insertCell(cell, index);
				}
			};
			const itemsBindingInfo = this.table.getBindingInfo("items") as AggregationBindingInfo;
			fnMoveCells(itemsBindingInfo.template);
			this.table.getItems().forEach((item) => fnMoveCells(item));
		});
	}

	private createSorters(state: CustomState, exisitingSorters?: Sorter[]) {
		const sorters: Array<Sorter> = exisitingSorters || [];
		state.Sorter.forEach((sorter) =>  {
			const exisitingSorter = sorters.find(
				(sort: Sorter) => {
					return (
						sort.getPath() ===
						this.metadataHelper.getProperty(sorter.key).path
					);
				}
			) as CustomSorter;

			if (exisitingSorter) {
				exisitingSorter.bDescending = !!sorter.descending;
			} else {
				//@ts-ignore
				sorters.push(new Sorter(this.metadataHelper.getProperty(sorter.key).path, sorter.descending));
			}
		})

		state.Sorter.forEach((sorter) => {
            const oCol = this.table
              .getColumns()
              .find((column) => column.data("p13nKey") === sorter.key);
            if (sorter.sorted !== false) {
              oCol.setSortIndicator(
                sorter.descending
                  ? 'Descending'
                  : 'Ascending',
              );
            }
          });
		return sorters;
	}

	private createGroups (state: CustomState) {
		const groupings: Array<Sorter> = [];
		state.Group.forEach((group) => {
			groupings.push(new Sorter(this.metadataHelper.getProperty(group.key).path, false, true))
		});
		state.Group.forEach((sorter) => {
			const col = this.table.getColumns().find((column) => column.data("p13nKey") === sorter.key);
			col.data("grouped", true);
		})
		return groupings;
	}
}

