import MessageBox from "sap/m/MessageBox";
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

/**
 * @namespace com.gavdilabs.config.controller
 */
export default class Main extends BaseController {

	private _userDialog: Dialog;
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
		const oModel = this.getView().getModel() as ODataModel;
		//const oTable = this.getView().byId("idSoftwareTeamUserTable") as Table;
		const oContext = oModel.bindList("/User", undefined, undefined, undefined, { $$updateGroupId: 'userUpdateGroup' }).create();
		await this.openUserDialog(oContext);
	}

	public async onIconEditUserPress(oEvent: Icon$PressEvent) {
		const oContext = oEvent.getSource().getBindingContext() as Context;
		const oModel = this.getView().getModel() as ODataModel;
		const sUserName = oContext.getProperty("user_username") as string;		
		const oBinding = oModel.bindContext(`/User('${sUserName}')`);
		const oNewContext = oBinding.getBoundContext();		
		await this.openUserDialog(oNewContext);	
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
		const sUserName = (this._userDialog.getBindingContext() as Context).getProperty("username") as string;
		const oTable = Fragment.byId("UserDialog","idSoftwareTeamsTable") as Table;
		const aItems = oTable.getItems();

		for (const oItem of aItems) {		
			const oContext = oItem.getBindingContext() as Context;
			await oContext.setProperty("user_username",sUserName);
		};

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
	
	public onCancelButtonUserPress() {
		this._userDialog.close();	
	}
	
	public onAssignTeamButtonPress() {		
		const oTable = Fragment.byId("UserDialog","idSoftwareTeamsTable") as Table; 
		(oTable.getBinding("items") as ODataListBinding).create();
	}

	public onButtonAddTeamPress() {
		const oTable = this.getView().byId("idSoftwareTeamTable") as Table;
		(oTable.getBinding("items") as ODataListBinding).create();
	}

	public onButtonAddConfigPress() {
		const oList = this.getView().byId("idCompanyConfigurationList") as List;
		(oList.getBinding("items") as ODataListBinding).create();
	}
	
	public async onSaveConfigButtonPress() {
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

	public async onSaveTeamsButtonPress() {
		const oModel = this.getView().getModel() as ODataModel;
		this.getView().setBusy(true);
		try {
			await oModel.submitBatch("userUpdateGroup");
			MessageBox.success(this.getText("msgUserSaved"));
		} catch (catchError) {
			console.error(catchError);
			MessageBox.error(this.getText("msgUserSaveError"));
		}
		this.getView().setBusy(false);
	}
	
}
