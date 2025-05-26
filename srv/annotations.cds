using { RadarService } from './service';


//Annotation for chart enablement
annotate RadarService.SoftwareSolution with @Aggregation.ApplySupported: {
  Transformations       : [
    'aggregate',
    'groupby',
    'identity',
    'filter'
  ],
  GroupableProperties   : [
    platform_code,
    solutionStatus_code
  ],
  AggregatableProperties: [
    {Property: cleanCoreRating_code},
    {Property: codeQualityRating_code}
  ]
};

