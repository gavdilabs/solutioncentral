import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import List from "sap/m/List";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import OverflowToolbar from "sap/m/OverflowToolbar";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace com.gavdilabs.config.controller
 */
export default class Main extends BaseController {
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

	public onButtonAddUserPress() {
		
	}

	public onButtonAddTeamPress() {
		
	}

	public onButtonAddConfigPress() {
		const oList = this.getView().byId("idCompanyConfigurationList") as List;
		(oList.getBinding("items") as ODataListBinding).create();
	}
	
	public async onSaveButtonPress() {
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
