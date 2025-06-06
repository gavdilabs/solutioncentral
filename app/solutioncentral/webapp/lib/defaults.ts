export const DefaultSolutionTableConfig = {
	items: [
		{ path: "name", key: "colSolutionName", label: 'Solution Name', selected: true, sortable: true, groupable: true },
		{ path: "platform/name", key: "colPlatformName", label: 'Platform', selected: true, sortable: true, groupable: true },
		{ path: "cleanCoreRating_code", key: "colCleanCore", label: 'Clean Core Level', selected: true, sortable: true, groupable: true },
		{ path: "codeQualityRating_code", key: "colCodeQuality", label: 'Code Quality', selected: true, sortable: true, groupable: true },
		{ path: "solutionStatus_code", key: "colStatus", label: 'Status', selected: true, sortable: true, groupable: true },
		{ path: "costCenter", key: "colCostCenter", label: 'Cost Center', selected: true, sortable: true, groupable: true },
		{ path: "businessCriticality/code", key: "colBusinessCriticality", label: 'Business Criticality', selected: true, sortable: true, groupable: true },
		{ path: "description", key: "colSolutionDesc", label: 'Description', selected: false, sortable: true, groupable: true },
		{ path: "createdAt", key: "colCreatedOn", label: 'Created On', selected: false, sortable: true, groupable: true },
		{ path: "createdBy", key: "colCreatedBy", label: 'Created By', selected: false, sortable: true, groupable: true },
		{ path: "modifiedAt", key: "colLastModified", label: 'Last Modified On', selected: false, sortable: true, groupable: true },
		{ path: "modifiedBy", key: "colLastModifiedBy", label: 'Last Modified By', selected: false, sortable: true, groupable: true },
		{ path: "packageNamespace", key: "colPackageNamespace", label: 'Package Namespace', selected: false, sortable: true, groupable: true },
		{ path: "repository", key: "colRepository", label: 'Repository', selected: false, sortable: true, groupable: true },
		{ path: "team/teamName", key: "colTeamName", label: 'Team Name', selected: false, sortable: true, groupable: true },
		{ path: "owner/fullName", key: "colOwnerName", label: 'Owner', selected: false, sortable: true, groupable: true },
	]
}
