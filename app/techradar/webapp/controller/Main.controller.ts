import BaseController from "./BaseController";
import Dialog from "sap/m/Dialog";
import Fragment from "sap/ui/core/Fragment";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import GridContainer from "sap/f/GridContainer";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import Context from "sap/ui/model/odata/v4/Context";
import Control from "sap/ui/core/Control";
import { CustomListItem$DetailClickEvent } from "sap/ui/webc/main/CustomListItem";
import MultiComboBox from "sap/m/MultiComboBox";
import { MultiComboBox$ChangeEvent } from "sap/ui/webc/main/MultiComboBox";
import Item from "sap/ui/core/Item";
import GridList from "sap/f/GridList";
import GridListItem from "sap/f/GridListItem";
import Select from "sap/m/Select";
import MessageBox from "sap/m/MessageBox";
import { FilterBar$ClearEvent } from "sap/ui/comp/filterbar/FilterBar";
import { List$ItemDeleteEvent } from "sap/ui/webc/main/List";
import SelectDialog, { SelectDialog$ConfirmEvent } from "sap/m/SelectDialog";
import List from "sap/m/List";
import ListItem from "sap/ui/core/ListItem";
import JSONModel from "sap/ui/model/json/JSONModel";
import Input from "sap/m/Input";
import ComboBox from "sap/m/ComboBox";
import Messaging from "sap/ui/core/Messaging";
import { Button$PressEvent } from "sap/m/Button";
import MessagePopover from "sap/m/MessagePopover";
import Message from "sap/ui/core/message/Message";
import MessageType from "sap/ui/core/message/MessageType";
import { DropInfo$DropEvent } from "sap/ui/core/dnd/DropInfo";
import Sorter from "sap/ui/model/Sorter";

/**
 * @namespace com.gavdilabs.techradar.controller
 */
export default class Main extends BaseController {
	private _TechDialog: Dialog;
	private _SortDialog: Dialog;
	private _SoftwareDialog: SelectDialog;
	private _oMessagePopover: MessagePopover;
	private aTechAlternatives : Array<Context> = [];

	public onInit(): void {
		this.registerMessaging();
	}

	protected registerMessaging() {
        this.getView().setModel(Messaging.getMessageModel(), "message");
		Messaging.registerObject(this.getView(), true);
    }

	private hasMessages(sType: MessageType): boolean {
		const aMessages = Messaging.getMessageModel().getData() as Message[];
		for (const oMessage of aMessages) {
			if(oMessage.getType() === sType) {
				return true;
			}
		};
		return false;
	}

	public onTechnologyStatusReceived(): void {
		this.filterTechItems();
	}

	public async openSortDialog(): Promise<void> {
		if(!this._SortDialog) {
            this._SortDialog ??= await Fragment.load({ id:"TechnologyDialog", name: 'com.gavdilabs.techradar.view.fragments.Sort', controller: this }) as Dialog;
            this.getView().addDependent(this._SortDialog);
        }
		this._SortDialog.open();
	}

	public async sortTechnologies(): Promise<void> {

	}

	public async onMessagePopoverPress(oEvent: Button$PressEvent) {
		const oButton = oEvent.getSource();
		if(!this._oMessagePopover) {
            this._oMessagePopover ??= await Fragment.load({ name: 'com.gavdilabs.techradar.view.fragments.MessagePopover', controller: this }) as MessagePopover;
            this.getView().addDependent(this._oMessagePopover);
        }
		this._oMessagePopover.openBy(oButton);
	}

	public onFilterTechnologies() {
		this.filterTechItems();
	}

	public onClearTechnologies(oEvent: FilterBar$ClearEvent) {
		(this.getView().byId("MaturityFilter") as Select).setSelectedKey("");
		(this.getView().byId("TechnologyFilter") as MultiComboBox).setSelectedKeys([]);
		(this.getView().byId("TechnologyGroupFilter") as MultiComboBox).setSelectedKeys([]);
		this.filterTechItems();
	}

