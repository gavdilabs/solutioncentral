export default {
	name: "QUnit test suite for the UI5 Application: com.gavdilabs.techtransmgt.solutioncentral",
	defaults: {
		page: "ui5://test-resources/com/gavdilabs/techtransmgt/solutioncentral/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "com/gavdilabs/techtransmgt/solutioncentral/",
			never: "test-resources/com/gavdilabs/techtransmgt/solutioncentral/"
		},
		loader: {
			paths: {
				"com/gavdilabs/techtransmgt/solutioncentral": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.gavdilabs.techtransmgt.solutioncentral"
		},
		"integration/opaTests": {
			title: "Integration tests for com.gavdilabs.techtransmgt.solutioncentral"
		}
	}
};
