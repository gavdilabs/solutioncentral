import EventProvider from "sap/ui/base/EventProvider";

export interface SolutionTableConfig {
	search?: string;
	filters: SoftwareSolutionFilters;
}

export interface SoftwareSolutionFilters {
	platforms?: string[];
	businessCriticalityLevels?: string[];
	cleanCoreLevels?: string[];
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

export interface ViewSettingsDialogItem {
	key: string;
	path: string;
	label?: string;
	selected?: boolean;
	sortable?: boolean;
	groupable?: boolean;
}

export interface CustomControlType extends EventProvider {
	getId: () => string;
	setValueState: (state: string) => void;
}

export interface CompanyConfiguration {
	currentSAPVersion_code: number;
	currentSAPVersion: Record<string, unknown>;
	expectedMinimalCleanCoreValue_code: number;
	expectedMinimalCleanCoreValue: Record<string, unknown>;
	approvalFlow: Record<string, unknown>;
	approvalFlow_code: number;
	allowDeprecationWithoutReplacement: boolean;
	bpaEnabled: boolean;
}