	private filterTechItems(): void {
		const oGridList = this.getView().byId("TechGrid") as GridContainer;
		const aListItems = oGridList.getItems() as GridList[];

		for (const oListItem of aListItems) {
			const aFilters = this.getTechFilters();
			const iMaturityStatusCode = (oListItem.getBindingContext() as Context).getProperty("code") as number;
			aFilters.push(new Filter("maturityStatus_code", FilterOperator.EQ, iMaturityStatusCode));

			const oListBinding = oListItem.getBinding("items") as ODataListBinding;
			oListBinding.filter(aFilters);
			if (oListBinding.isSuspended()) {
				oListBinding.resume();
			}
		}
	}

	private getTechFilters(): Filter[] {
		const aFilters: Filter[] = [];

		const sMaturity = (this.getView().byId("MaturityFilter") as Select).getSelectedKey();
		if(sMaturity)
			aFilters.push(new Filter("maturityLevel", FilterOperator.EQ, sMaturity));

		const aTechnologies = (this.getView().byId("TechnologyFilter") as MultiComboBox).getSelectedKeys();
		aTechnologies.forEach((sTechId) => {
			aFilters.push(new Filter("ID", FilterOperator.EQ, sTechId));
		});

		const aTechnologyGroups = (this.getView().byId("TechnologyGroupFilter") as MultiComboBox).getSelectedKeys();
		aTechnologyGroups.forEach((sTechGroupId) => {
			aFilters.push(new Filter("group_code", FilterOperator.EQ, sTechGroupId));
		})

		return aFilters;
	}

	public async onDrop(oInfo: DropInfo$DropEvent): Promise<void> {
		const oControl = oInfo.getParameter("droppedControl") as Control;
		let iMaturityStatusCode: number;
		/* if(oControl instanceof CustomListItem) {
			const oList = oControl.getParent() as List; */
		if(oControl instanceof GridListItem) {
			const oList = oControl.getParent() as GridList;
			iMaturityStatusCode = (oList.getBindingContext() as Context).getProperty("code") as number;
		} else {
			iMaturityStatusCode = (oControl.getBindingContext() as Context).getProperty("code") as number;
		}

		const oDraggedListItem = oInfo.getParameter("draggedControl") as GridListItem;
		const oContext = oDraggedListItem.getBindingContext() as Context;

		void oContext.setProperty("maturityStatus_code", iMaturityStatusCode);
		const oModel = this.getView().getModel() as ODataModel;
		await oModel.submitBatch("techUpdateGroup");
		oModel.refresh();

		// const oGridList = this.getView().byId("TechGrid") as GridContainer;
		// oGridList.getBinding("items").refresh();
		// (this.getView().getModel() as ODataModel).refresh();
	}

	public async onPressAddTechnology() : Promise<void> {
		const oModel = this.getView().getModel() as ODataModel;
		const oListBinding = oModel.bindList("/Technology", undefined, undefined, undefined, { $$updateGroupId: "techUpdateGroup" });
		const oContext = oListBinding.create();
		//await oModel.submitBatch("techUpdateGroup");

		await this.openTechnologyDialog(oContext);
	}

	public async onDeleteSolution(oEvent: List$ItemDeleteEvent) {
		const oListItem = oEvent.getParameter("listItem") as ListItem;
		const oContext = oListItem.getBindingContext() as Context;
		await oContext.delete();
	}

