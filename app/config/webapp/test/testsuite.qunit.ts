export default {
	name: "QUnit test suite for the UI5 Application: com.gavdilabs.config",
	defaults: {
		page: "ui5://test-resources/com/gavdilabs/config/Test.qunit.html?testsuite={suite}&test={name}",
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
			only: "com/gavdilabs/config/",
			never: "test-resources/com/gavdilabs/config/"
		},
		loader: {
			paths: {
				"com/gavdilabs/config": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.gavdilabs.config"
		},
		"integration/opaTests": {
			title: "Integration tests for com.gavdilabs.config"
		}
	}
};
