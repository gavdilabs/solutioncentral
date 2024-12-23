export default {
	name: "QUnit test suite for the UI5 Application: com.gavdilabs.techradar",
	defaults: {
		page: "ui5://test-resources/com/gavdilabs/techradar/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2,
		},
		sinon: {
			version: 1,
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon",
		},
		coverage: {
			only: "com/gavdilabs/techradar/",
			never: "test-resources/com/gavdilabs/techradar/",
		},
		loader: {
			paths: {
				"com/gavdilabs/techradar": "../",
			},
		},
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.gavdilabs.techradar",
		},
		"integration/opaTests": {
			title: "Integration tests for com.gavdilabs.techradar",
		},
	},
};
