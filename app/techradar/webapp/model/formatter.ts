export default {
	formatValue: (value: string) => {
		return value?.toUpperCase();
	},

	formatHighlight: (maturityStatus: string) => {
		switch (maturityStatus) {
			case '1':
				return 'Error';
			case '2':
				return 'Warning';
			case '3':
				return 'Success';
		 	case '4':
				return 'None';
			case '5':
				return 'Information';
			default:
				return 'Warning';
		}
	},

	formatSolutionVersionStatus: (value: number): number => {
		switch(Number(value)) {
			case 0:
				return 9;
			case 1:
				return 2;
			case 2:
				return 1;
			case 3:
				return 8;
			case 4:
				return 1;
			case 5:
				return 6;
			default:
				return 6;

		}
	}
};
