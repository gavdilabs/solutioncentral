
export interface SolutionTableConfig {
	search?: string;
	filters: SoftwareSolutionFilters;
}

export interface SoftwareSolutionFilters {
	platforms?: string[];
	businessCriticalityLevels?: string[];
	cleanCoreLevels?: string[]
	codeQualityLevels?: string[];
	costCenter?: string;
	statusses?: string[];
}

export interface SolutionCatalogueTableEntry {
	ID?: string;
	IsActiveEntity?: boolean;
	name?: string;
	platform?: {
		name?: string;
	};
	solutionStatus?: {
		code?: string;
		descr?: string;
	};
}

export interface SettingsDialogItem {
	key: string;
	text: string;
	selected?: boolean;
}
