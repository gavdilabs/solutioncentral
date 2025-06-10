import MessageBox from "sap/m/MessageBox";
//import Action from "sap/m/MessageBox";
import BaseController from "./BaseController";
import List from "sap/m/List";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import OverflowToolbar from "sap/m/OverflowToolbar";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Table from "sap/m/Table";
import Dialog from "sap/m/Dialog";
import Fragment from "sap/ui/core/Fragment";
import Context from "sap/ui/model/odata/v4/Context";
import { Icon$PressEvent } from "sap/ui/core/Icon";
import Input from "sap/m/Input";
import Select from "sap/m/Select";
import CheckBox from "sap/m/CheckBox";
import ComboBox from "sap/m/ComboBox";
import DatePicker from "sap/m/DatePicker";
import Control from "sap/ui/core/Control";

/**
 * @namespace com.gavdilabs.config.controller
 */
export default class Main extends BaseController {

	private _userDialog: Dialog;
	private _teamDialog: Dialog;

	public onInit(): void {
		
	}
	
	public onCompanyConfigurationListUpdateFinished() {
		const oList = this.getView().byId("idCompanyConfigurationList") as List;
		const oBinding = oList.getBinding("items") as ODataListBinding;
		if(oBinding) {
			const oContext = oBinding.getHeaderContext();
			(this.getView().byId("idListOverflowToolbar") as OverflowToolbar).setBindingContext(oContext);
		}
	}

	public async onButtonAddUserPress() {
		//const oModel = this.getView().getModel() as ODataModel;
		//const oContext = oModel.bindList("/User", undefined, undefined, undefined, { $$updateGroupId: 'userUpdateGroup' }).create();
		const oTable = this.getView().byId("idUserTable") as Table;
		const oContext = (oTable.getBinding("items") as ODataListBinding).create();		
		await this.openUserDialog(oContext);
	}

	public async onIconEditUserPress(oEvent: Icon$PressEvent) {
		const oContext = oEvent.getSource().getBindingContext() as Context;
		await this.openUserDialog(oContext);	
	}

	public onIconDeleteUserPress(oEvent: Icon$PressEvent) {
		MessageBox.confirm(this.getText('msgDeleteUser'), {
			actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
			emphasizedAction: MessageBox.Action.OK,
			onClose: async (sAction: string ) => {
				if(sAction === 'OK') {
					const oContext = oEvent.getSource().getBindingContext() as Context;					
					await oContext.delete('$auto').then( () => {
						MessageBox.success(this.getText("msgUserSaved"));
					})
					.catch(() => {						
						MessageBox.error(this.getText("msgUserSaveError"));
					});		
				} 
			}
		});		
	}

	private async openUserDialog(oContext: Context) {
		if (!this._userDialog) {
			this._userDialog ??= (await Fragment.load({id: "UserDialog", name: "com.gavdilabs.config.view.fragments.UserDialog", controller: this })) as Dialog;
			this.getView().addDependent(this._userDialog);
		}		

		this._userDialog.setBindingContext(oContext);
		this._userDialog.open();	
	}
	
	public async onSaveButtonUserPress() {
		const aControls = this.getView().getControlsByFieldGroupId("UserFormGroup");
		if(this.validateInput(aControls)) {
			const oModel = this.getView().getModel() as ODataModel;
			this._userDialog.setBusy(true);
			try {
				await oModel.submitBatch("userUpdateGroup");
				MessageBox.success(this.getText("msgUserSaved"));				
				this._userDialog.close();
			} catch (catchError) {
				console.error(catchError);
				MessageBox.error(this.getText("msgUserSaveError"));
			}
			this._userDialog.setBusy(false);			
		}
	}
	
	public onCancelButtonUserPress() {
		const oModel = this.getView().getModel() as ODataModel;
		oModel.resetChanges("userUpdateGroup");
		this._userDialog.close();	
	}
	
	public onAssignTeamButtonPress() {		
		const oTable = Fragment.byId("UserDialog","idSoftwareTeamsTable") as Table; 
		(oTable.getBinding("items") as ODataListBinding).create();
	}

