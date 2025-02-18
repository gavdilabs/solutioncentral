using RadarService as service from '../../srv/service';

/** Overall settings and annotations */
annotate service.SoftwareSolution with @(
    Capabilities.NavigationRestrictions                         : {
        $Type               : 'Capabilities.NavigationRestrictionsType',
        RestrictedProperties: [
            {
                $Type             : 'Capabilities.NavigationPropertyRestriction',
                NavigationProperty: DraftAdministrativeData,
                FilterRestrictions: {
                    $Type     : 'Capabilities.FilterRestrictionsType',
                    Filterable: false
                }
            },
            {
                NavigationProperty: Technologies,
                InsertRestrictions: {Insertable: true}
            }
        ]
    },
    //Chart Annotations for List Report page
    UI.Chart #alpChart                                          : {
        $Type          : 'UI.ChartDefinitionType',
        ChartType      : #ColumnDual,
        Dimensions     : [platform_code, ],
        DynamicMeasures: [
            '@Analytics.AggregatedProperty#cleanCoreRating_code_average',
            '@Analytics.AggregatedProperty#codeQualityRating_code_average'
        ],
        Title          : '{i18n>CleanCoreAndCodeQualityChart}',
    },
    Analytics.AggregatedProperty #codeQualityRating_code_average: {
        $Type               : 'Analytics.AggregatedPropertyType',
        Name                : 'codeQualityRating_code_average',
        AggregatableProperty: codeQualityRating_code,
        AggregationMethod   : 'average',
        ![@Common.Label]    : '{i18n>CodeQualityRating}',
    },
    Analytics.AggregatedProperty #cleanCoreRating_code_average  : {
        $Type               : 'Analytics.AggregatedPropertyType',
        Name                : 'cleanCoreRating_code_average',
        AggregatableProperty: cleanCoreRating_code,
        AggregationMethod   : 'average',
        ![@Common.Label]    : '{i18n>CleanCoreRating}',
    },
);


/** Defining Data Points */
annotate service.SoftwareSolution with @(
    UI.DataPoint #cleanCoreRatingIndicator  : {
        Value               : cleanCoreRating_code,
        TargetValue         : 5,
        Visualization       : #Rating,
        ![@Common.QuickInfo]: cleanCoreRating.descr,
    },
    UI.DataPoint #codeQualityRatingIndicator: {
        Value               : codeQualityRating_code,
        TargetValue         : 5,
        Visualization       : #Rating,
        ![@Common.QuickInfo]: codeQualityRating.descr,
    },
    UI.DataPoint #statusInfo                : {
        $Type               : 'UI.DataPointType',
        Title               : '{i18n>SolutionStatus}',
        Value               : solutionStatus_code,
        Criticality         : solutionStatus_code,
        ![@Common.QuickInfo]: solutionStatus.descr,
    },
    UI.DataPoint #platformInfo              : {
        $Type: 'UI.DataPointType',
        Title: '{i18n>Platform}',
        Value: platform_code,
    },
);

/** Object Page Header Section*/
annotate service.SoftwareSolution with @(
    UI.HeaderInfo  : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : '{i18n>Solution}',
        TypeNamePlural: '{i18n>Solutions}',
        Title         : {
            $Type: 'UI.DataField',
            Value: name,
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: description,
        }
    },
    UI.HeaderFacets: [
        {
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.DataPoint#statusInfo',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.DataPoint#platformInfo',
        },
    ],
);

