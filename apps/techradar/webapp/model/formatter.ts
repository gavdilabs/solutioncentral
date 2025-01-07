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
				return 'Information';
			case '5':
				return 'None';
			default:
				return 'Warning';	
		}
	},
};