	public async onAddSoftwareSolution() {
		let aFilters: Array<Filter> = [];
		const sTechnologyID = this._TechDialog.getBindingContext().getProperty("ID") as string;
		aFilters.push(new Filter("technology_ID", FilterOperator.EQ, sTechnologyID));

		const oModel = this.getView().getModel() as ODataModel;
		const oSoftwareTechnology = oModel.bindList("/SoftwareTechnology");
		oSoftwareTechnology.filter(aFilters);
		const aContexts = await oSoftwareTechnology.requestContexts();

		aFilters = [];
		aContexts.forEach(function (oContext) {
			const sSoftwareID = oContext.getProperty("softwareVersion_solution_ID") as string;
			aFilters.push(new Filter("ID", FilterOperator.NE, sSoftwareID));
		});

		if(!this._SoftwareDialog) {
            this._SoftwareDialog ??= await Fragment.load({ id:"SoftwareDialog", name: 'com.gavdilabs.techradar.view.fragments.AddSolutionDialog', controller: this }) as SelectDialog;
            this.getView().addDependent(this._SoftwareDialog);
        }

		const oSelectDialog = Fragment.byId("SoftwareDialog","SoftwareSelect") as SelectDialog;
		const oListBinding = oSelectDialog.getBinding("items") as ODataListBinding;
		const aSorter = [];
		aSorter.push(new Sorter({ path: 'solution/name', descending: false, group: true}));
		aSorter.push(new Sorter({path: 'version', descending: true}));
		oListBinding.sort(aSorter);
		this._SoftwareDialog.open("");
	}

	public onSearchSolutions() {

	}

	public async onConfirmSolution(oEvent: SelectDialog$ConfirmEvent) {
		const oItem = oEvent.getParameter("selectedItem");
		const sSolutionID = oItem.getBindingContext().getProperty('solution_ID') as string;
		const sSolutionVersionID = oItem.getBindingContext().getProperty("ID") as string;
		const sName = oItem.getBindingContext().getProperty("solution/name") as string;
		const sDescription = oItem.getBindingContext().getProperty("solution/description") as string;
		const sVersion = oItem.getBindingContext().getProperty("version") as string;

		const oList = Fragment.byId("TechnologyDialog","TechnologySolutions") as List;
		const oBinding = oList.getBinding("items") as ODataListBinding;
		const oContext = oBinding.create();
		await oContext.setProperty("softwareVersion_solution_ID", sSolutionID);
		await oContext.setProperty("softwareVersion_ID", sSolutionVersionID);
		await oContext.setProperty("softwareVersion/solution/name", sName);
		await oContext.setProperty("softwareVersion/solution/description", sDescription);
		await oContext.setProperty("softwareVersion/version", sVersion);
	}

	public async openTechnologyDialog(oContext: Context) : Promise<void> {
		if(!this._TechDialog) {
            this._TechDialog ??= await Fragment.load({ id:"TechnologyDialog", name: 'com.gavdilabs.techradar.view.fragments.TechnologyDialog', controller: this }) as Dialog;
            this.getView().addDependent(this._TechDialog);
        }
		this._TechDialog.setBindingContext(oContext);
		this._TechDialog.open();

		const oTechAlternative = Fragment.byId("TechnologyDialog","TechAlternatives") as MultiComboBox;
        oTechAlternative.setSelectedKeys([]);

		const oAppConfig = this.getModel("appConfig") as JSONModel;
		const oGetResourceBundle = await this.getResourceBundle();
		if(oContext.isTransient()) {
			oAppConfig.setProperty("/techDialogTitle", oGetResourceBundle.getText("lblAddNewTechnology"));
		} else {
			oAppConfig.setProperty("/techDialogTitle", oGetResourceBundle.getText("lblEditTechnology"));
		}
	}

	public async onPressTechnology(oEvent: CustomListItem$DetailClickEvent) : Promise<void> {
		const oContext = oEvent.getSource().getBindingContext() as Context;
		await this.openTechnologyDialog(oContext);

		const sTechId = oContext.getProperty("ID") as number;
		const aTechAlternatives = await this.getTechAlternatives(sTechId);
        const oTechAlternative = Fragment.byId("TechnologyDialog","TechAlternatives") as MultiComboBox;
        oTechAlternative.setSelectedKeys(aTechAlternatives);
	}

