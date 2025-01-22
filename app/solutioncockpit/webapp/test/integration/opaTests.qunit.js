sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/gavdilabs/solutioncockpit/test/integration/FirstJourney',
		'com/gavdilabs/solutioncockpit/test/integration/pages/SoftwareSolutionList',
		'com/gavdilabs/solutioncockpit/test/integration/pages/SoftwareSolutionObjectPage'
    ],
    function(JourneyRunner, opaJourney, SoftwareSolutionList, SoftwareSolutionObjectPage) {
        'use strict';
        JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/gavdilabs/solutioncockpit') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSoftwareSolutionList: SoftwareSolutionList,
					onTheSoftwareSolutionObjectPage: SoftwareSolutionObjectPage
                }
            },
            opaJourney.run
        );
    }
);