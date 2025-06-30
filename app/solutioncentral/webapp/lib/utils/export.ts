import ResourceBundle from "sap/base/i18n/ResourceBundle";
import { EdmType } from "sap/ui/export/library";
import ListBinding from "sap/ui/model/ListBinding";
import TreeBinding from "sap/ui/model/TreeBinding";
import { SoftwareSolutionExportColumns } from "../defaults";

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
	dataSource:
		| string
		| {
				sizeLimit: int;
		  }
		| unknown[]
		| ListBinding
		| TreeBinding;
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

export function getSoftwareSolutionColumnConfig(
	visibleColumns: string[],
	resourceBundle?: ResourceBundle,
): SpreadsheetColumn[] {
	const cols = visibleColumns
		.map((el) => SoftwareSolutionExportColumns.get(el))
		.filter((el) => el);

	if (!resourceBundle) return cols;

	for (const col of cols) {
		col.label = resourceBundle.getText(col.label);
	}

	return cols;
}
