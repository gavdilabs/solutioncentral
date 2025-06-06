import Filter from "sap/ui/model/Filter";
import { SoftwareSolutionFilters } from "../types";
import FilterOperator from "sap/ui/model/FilterOperator";

export class SoftwareSolutionFilterConstructor {
	public static constructFilter(filters: SoftwareSolutionFilters): Filter|undefined {
		const result: Filter[] = [
			this.constructPlatformFilter(filters.platforms),
			this.constructStatusFilter(filters.statusses),
			this.constructCleanCoreFilter(filters.cleanCoreLevels),
			this.constructCodeQualityFilter(filters.codeQualityLevels),
			this.constructCostCenterFilter(filters.costCenter),
			this.constructBusinessCriticalityFilter(filters.businessCriticalityLevels),
		].filter((el) => el);

		return result.length > 0 ? new Filter({
			filters: result,
			and: true,
		}) : undefined;
	}

	public static constructPlatformFilter (platformKeys?: string[]): Filter | undefined {
		if (!platformKeys || platformKeys.length <= 0) return undefined;
		const platformFilters = platformKeys.map((el) => new Filter(
			"platform_code",
			FilterOperator.EQ,
			el,
		));

		return new Filter({
			filters: platformFilters,
			and: false,
		});
	}

	public static constructStatusFilter (statusKeys?: string[]): Filter | undefined {
		if (!statusKeys || statusKeys.length <= 0) return undefined;
		const statusFilters = statusKeys.map((el) => new Filter(
			"solutionStatus_code",
			FilterOperator.EQ,
			el
		));

		return new Filter({
			filters: statusFilters,
			and: false,
		});
	}
	public static constructCostCenterFilter (costCenter?: string): Filter | undefined {
		if (!costCenter) return undefined;
		new Filter(
			"costCenter",
			FilterOperator.Contains,
			costCenter
		);
	}

	public static constructCleanCoreFilter (cleanCoreKeys?: string[]): Filter | undefined {
		if (!cleanCoreKeys || cleanCoreKeys.length <= 0) return undefined;
		const coreLevelFilters = cleanCoreKeys.map((el) => new Filter(
			"cleanCoreRating_code",
			FilterOperator.EQ,
			el
		));

		return new Filter({
			filters: coreLevelFilters,
			and: false,
		});
	}

	public static constructCodeQualityFilter (qualityKeys?: string[]): Filter | undefined {
		if (!qualityKeys || qualityKeys.length <= 0) return undefined
		const qualityLevelFilters = qualityKeys.map((el) => new Filter(
			"codeQualityRating_code",
			FilterOperator.EQ,
			el
		));

		return new Filter({
			filters: qualityLevelFilters,
			and: false,
		});
	}

	public static constructBusinessCriticalityFilter (criticalityKeys?: string[]): Filter | undefined {
		if (!criticalityKeys || criticalityKeys.length <= 0) return undefined
		const criticalityFilters = criticalityKeys.map((el) => new Filter(
			"businessCriticality_code",
			FilterOperator.EQ,
			el
		));

		return new Filter({
			filters: criticalityFilters,
			and: false,
		});
	}
}
