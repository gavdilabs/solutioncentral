import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";
import Device from "sap/ui/Device";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import { ADTImportType, CompanyConfiguration } from "./lib/types";
import Messaging from "sap/ui/core/Messaging";
import Message from "sap/ui/core/message/Message";
import MessageType from "sap/ui/core/message/MessageType";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import JSONModel from "sap/ui/model/json/JSONModel";
import Dialog from "sap/m/Dialog";
import IllustratedMessage from "sap/m/IllustratedMessage";
import IllustrationPool from "sap/m/IllustrationPool";
import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import { ADT_NODES_MODEL_NAME } from "./lib/constants";

const TIMEOUT_WARNING_TIME: number = 780000; //Milliseconds : 13 minutes
const TIMEOUT_TIME: number = 900000; // 15 minutes

/**
 * @namespace com.gavdilabs.techtransmgt.solutioncentral
 */
export default class Component extends UIComponent {
	public static metadata = {
		manifest: "json",
		interfaces: ["sap.ui.core.IAsyncContentCreation"],
	};

	private contentDensityClass: string;
	private warningTimer: number;
	private timeoutTimer: number;
	private timeoutDialog: Dialog;

	public init(): void {
		// call the base component's init function
		super.init();

		// create the device model
		this.setModel(models.createDeviceModel(), "device");

		// create the views based on the url/hash
		this.getRouter().initialize();
		void this.loadLoggedUsed();
		void this.loadCompanyConfig();

		const tntSetConfig = {
			setFamily: "tnt",
			setURI: sap.ui.require.toUrl("sap/tnt/themes/base/illustrations"),
		};

		// register tnt illustration set
		IllustrationPool.registerIllustrationSet(tntSetConfig, false, undefined);

		void this.resetTimers();
		document.onkeydown = this.resetTimers.bind(this);
		document.onmousemove = this.resetTimers.bind(this);
	}

	/**
	 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
	 * design mode class should be set, which influences the size appearance of some controls.
	 * @public
	 * @returns css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
	 */
	public getContentDensityClass(): string {
		if (this.contentDensityClass === undefined) {
			// check whether FLP has already set the content density class; do nothing in this case
			if (
				document.body.classList.contains("sapUiSizeCozy") ||
				document.body.classList.contains("sapUiSizeCompact")
			) {
				this.contentDensityClass = "";
			} else if (!Device.support.touch) {
				// apply "compact" mode if touch is not supported
				this.contentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				this.contentDensityClass = "sapUiSizeCozy";
			}
		}
		return this.contentDensityClass;
	}

	public async getCompanyConfiguration(): Promise<
		CompanyConfiguration | undefined
	> {
		const model = this.getModel() as ODataModel;

		try {
			const binding = model.bindContext("/CompanyConfiguration");
			return (await binding.requestObject()) as CompanyConfiguration;
		} catch (e) {
			console.error("Error fetching Company Configuration: ", e);
			throw e;
		}
	}

	public hasErrorMessages(): boolean {
		return (
			(Messaging.getMessageModel().getProperty("/") as Message[]).filter(
				(message: Message) => message.getType() === MessageType.Error,
			).length > 0
		);
	}

	public removeAllTechnicalMessages(): void {
		const aTechnicalMessages = (
			Messaging.getMessageModel().getProperty("/") as Message[]
		).filter((message) => message.getTechnical());
		Messaging.removeMessages(aTechnicalMessages);
	}

	public async loadLoggedUsed() {
		const activeUserCtx = this.getModel().bindContext(
			"/getActiveUser(...)",
		) as ODataContextBinding;
		await activeUserCtx.invoke().then(
			async () => {
				const activeUser = (await activeUserCtx.requestObject()) as Record<
					string,
					unknown
				>;

				const loggedUserModel = this.getModel("activeUserModel") as JSONModel;
				loggedUserModel.setData(activeUser);
				loggedUserModel.refresh();
			},
			(err) => {
				//TODO: add proper error handling
			},
		);
	}

	private async loadCompanyConfig() {
		const config = await this.getCompanyConfiguration();
		const appConfigModel = this.getModel("appConfig") as JSONModel;

		appConfigModel?.setProperty("/companyConfiguration", config);
	}

	private async resetTimers() {
		clearTimeout(this.warningTimer);
		clearTimeout(this.timeoutTimer);

		const model = this.getModel("i18n") as ResourceModel;
		const i18n = await model.getResourceBundle();

		this.warningTimer = setTimeout(() => {
			this.timeoutDialog = new Dialog({
				title: i18n.getText("timeout.title"),
				contentWidth: "20rem",
				content: new IllustratedMessage({
					title: i18n.getText("timeout.warningTitle"),
					illustrationType: "tnt-SessionExpiring",
					description: i18n.getText("timeout.warningDesc"),
				}),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: i18n.getText("timeout.warningConfirm"),
					press: () => this.timeoutDialog.close(),
				}),
				afterClose: () => this.timeoutDialog.destroy(),
			});
			this.timeoutDialog.open();
		}, TIMEOUT_WARNING_TIME);

		this.timeoutTimer = setTimeout(() => {
			if (this.timeoutDialog) {
				if (this.timeoutDialog.isOpen()) this.timeoutDialog.close();
				this.timeoutDialog.destroy();
			}

			const dialog = new Dialog({
				title: i18n.getText("timeout.title"),
				contentWidth: "20rem",
				content: new IllustratedMessage({
					title: i18n.getText("timeout.timedOutTitle"),
					illustrationType: "tnt-SessionExpired",
					description: i18n.getText("timeout.timedOutDesc"),
				}),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: i18n.getText("timeout.timedOutConfirm"),
					press: () => {
						dialog.close();
						window.location.reload();
					},
				}),
				escapeHandler: () => {
					dialog.close();
					window.location.reload();
				},
			});
			dialog.open();
		}, TIMEOUT_TIME);
	}

	public async fetchPackagesFromADT() {
		const context = this.getModel().bindContext(
			"/fetchSolutionsFromSAPBackend(...)",
		) as ODataContextBinding;

		return await context.invoke().then(async () => {
			return (await context.requestObject()) as Record<string, unknown>;
		});
	}

	public async importPackagesFromADT(packages: ADTImportType[]) {
		const context = this.getModel().bindContext(
			"/importSolutionsFromADT(...)",
		) as ODataContextBinding;
		context.setParameter("packages", packages);
		return await context.invoke().then(async () => {
			return (await context.requestObject()) as Record<string, unknown>;
		});
	}

	public async refreshADTNodesModel() {
		const result = await this.fetchPackagesFromADT();
		const resObject = {
			count: (result?.nodes as Record<string, unknown>[]).length,
			nodes: (result?.nodes as Record<string, unknown>[]).map((node) => ({
				...node,
				selected: false,
			})),
		};

		const jsonModel = new JSONModel(resObject);
		jsonModel.setSizeLimit(5000);
		this.setModel(jsonModel, ADT_NODES_MODEL_NAME);
	}
}
