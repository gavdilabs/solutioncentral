import ResourceBundle from "sap/base/i18n/ResourceBundle";
import { EdmType } from "sap/ui/export/library";
import ListBinding from "sap/ui/model/ListBinding";
import TreeBinding from "sap/ui/model/TreeBinding";

export interface SpreadsheetConfig {
	workbook: {
		columns: SpreadsheetColumn[];
		context?: {
			application?: string;
			version?: string;
			title?: string;
			modifiedBy?: string;
			sheetName?: string;
			metaSheetName?: string;
			metainfo?: unknown[];
		};
		hierarchyLevel?: string;
	};
	dataSource: string | {
		sizeLimit: int;
	} | unknown[] | ListBinding | TreeBinding;
	count?: int;
	worker?: boolean;
	fileName?: string;
	showProgress?: boolean;
}

export interface SpreadsheetColumn {
	property: string | string[];
	type: EdmType;
	label?: string;
	trueValue?: unknown;
	falseValue?: unknown;
	scale?: number;
	delimiter?: boolean;
	template?: string;
}


const softwareSolutionColumns = new Map<string, SpreadsheetColumn>([
	["name", { property: "name", type: EdmType.String, label: "sheetSolutionName" }],
	["description", { property: "description", type: EdmType.String, label: "sheetSolutionDescr" }],
	["platform/name", { property: "platform/name", type: EdmType.String, label: "sheetSolutionPlatform" }],
	["packageNamespace", { property: "packageNamespace", type: EdmType.String, label: "sheetSolutionPackage" }],
	["repository", { property: "repository", type: EdmType.String, label: "sheetSolutionRepo" }],
	["documentationUrl", { property: "documentationUrl", type: EdmType.String, label: "sheetSolutionDocs" }],
	["businessCriticality/code", { property: "businessCriticality/code", type: EdmType.String, label: "sheetSolutionCriticality" }],
	["cleanCoreRating_code", { property: "cleanCoreRating_code", type: EdmType.String, label: "sheetSolutionCleanCore" }],
	["codeQualityRating_code", { property: "codeQualityRating_code", type: EdmType.String, label: "sheetSolutionCodeQuality" }],
	["solutionStatus/descr", { property: "solutionStatus/descr", type: EdmType.String, label: "sheetSolutionStatus" }],
	["reasonNoCleanCore", { property: "reasonNoCleanCore", type: EdmType.String, label: "sheetSolutionNoReason" }],
	["costCenter", { property: "costCenter", type: EdmType.String, label: "sheetSolutionCostCenter" }],
	["owner/fullName", { property: "owner/fullName", type: EdmType.String, label: "sheetSolutionOwner" }],
	["team/teamName", { property: "team/teamName", type: EdmType.String, label: "sheetSolutionTeamName" }],
]);

export function getSoftwareSolutionColumnConfig(
	visibleColumns: string[],
	resourceBundle?: ResourceBundle,
): SpreadsheetColumn[] {
	const cols = visibleColumns
		.map((el) => softwareSolutionColumns.get(el))
		.filter((el) => el);

	if (!resourceBundle) return cols;

	for (const col of cols) {
		col.label = resourceBundle.getText(col.label);
	}

	return cols;
}