	public async onButtonAddTeamPress() {
		const oTable = this.getView().byId("idSoftwareTeamTable") as Table;
		const oContext = (oTable.getBinding("items") as ODataListBinding).create();
		await this.openTeamDialog(oContext);
	}

	public async onIconEditTeamPress(oEvent: Icon$PressEvent) {
		const oContext = oEvent.getSource().getBindingContext() as Context;
		await this.openTeamDialog(oContext);	
	}

	public onIconDeleteTeamPress(oEvent: Icon$PressEvent) {		
		MessageBox.confirm(this.getText('msgDeleteTeam'), {
			actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
			emphasizedAction: MessageBox.Action.OK,
			onClose: async (sAction: string ) => {
				if(sAction === 'OK') {
					const oContext = oEvent.getSource().getBindingContext() as Context;
					await oContext.delete('$auto').then( () => {
						MessageBox.success(this.getText("msgUserSaved"));
					})
					.catch(() => {						
						MessageBox.error(this.getText("msgUserSaveError"));
					});				
				} 
			}
		});		
	}

	private async openTeamDialog(oContext: Context) {
		if (!this._teamDialog) {
			this._teamDialog ??= (await Fragment.load({id: "TeamDialog", name: "com.gavdilabs.config.view.fragments.TeamDialog", controller: this })) as Dialog;
			this.getView().addDependent(this._teamDialog);
		}		

		this._teamDialog.setBindingContext(oContext);
		this._teamDialog.open();	
	}

	public onCancelButtonTeamPress() {
		const oModel = this.getView().getModel() as ODataModel;
		oModel.resetChanges("userUpdateGroup");
		this._teamDialog.close();	
	}	

	public async onSaveButtonTeamPress() {
		const aControls = this.getView().getControlsByFieldGroupId("TeamFormGroup");
		if(this.validateInput(aControls)) {
			const oModel = this.getView().getModel() as ODataModel;
			this._teamDialog.setBusy(true);
			try {
				await oModel.submitBatch("userUpdateGroup");
				MessageBox.success(this.getText("msgUserSaved"));
				this._teamDialog.close();
			} catch (catchError) {
				console.error(catchError);
				MessageBox.error(this.getText("msgUserSaveError"));
			}
			this._teamDialog.setBusy(false);
		}
	}	

	public onButtonAddConfigPress() {
		const oList = this.getView().byId("idCompanyConfigurationList") as List;
		(oList.getBinding("items") as ODataListBinding).create();
	}
	
	public async onSaveConfigButtonPress() {
		const aControls = this.getView().getControlsByFieldGroupId("CompanyFormGroup");
		if(this.validateInput(aControls)) {
			const oModel = this.getView().getModel() as ODataModel;
			this.getView().setBusy(true);
			try {
				await oModel.submitBatch("configUpdateGroup");
				MessageBox.success(this.getText("msgConfigSaved"));
			} catch (catchError) {
				console.error(catchError);
				MessageBox.error(this.getText("msgConfigSaveError"));
			}
			this.getView().setBusy(false);
		}
	}

	private validateInput(aControls: Control[]): boolean {		
		let bValid: boolean = true;

		aControls.forEach((oControl) => {		
			if (oControl instanceof Input || oControl instanceof DatePicker) {
				if ( oControl.getRequired() && oControl.getVisible() && !oControl.getValue() ) {
					oControl.setValueState("Error");
					bValid = false;
				} else if (oControl.getRequired()) {
					oControl.setValueState("None");
				}
			} else if (oControl instanceof Select || oControl instanceof ComboBox) {
				if ( oControl.getRequired() && oControl.getVisible() && !oControl.getSelectedItem() ) {
				oControl.setValueState("Error");
					bValid = false;
				} else {
					oControl.setValueState("None");
				}
			} else if (oControl instanceof CheckBox) {
				if (oControl.hasStyleClass("gavdiRequired") && oControl.getVisible() && !oControl.getSelected() ) {
					oControl.setValueState("Error");
					bValid = false;
				} else {
					oControl.setValueState("None");
				}
			}
		});		
		return bValid;
	}
}
