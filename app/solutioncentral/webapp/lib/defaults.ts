import { EdmType } from "sap/ui/export/library";
import { SolutionCatalogueTableEntry } from "./types";
import { SpreadsheetColumn } from "./utils/export";

export const DefaultSolutionTableConfig = {
	filters: {}, // Must be here as an empty object otherwise the binding will break
	selectedItems: Array<SolutionCatalogueTableEntry>(),
	items: [
		{
			path: "name",
			key: "column.name",
			label: "column.name",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "platform/name",
			key: "column.platform",
			label: "column.platform",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "cleanCoreRating_code",
			key: "column.cleanCoreLevel",
			label: "column.cleanCoreLevel",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "codeQualityRating_code",
			key: "column.codeQualityLevel",
			label: "column.codeQualityLevel",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "solutionStatus_code",
			key: "column.status",
			label: "column.status",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "costCenter",
			key: "column.costCenter",
			label: "column.costCenter",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "businessCriticality/code",
			key: "column.businessCriticality",
			label: "column.businessCriticality",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "riskLevel/code",
			key: "column.riskLevel",
			label: "column.riskLevel",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "description",
			key: "column.description",
			label: "column.description",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "createdAt",
			key: "column.createdOn",
			label: "column.createdOn",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "createdBy",
			key: "column.createdBy",
			label: "column.createdBy",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "modifiedAt",
			key: "column.lastModified",
			label: "column.lastModified",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "modifiedBy",
			key: "column.lastModifiedBy",
			label: "column.lastModifiedBy",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "packageNamespace",
			key: "column.packageNamespace",
			label: "column.packageNamespace",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "repository",
			key: "column.repository",
			label: "column.repository",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "team/teamName",
			key: "column.team",
			label: "column.team",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "owner/fullName",
			key: "column.owner",
			label: "column.owner",
			selected: false,
			sortable: true,
			groupable: true,
		},
	],
};

export const SoftwareSolutionExportColumns = new Map<string, SpreadsheetColumn>(
	[
		[
			"name",
			{ property: "name", type: EdmType.String, label: "sheet.solutionName" },
		],
		[
			"description",
			{
				property: "description",
				type: EdmType.String,
				label: "sheet.solutionDescr",
			},
		],
		[
			"platform/name",
			{
				property: "platform/name",
				type: EdmType.String,
				label: "sheet.solutionPlatform",
			},
		],
		[
			"packageNamespace",
			{
				property: "packageNamespace",
				type: EdmType.String,
				label: "sheet.solutionPackage",
			},
		],
		[
			"repository",
			{
				property: "repository",
				type: EdmType.String,
				label: "sheet.solutionRepo",
			},
		],
		[
			"documentationUrl",
			{
				property: "documentationUrl",
				type: EdmType.String,
				label: "sheet.solutionDocs",
			},
		],
		[
			"businessCriticality/code",
			{
				property: "businessCriticality/code",
				type: EdmType.String,
				label: "sheet.solutionCriticality",
			},
		],
		[
			"riskLevel/code",
			{
				property: "riskLevel/code",
				type: EdmType.String,
				label: "sheet.riskLevel",
			},
		],
		[
			"cleanCoreRating_code",
			{
				property: "cleanCoreRating_code",
				type: EdmType.String,
				label: "sheet.solutionCleanCore",
			},
		],
		[
			"codeQualityRating_code",
			{
				property: "codeQualityRating_code",
				type: EdmType.String,
				label: "sheet.solutionCodeQuality",
			},
		],
		[
			"solutionStatus/descr",
			{
				property: "solutionStatus/descr",
				type: EdmType.String,
				label: "sheet.solutionStatus",
			},
		],
		[
			"reasonNoCleanCore",
			{
				property: "reasonNoCleanCore",
				type: EdmType.String,
				label: "sheet.solutionNoReason",
			},
		],
		[
			"costCenter",
			{
				property: "costCenter",
				type: EdmType.String,
				label: "sheet.solutionCostCenter",
			},
		],
		[
			"owner/fullName",
			{
				property: "owner/fullName",
				type: EdmType.String,
				label: "sheet.solutionOwner",
			},
		],
		[
			"team/teamName",
			{
				property: "team/teamName",
				type: EdmType.String,
				label: "sheet.solutionTeamName",
			},
		],
	],
);

export const DefaultVersionsTableConfig = {
	selectedItems: [],
	items: [
		{
			path: "version",
			key: "column.versionVersion",
			label: "column.versionVersion",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "status_code",
			key: "column.versionStatus",
			label: "column.versionStatus",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "releaseDate",
			key: "column.versionReleaseDate",
			label: "column.versionReleaseDate",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "modifiedBy",
			key: "column.versionLastModifiedBy",
			label: "column.versionLastModifiedBy",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "modifiedAt",
			key: "column.versionLastModified",
			label: "column.versionLastModified",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "createdBy",
			key: "column.versionCreatedBy",
			label: "column.versionCreatedBy",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "createdAt",
			key: "column.versionCreatedOn",
			label: "column.versionCreatedOn",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "ID",
			key: "column.versionID",
			label: "column.versionID",
			selected: false,
			sortable: true,
			groupable: true,
		},
	],
};

export const DefaultTechnologiesTableConfig = {
	selectedItems: [],
	items: [
		{
			path: "technology/name",
			key: "column.technoName",
			label: "column.technoName",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "technology/description",
			key: "column.technoDescr",
			label: "column.technoDescr",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "technology/createdAt",
			key: "column.technoCreatedOn",
			label: "column.technoCreatedOn",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "technology/createdBy",
			key: "column.technoCreatedBy",
			label: "column.technoCreatedBy",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "technology/lastModifiedBy",
			key: "column.technoLastModifiedBy",
			label: "column.technoLastModifiedBy",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "technology/lastModified",
			key: "column.technoLastModified",
			label: "column.technoLastModified",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "technology/ID",
			key: "column.technoID",
			label: "column.technoID",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "version",
			key: "column.technoVersion",
			label: "column.technoVersion",
			selected: true,
			sortable: true,
			groupable: true,
		},
	],
};

export const DefaultDependentSolutionTableConfig = {
	selectedItems: [],
	items: [
		{
			path: "dependentSoftwareSolution/name",
			key: "column.dependentName",
			label: "column.dependentName",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "dependentSoftwareSolution/description",
			key: "column.dependentDescr",
			label: "column.dependentDescr",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "softwareType_code",
			key: "column.dependentSoftwareType",
			label: "column.dependentSoftwareType",
			selected: true,
			sortable: true,
			groupable: true,
		},
		{
			path: "ID",
			key: "column.dependentID",
			label: "column.dependentID",
			selected: false,
			sortable: true,
			groupable: true,
		},
		{
			path: "up__ID",
			key: "column.dependentUp_ID",
			label: "column.dependentUp_ID",
			selected: false,
			sortable: true,
			groupable: true,
		},
	],
};

export const DefaultTableSearchColumns = {
	versionsTable: ["version", "status/descr"],
	activeTechnologiesTable: [
		"technology/name",
		"technology/description",
		"version",
	],
	technologiesTable: ["technology/name", "technology/description", "version"],
	dependentSolutionsTable: ["up_/name", "up_/description", "softwareType_code"],
};
