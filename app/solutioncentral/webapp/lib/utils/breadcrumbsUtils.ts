import Breadcrumbs from "sap/m/Breadcrumbs";
import Link from "sap/m/Link";
import BaseController from "../../controller/BaseController";
import { PageKeys } from "../constants";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

export class BreadcrumbsHandler {
	private i18nBundle: ResourceBundle;
	private controller: BaseController;
	private static readonly breadcrumbLinks = new Map<string, Link>();

	constructor(controller: BaseController, i18nBundle: ResourceBundle) {
		this.controller = controller;
		this.i18nBundle = i18nBundle;
		this.createHomeCrumb();
	}

	private createHomeCrumb() {
		if (!BreadcrumbsHandler.breadcrumbLinks.has(PageKeys.MAIN_VIEW)) {
			BreadcrumbsHandler.breadcrumbLinks.set(
				PageKeys.MAIN_VIEW,
				new Link({
					text: this.i18nBundle.getText("breadcrumb.solutions"),
					press: () => this.navToMain(),
				}),
			);
		}
	}

	public createObjectPageLink(text: string, key: string) {
		if (!BreadcrumbsHandler.breadcrumbLinks.has(key)) {
			BreadcrumbsHandler.breadcrumbLinks.set(
				key,
				new Link({
					text: text,
					press: () => this.navToObjectPage(key),
				}),
			);
		}
	}

	public setBreadcrumbLinks(breadcrumbContainer: Breadcrumbs) {
		breadcrumbContainer.removeAllLinks();
		BreadcrumbsHandler.breadcrumbLinks.forEach((link) => {
			breadcrumbContainer.addLink(link);
		});
	}

	private navToMain() {
		BreadcrumbsHandler.breadcrumbLinks.clear();
		this.controller.getRouter().navTo(PageKeys.MAIN_VIEW);
	}

	private navToObjectPage(key: string) {
		BreadcrumbsHandler.removeBreadcrumbsAfter(key);
		this.controller.getRouter().navTo(PageKeys.SOFTWARE_SOLUTION_OBJECT_PAGE, {
			key: key,
		});
	}

	public getKeyFromContextPath(input: string): string | null {
		const match = input.match(/\(([^)]+)\)/);
		return match ? match[1] : null;
	}

	public static removeBreadcrumbsAfter(clickedKey: string): void {
		const keysToRemove: string[] = [];
		let foundClicked = false;

		for (const [key, breadcrumb] of BreadcrumbsHandler.breadcrumbLinks) {
			if (foundClicked) {
				keysToRemove.push(key);
			}
			if (key === clickedKey) {
				foundClicked = true;
				keysToRemove.push(key);
			}
		}

		keysToRemove.forEach((key) =>
			BreadcrumbsHandler.breadcrumbLinks.delete(key),
		);
	}
}
