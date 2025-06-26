import Filter from "sap/ui/model/Filter";
import { SoftwareSolutionFilters } from "../types";
import FilterOperator from "sap/ui/model/FilterOperator";
import {
	SearchField$ChangeEvent,
	SearchField$LiveChangeEvent,
	SearchField$SearchEvent,
} from "sap/m/SearchField";
import Table from "sap/m/Table";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";

export class SoftwareSolutionFilterConstructor {
	public static constructFilter(
		filters: SoftwareSolutionFilters,
	): Filter | undefined {
		const result: Filter[] = [
			this.constructPlatformFilter(filters.platforms),
			this.constructStatusFilter(filters.statusses),
			this.constructCleanCoreFilter(filters.cleanCoreLevels),
			this.constructCodeQualityFilter(filters.codeQualityLevels),
			this.constructCostCenterFilter(filters.costCenter),
			this.constructBusinessCriticalityFilter(
				filters.businessCriticalityLevels,
			),
		].filter((el) => el);

		return result.length > 0
			? new Filter({
					filters: result,
					and: true,
				})
			: undefined;
	}

	public static constructPlatformFilter(
		platformKeys?: string[],
	): Filter | undefined {
		if (!platformKeys || platformKeys.length <= 0) return undefined;
		const platformFilters = platformKeys.map(
			(el) => new Filter("platform_code", FilterOperator.EQ, el),
		);

		return new Filter({
			filters: platformFilters,
			and: false,
		});
	}

	public static constructStatusFilter(
		statusKeys?: string[],
	): Filter | undefined {
		if (!statusKeys || statusKeys.length <= 0) return undefined;
		const statusFilters = statusKeys.map(
			(el) => new Filter("solutionStatus_code", FilterOperator.EQ, el),
		);

		return new Filter({
			filters: statusFilters,
			and: false,
		});
	}
	public static constructCostCenterFilter(
		costCenter?: string,
	): Filter | undefined {
		if (!costCenter) return undefined;
		return new Filter("costCenter", FilterOperator.Contains, costCenter);
	}

	public static constructCleanCoreFilter(
		cleanCoreKeys?: string[],
	): Filter | undefined {
		if (!cleanCoreKeys || cleanCoreKeys.length <= 0) return undefined;
		const coreLevelFilters = cleanCoreKeys.map(
			(el) => new Filter("cleanCoreRating_code", FilterOperator.EQ, el),
		);

		return new Filter({
			filters: coreLevelFilters,
			and: false,
		});
	}

	public static constructCodeQualityFilter(
		qualityKeys?: string[],
	): Filter | undefined {
		if (!qualityKeys || qualityKeys.length <= 0) return undefined;
		const qualityLevelFilters = qualityKeys.map(
			(el) => new Filter("codeQualityRating_code", FilterOperator.EQ, el),
		);

		return new Filter({
			filters: qualityLevelFilters,
			and: false,
		});
	}

	public static constructBusinessCriticalityFilter(
		criticalityKeys?: string[],
	): Filter | undefined {
		if (!criticalityKeys || criticalityKeys.length <= 0) return undefined;
		const criticalityFilters = criticalityKeys.map(
			(el) => new Filter("businessCriticality_code", FilterOperator.EQ, el),
		);

		return new Filter({
			filters: criticalityFilters,
			and: false,
		});
	}
}

export function searchTableColumns(
	event: SearchField$SearchEvent,
	table: Table,
	solution: {
		ID: string;
		path: string;
	},
	searchProps: string[],
): void {
	const params = event.getParameters() as Record<string, unknown>;
	const searchValue = params["query"] || undefined;
	const filters: Filter[] = [];
	const binding = table.getBinding("items") as ODataListBinding;

	if (!searchValue || searchValue === "") {
		const solutionFilter = new Filter(
			solution.path,
			FilterOperator.EQ,
			solution.ID,
		);
		binding.filter(solutionFilter); // none
		return;
	}

	searchProps.forEach((prop) => {
		filters.push(
			new Filter({
				path: prop,
				operator: FilterOperator.Contains,
				value1: searchValue,
				caseSensitive: false,
			}),
		);
	});

	const searchFilters = new Filter({
		filters: filters,
		and: false,
	});

	const solutionFilter = new Filter(
		solution.path,
		FilterOperator.EQ,
		solution.ID,
	);

	const finalFilter =
		!searchValue || searchValue === ""
			? solutionFilter
			: new Filter({ filters: [searchFilters, solutionFilter], and: true });

	binding.filter(finalFilter);
}
