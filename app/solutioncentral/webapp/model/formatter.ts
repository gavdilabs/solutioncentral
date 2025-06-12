import { IndicationColor, ValueState } from "sap/ui/core/library";

export default {
	formatValue: (value: string) => {
		return value?.toUpperCase();
	},

	formatSoftwareStatus: (value: number): ValueState => {
		switch (Number(value)) {
			case 0:
				return ValueState.None;
			case 1:
				return ValueState.Error;
			case 2:
				return ValueState.Warning;
			case 3:
				return ValueState.Success;
			case 4:
				return ValueState.Warning;
			case 5:
				return ValueState.Information;
			default:
				return ValueState.None;
		}
	},

	formatSoftwareStatusIcon: (value: number): string => {
		switch (Number(value)) {
			case 0:
				return "sap-icon://bo-strategy-management";
			case 1:
				return "sap-icon://error";
			case 2:
				return "sap-icon://add-equipment";
			case 3:
				return "sap-icon://sys-enter-2";
			case 4:
				return "sap-icon://alert";
			case 5:
				return "sap-icon://information";
			default:
				return "";
		}
	},

	formatBusinessCriticalityLevelState: (value: string): IndicationColor => {
		switch (value) {
			case "Very_High":
				return IndicationColor.Indication01;
			case "High":
				return IndicationColor.Indication02;
			case "Medium":
				return IndicationColor.Indication03;
			case "Low":
				return IndicationColor.Indication04;
			default:
				return IndicationColor.Indication09;
		}
	},

	formatBusinessCriticalityLevelIcon: (value: string): string => {
		switch (value) {
			case "Very_High":
				return "sap-icon://high-priority";
			case "High":
				return "sap-icon://quality-issue";
			case "Medium":
				return "sap-icon://message-warning";
			case "Low":
				return "sap-icon://message-success";
			default:
				return "sap-icon://status-inactive";
		}
	},

	formatBusinessCriticalityLevelText: (value: string): string => {
		switch (value) {
			case "Very_High":
				return "Very High";
			case "High":
				return "High";
			case "Medium":
				return "Medium";
			case "Low":
				return "Low";
			default:
				return "N/A";
		}
	},
};