/** Object Page Group Sections */
annotate service.SoftwareSolution with @(
    UI.FieldGroup #TechnicalInfoGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>PackageNamespace}',
                Value: packageNamespace,
            },
            {
                $Type: 'UI.DataFieldWithUrl',
                Label: '{i18n>RepositoryUrl}',
                Value: repository,
                Url  : repository
            },
            {
                $Type: 'UI.DataFieldWithUrl',
                Label: '{i18n>DocumentationUrl}',
                Value: documentationUrl,
                Url  : documentationUrl
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>SAPVersion}',
                Value: sapVersion_code,
            },
        ],
    },
    UI.FieldGroup #OwnerInfoGroup    : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>CostCenter}',
                Value: costCenter,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Owner}',
                Value: owner_username,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Team}',
                Value: team_teamName,
            },
        ]
    },
    UI.FieldGroup #RatingInfoGroup   : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>BusinessCriticality}',
                Value: businessCriticality_code,
            },
            {
                $Type : 'UI.DataFieldForAnnotation',
                Label : '{i18n>CleanCoreRating}',
                Target: '@UI.DataPoint#cleanCoreRatingIndicator',
            },
            {
                $Type : 'UI.DataFieldForAnnotation',
                Label : '{i18n>CodeQualityRating}',
                Target: '@UI.DataPoint#codeQualityRatingIndicator',
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>NotCleanCoreReason}',
                Value: reasonNoCleanCore,
            },
        ]
    },
    UI.Facets                        : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'TechnicalInfoFacet',
            Label : '{i18n>TechnicalInformation}',
            Target: '@UI.FieldGroup#TechnicalInfoGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'OwnerFacet',
            Label : '{i18n>Owner}',
            Target: '@UI.FieldGroup#OwnerInfoGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'RatingFacet',
            Label : '{i18n>Rating}',
            Target: '@UI.FieldGroup#RatingInfoGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Technologies}',
            ID    : 'Technologies',
            Target: 'Technologies/@UI.LineItem#Technologies',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>DependentSolutions}',
            ID    : 'DependentSolutions',
            Target: 'Dependents/@UI.LineItem#DependentSolutions',
        },
    ],
);

/** List Report Table */
annotate service.SoftwareSolution with @(
    UI.LineItem       : [
        {
            $Type            : 'UI.DataField',
            Label            : '{i18n>SolutionName}',
            Value            : name,
            ![@UI.Importance]: #High,
        },
        {
            $Type            : 'UI.DataField',
            Label            : '{i18n>SolutionDescription}',
            Value            : description,
            ![@UI.Importance]: #Medium,
        },
        {
            $Type            : 'UI.DataField',
            Label            : '{i18n>Platform}',
            Value            : platform_code,
            ![@UI.Importance]: #High,
        },
        {
            $Type            : 'UI.DataFieldForAnnotation',
            Label            : '{i18n>CleanCoreRating}',
            Target           : '@UI.DataPoint#cleanCoreRatingIndicator',
            ![@UI.Importance]: #High,
        },
        {
            $Type            : 'UI.DataFieldForAnnotation',
            Label            : '{i18n>CodeQualityRating}',
            Target           : '@UI.DataPoint#codeQualityRatingIndicator',
            ![@UI.Importance]: #High,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Owner}',
            Value: owner.fullName
        },
        {
            $Type                    : 'UI.DataField',
            Label                    : '{i18n>SolutionStatus}',
            Value                    : solutionStatus_code,
            Criticality              : solutionStatus_code,
            CriticalityRepresentation: #WithoutIcon,
            ![@UI.Importance]        : #High,
        },


    ],
    UI.SelectionFields: [platform_code, ],
);

