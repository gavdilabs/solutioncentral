import List from "sap/m/List";
import BaseController from "./BaseController";
import DragInfo from "sap/ui/core/dnd/DragInfo";
import DropInfo from "sap/ui/core/dnd/DropInfo";
import { dnd } from "sap/ui/core/library";
import Dialog from "sap/m/Dialog";
import Fragment from "sap/ui/core/Fragment";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace com.gavdilabs.techradar.controller
 */
export default class Main extends BaseController {

	private _TechDialog: Dialog;
	public onInit(): void {
		this.attachDragAndDrop();
	}

	private attachDragAndDrop(): void {
		const oList = this.getView().byId("StoppingList") as List;

		oList.addDragDropConfig(new DragInfo({ sourceAggregation: "items" }));

		oList.addDragDropConfig(
			new DropInfo({
				targetAggregation: "items",
				dropPosition: dnd.DropPosition.Between,
				//drop: this.onDrop.bind(this),
			}),
		);
	}

	public async addTechnology() : Promise<void> {
		const oModel = this.getView().getModel() as ODataModel;
		const oListBinding = oModel.bindList("/Technology", undefined, undefined, undefined, { $$updateGroupId: "techUpdateGroup" });
		const oContext = oListBinding.create();

		if(!this._TechDialog) {
            this._TechDialog ??= await Fragment.load({ id:"TechnologyDialog", name: 'com.gavdilabs.techradar.view.fragments.TechnologyDialog', controller: this }) as Dialog;
            this.getView().addDependent(this._TechDialog);		
			this._TechDialog.setBindingContext(oContext);
        }
		this._TechDialog.open();
	}

	public async saveTechnology() : Promise<void> {		
		const oModel = this.getView().getModel() as ODataModel;
		this._TechDialog.setBusy(true);
		try {
			await oModel.submitBatch("techUpdateGroup");
			this._TechDialog.setBusy(false);
			this._TechDialog.close();
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
