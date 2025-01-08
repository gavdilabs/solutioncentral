//import List from "sap/m/List";
import BaseController from "./BaseController";
//import DragInfo from "sap/ui/core/dnd/DragInfo";
//import DropInfo, { DropInfo$DragEnterEvent } from "sap/ui/core/dnd/DropInfo";
//import { dnd } from "sap/ui/core/library";
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

/**
 * @namespace com.gavdilabs.techradar.controller
 */
export default class Main extends BaseController {
	private _TechDialog: Dialog;
	private aTechAlternatives : Array<Context> = [];

	public onInit(): void {	
	
	}

	public onTechnologyStatusReceived(): void {
		this.filterTechItems();
	}

	public filterTechnologies() {
		this.filterTechItems();
	}

	public clearTechnologies() {
		(this.getView().byId("MaturityFilter") as Select).setSelectedKey("");
		(this.getView().byId("TechnologyFilter") as MultiComboBox).setSelectedKeys([]);
		this.filterTechItems();
	}

	private filterTechItems(): void {
		const oGridList = this.getView().byId("TechGrid") as GridContainer;
		//const aListItems = oGridList.getItems() as List[];
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
			/* if(oListItem.getDragDropConfig().length === 0) {
				this.attachDragAndDrop(oListItem);
			} */
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

		return aFilters;
	}
	/* private attachDragAndDrop(oList: List): void {
		oList.addDragDropConfig(new DragInfo({ sourceAggregation: "items" }));
        oList.addDragDropConfig(
          new DropInfo({
            targetAggregation: "items",
            dropPosition: dnd.DropPosition.OnOrBetween,
            drop: this.onDrop.bind(this)
          })
        ); 
	} */

	public async onDrop(oInfo: DropInfo$DragEnterEvent): void {
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
		
		const oPromise = oContext.setProperty("maturityStatus_code", iMaturityStatusCode);
		const oModel = this.getView().getModel() as ODataModel;	
		await oModel.submitBatch("techUpdateGroup"); 
		oModel.refresh();
		
		//const oGridList = this.getView().byId("TechGrid") as GridContainer;
		//oGridList.getBinding("items").refresh();
		//(this.getView().getModel() as ODataModel).refresh();
	}
	
	public async addTechnology() : Promise<void> {
		const oModel = this.getView().getModel() as ODataModel;
		const oListBinding = oModel.bindList("/Technology", undefined, undefined, undefined, { $$updateGroupId: "techUpdateGroup" });
		const oContext = oListBinding.create();

		await this.openTechnologyDialog(oContext);		
	}

	public async openTechnologyDialog(oContext: Context) : Promise<void> {
		if(!this._TechDialog) {
            this._TechDialog ??= await Fragment.load({ id:"TechnologyDialog", name: 'com.gavdilabs.techradar.view.fragments.TechnologyDialog', controller: this }) as Dialog;
            this.getView().addDependent(this._TechDialog);		
			
        }
		this._TechDialog.setBindingContext(oContext);
		this._TechDialog.open();
	}

	public async pressTechnology(oEvent: CustomListItem$DetailClickEvent) : Promise<void> {
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
					await oContext.delete();
				}  
			}
		} else {
			const oModel = this.getView().getModel() as ODataModel;
			const oBinding = oModel.bindList("/TechnologyReplacement", null, null, null, { "$$updateGroupId": 'techUpdateGroup' });       
			const oContext = oBinding.create();
			const sSource = this._TechDialog.getBindingContext().getProperty("ID") as number;
			await oContext.setProperty("source",sSource);
			await oContext.setProperty("target",sTarget);
		}
	}

	public async saveTechnology() : Promise<void> {		
		const oModel = this.getView().getModel() as ODataModel;
		this._TechDialog.setBusy(true);
		try {
			await oModel.submitBatch("techUpdateGroup");
			this._TechDialog.setBusy(false);
			this._TechDialog.close();
			oModel.refresh();
		} catch (oError) {
			this._TechDialog.setBusy(false);	
		}	
	}

	public cancelTechnology() : void {
		this._TechDialog.close();

		const oModel = this.getView().getModel() as ODataModel;
		if (oModel.hasPendingChanges("techUpdateGroup")) {
			oModel.resetChanges("techUpdateGroup");
		}
	}

}