/** Individual field controls */
annotate service.SoftwareSolution with {
    name                @title           : '{i18n>SolutionName}'         @(UI.HiddenFilter);
    platform            @(
        title                          : '{i18n>Platform}',
        Common.ValueListWithFixedValues: true,
        Common.Text                    : {
            $value                : platform.name,
            ![@UI.TextArrangement]: #TextOnly
        },
    );
    solutionStatus      @(
        title                          : '{i18n>SolutionStatus}',
        Common.Text                    : {
            $value                : solutionStatus.name,
            ![@UI.TextArrangement]: #TextOnly
        },
        Common.ValueListWithFixedValues: true,
    );
    reasonNoCleanCore   @title           : '{i18n>NotCleanCoreReason}'   @UI.HiddenFilter       @UI.MultiLineText;
    description         @title           : '{i18n>SolutionDescription}'  @UI.HiddenFilter       @UI.MultiLineText;
    documentationUrl    @title           : '{i18n>DocumentationUrl}'     @UI.HiddenFilter;
    ID                  @UI.HiddenFilter;
    repository          @title           : '{i18n>RepositoryUrl}'        @UI.HiddenFilter;
    packageNamespace    @title           : '{i18n>PackageNamespace}'     @UI.HiddenFilter;
    sapVersion          @title           : '{i18n>SAPVersion}'           @(
        UI.HiddenFilter,
        Common.Text                    : {
            $value                : sapVersion.descr,
            ![@UI.TextArrangement]: #TextFirst
        },
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'SAPVersion',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: sapVersion_code,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'descr',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'deployment',
                },
            ],
        },
        Common.ValueListWithFixedValues: false,
    );
    cleanCoreRating     @title           : '{i18n>CleanCoreRating}';
    codeQualityRating   @title           : '{i18n>CodeQualityRating}';
    businessCriticality @(
        title                          : '{i18n>BusinessCriticality}',
        Common.ValueListWithFixedValues: false,
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'BusinessCriticalityLevel',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: businessCriticality_code,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'name',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'descr',
                },
            ],
        },
        Common.Text                    : {
            $value                : businessCriticality.name,
            ![@UI.TextArrangement]: #TextOnly
        },
    );
    costCenter          @title           : '{i18n>CostCenter}';
    owner               @title           : '{i18n>Owner}'                @(
        UI.HiddenFilter,
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'User',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: owner_username,
                    ValueListProperty: 'username',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'firstName',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'lastName',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'email',
                },
            ],
        },
        Common.ValueListWithFixedValues: false,
        Common.Text                    : {
            $value                : owner.fullName,
            ![@UI.TextArrangement]: #TextOnly
        },
    );
    team                @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'SoftwareTeam',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterInOut',
            LocalDataProperty: team_teamName,
            ValueListProperty: 'teamName',
        }, ],
    }                                                                    @title: '{i18n>Team}'  @UI.HiddenFilter;
};

annotate service.BusinessCriticalityLevel with {
    code @Common.Text: name
};

annotate service.SAPVersion with {
    code @Common.Text: descr
};

/** Sub table Technologies */
annotate service.SoftwareTechnology with @(UI.LineItem #Technologies: [
    {
        $Type: 'UI.DataField',
        Value: technology_ID,
        Label: '{i18n>TechnologyName}',
    },
    {
        $Type                  : 'UI.DataField',
        Value                  : technology.description,
        Label                  : '{i18n>TechnologyDescription}',
        ![@Common.FieldControl]: #ReadOnly,
    },
]);

annotate service.SoftwareTechnology with {
    technology @(
        Common.Text                    : {
            $value                : technology.name,
            ![@UI.TextArrangement]: #TextOnly
        },
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Technology',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: technology_ID,
                    ValueListProperty: 'ID',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.Technology with {
    ID   @Common.Text: {
        $value                : name,
        ![@UI.TextArrangement]: #TextOnly
    };
    name @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Technology',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: name,
                    ValueListProperty: 'name',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Platform with {
    code @Common.Text: {
        $value                : name,
        ![@UI.TextArrangement]: #TextOnly
    }
};

annotate service.SoftwareStatus with {
    code @Common.Text: {
        $value                : name,
        ![@UI.TextArrangement]: #TextOnly
    }
};

/** Sub table Dependent Solutions */
annotate service.SoftwareSolution.Dependents with @(UI.LineItem #DependentSolutions: [
    {
        $Type: 'UI.DataField',
        Value: dependentSoftwareSolution_ID,
        Label: '{i18n>SolutionName}',
    },
    {
        $Type                  : 'UI.DataField',
        Value                  : dependentSoftwareSolution.description,
        Label                  : '{i18n>SolutionDescription}',
        ![@Common.FieldControl]: #ReadOnly,
    },
    {
        $Type: 'UI.DataField',
        Value: softwareType_code,
        Label: '{i18n>SoftwareType}',
    },
]);

annotate service.SoftwareSolution.Dependents with {
    dependentSoftwareSolution @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'SoftwareSolution',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: dependentSoftwareSolution_ID,
                    ValueListProperty: 'ID',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'name',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false,
        Common.Text                    : {
            $value                : dependentSoftwareSolution.name,
            ![@UI.TextArrangement]: #TextOnly
        }
    );
};

annotate service.SoftwareSolution.Dependents with {
    softwareType @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'DependencyType',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: softwareType_code,
                ValueListProperty: 'code',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};