	public async getTechAlternatives(sTechId: number) : Promise<string[]> {
        const oModel = this.getView().getModel() as ODataModel;
        const aFilters: Array<Filter> = [];
        const aTechAlternatives : Array<string> = [];
        aFilters.push(new Filter("source", FilterOperator.EQ, sTechId));

        const oList = oModel.bindList("/TechnologyReplacement", null, null, aFilters, { "$$updateGroupId": 'techUpdateGroup' });
        this.aTechAlternatives = await oList.requestContexts();
        this.aTechAlternatives.forEach((oContext) => {
            aTechAlternatives.push(oContext.getProperty("target") as string);
        });
        return aTechAlternatives;
    }

	public async changeTechAlternatives(oEvent: MultiComboBox$ChangeEvent) : Promise<void> {
		const oItem = oEvent.getParameter("changedItem") as Item;
		const bSelected = oEvent.getParameter("selected") as boolean;
		const sTarget = (oItem.getBindingContext() as Context).getProperty("ID") as number;
		if(bSelected === false) {
			for (const oContext of this.aTechAlternatives) {
				if(sTarget === oContext.getProperty("target")) {
					await oContext.delete("techReplacementGroup");
				}
			}
		} else {
			const oModel = this.getView().getModel() as ODataModel;
			const oBinding = oModel.bindList("/TechnologyReplacement", null, null, null, { "$$updateGroupId": 'techReplacementGroup' });
			const oContext = oBinding.create();
			await oContext.setProperty("target",sTarget);

			const sSource = this._TechDialog.getBindingContext().getProperty("ID") as number;
			if(sSource) {
				await oContext.setProperty("source",sSource);
			} else {
				this.aTechAlternatives.push(oContext);
			}
		}
	}

	public validateTechnology() {
		const oControls = this.getView().getControlsByFieldGroupId("TechnologyGroup");
    	let bValid: boolean = true;

		oControls.forEach((oControl) => {
			if (oControl instanceof Input) {
				if (oControl.getRequired() && oControl.getVisible() && !oControl.getValue()) {
					oControl.setValueState("Error");
					bValid = false;
				} else {
					oControl.setValueState("None");
				}
			} else if (oControl instanceof Select || oControl instanceof ComboBox) {
				if ( oControl.getRequired() && oControl.getVisible() && !oControl.getSelectedItem()) {
					oControl.setValueState("Error");
					bValid = false;
				} else {
					oControl.setValueState("None");
				}
			}
		});
		return bValid;
	}

	public async onSaveTechnology() : Promise<void> {
		Messaging.removeAllMessages();

		if(this.validateTechnology()) {
			const oModel = this.getView().getModel() as ODataModel;
			this._TechDialog.setBusy(true);
			const oGetResourceBundle = await this.getResourceBundle();
			try {
				await oModel.submitBatch("techUpdateGroup");
				await this.syncSoftwareReplacements();
				await oModel.submitBatch("techReplacementGroup");

				this._TechDialog.setBusy(false);

				if(!this.hasMessages(MessageType.Error)) {
					this._TechDialog.close();
					MessageBox.success(oGetResourceBundle.getText("msgTechSaved"), {
						onClose: function () {
							oModel.refresh();
						},
					});
					//oModel.refresh();
				}
			} catch (oError) {
				this._TechDialog.setBusy(false);
				MessageBox.error(oGetResourceBundle.getText("msgTechNotSaved"));
			}
		}
	}

	private async syncSoftwareReplacements() {
		const iSource = this._TechDialog.getBindingContext().getProperty("ID") as number;
		for (const oContext of this.aTechAlternatives) {
			if(oContext.getProperty("source") === null) {
				await oContext.setProperty("source", iSource);
			}
		};
	}

	public onCancelTechnology() : void {
		this._TechDialog.close();

		const oModel = this.getView().getModel() as ODataModel;
		if (oModel.hasPendingChanges("techUpdateGroup")) {
			oModel.resetChanges("techUpdateGroup");
		}
	}

}
