import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";
import Device from "sap/ui/Device";
import IllustrationPool from "sap/m/IllustrationPool";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Dialog from "sap/m/Dialog";
import IllustratedMessage from "sap/m/IllustratedMessage";
import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";

const TIMEOUT_WARNING_TIME: number = 5000; //Milliseconds : 13 minutes
const TIMEOUT_TIME: number = 10000; // 15 minutes
// const TIMEOUT_WARNING_TIME: number = 780000; //Milliseconds : 13 minutes
// const TIMEOUT_TIME: number = 900000; // 15 minutes
/**
 * @namespace com.gavdilabs.techradar
 */
export default class Component extends UIComponent {
	public static metadata = {
		manifest: "json",
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

		const tntSetConfig = {
			setFamily: "tnt",
			setURI: sap.ui.require.toUrl("sap/tnt/themes/base/illustrations"),
		};

		// register tnt illustration set
		IllustrationPool.registerIllustrationSet(tntSetConfig, false);

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
}
