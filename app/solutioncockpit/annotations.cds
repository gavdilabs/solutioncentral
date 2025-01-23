using RadarService as service from '../../srv/service';

/** Defining Data Points */
annotate service.SoftwareSolution with @(
    odata.draft.enabled,
    UI.DataPoint #cleanCoreRatingIndicator  : {
        Value        : cleanCoreRating_code,
        TargetValue  : 5,
        Visualization: #Rating,
        ![@Common.QuickInfo] : cleanCoreRating.descr,
    },
    UI.DataPoint #codeQualityRatingIndicator: {
        Value        : codeQualityRating_code,
        TargetValue  : 5,
        Visualization: #Rating,
        ![@Common.QuickInfo] : codeQualityRating.descr,
    },
    UI.DataPoint #statusInfo                : {
        $Type: 'UI.DataPointType',
        Title: '{i18n>SolutionStatus}',
        Value: solutionStatus_code,
        Criticality : solutionStatus_code,
        ![@Common.QuickInfo] : solutionStatus.descr,
    },
    UI.DataPoint #technologyTypeInfo        : {
        $Type: 'UI.DataPointType',
        Title: '{i18n>TechnologyType}',
        Value: technologyType,
    },
);

/** Object Page Header Section*/
annotate service.SoftwareSolution with @(
    UI.HeaderInfo  : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Solution', //TODO: replace with i18n
        TypeNamePlural: 'Solutions', //TODO: replace with i18n
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
            Target: '@UI.DataPoint#technologyTypeInfo',
        },
    ],
);

/** Object Page Group Sections */
annotate service.SoftwareSolution with @(
    UI.FieldGroup #TechnicalInfoGroup     : {
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
                Url: repository
            },
            {
                $Type: 'UI.DataFieldWithUrl',
                Label: '{i18n>DocumentationUrl}',
                Value: documentationUrl,
                Url: documentationUrl
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>SAPVersion}',
                Value: sapVersion_code,
            },
        ],
    },
    UI.FieldGroup #OwnerInfoGroup         : {
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
                Value: owner_username, //TODO: Combine firstName and lastName instead
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Team}',
                Value: team_teamName,
            },
        ]
    },
    UI.FieldGroup #RatingInfoGroup        : {
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
    UI.FieldGroup #DependentSolutionsGroup: {
        $Type: 'UI.FieldGroupType',
        Data : []
    },
    UI.FieldGroup #RequiredServicesGroup  : {
        $Type: 'UI.FieldGroupType',
        Data : []
    },
    UI.FieldGroup #TechnologiesGroup      : {
        $Type: 'UI.FieldGroupType',
        Data : []
    },
    UI.FieldGroup #OwnerFullNameGroup     : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: owner.firstName,
            },
            {
                $Type: 'UI.DataField',
                Value: owner.lastName,
            },
        ]
    },
    UI.Facets                             : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'TechnicalInfoFacet',
            Label : 'Technical Information',
            Target: '@UI.FieldGroup#TechnicalInfoGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'OwnerFacet',
            Label : 'Owner',
            Target: '@UI.FieldGroup#OwnerInfoGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'RatingFacet',
            Label : 'Rating',
            Target: '@UI.FieldGroup#RatingInfoGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'DependentSolutionsFacet',
            Label : 'Dependent Solutions',
            Target: '@UI.FieldGroup#DependentSolutionsGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'RequiredServicesFacet',
            Label : 'Required Services',
            Target: '@UI.FieldGroup#RequiredServicesGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'TechnologiesFacet',
            Label : 'Technologies',
            Target: '@UI.FieldGroup#TechnologiesGroup',
        },

    ],
);

/** List Report Table */
annotate service.SoftwareSolution with @(
    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Label: '{i18n>SolutionName}',
            Value: name,
            ![@UI.Importance] : #High,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>SolutionDescription}',
            Value: description,
            ![@UI.Importance] : #Medium,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>TechnologyType}',
            Value: technologyType,
            ![@UI.Importance] : #High,
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
            $Type : 'UI.DataFieldForAnnotation',
            Label : '{i18n>Owner}',
            Target: '@UI.FieldGroup#OwnerFullNameGroup',
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>SolutionStatus}',
            Value: solutionStatus_code,
            Criticality : solutionStatus_code,
            CriticalityRepresentation : #WithoutIcon,
            ![@UI.Importance] : #High,
        },


    ],
    UI.SelectionFields: [technologyType, ],
);

/** Individual field controls */
annotate service.SoftwareSolution with {
    name                @title           : '{i18n>SolutionName}'         @(
        UI.HiddenFilter,
        );
    technologyType      @title           : '{i18n>TechnologyType}';
    solutionStatus      @(
        title           : '{i18n>SolutionStatus}',
        Common.Text : {
            $value : solutionStatus.name,
            ![@UI.TextArrangement] : #TextOnly
        },
    );
    reasonNoCleanCore   @title           : '{i18n>NotCleanCoreReason}'   @UI.HiddenFilter        @UI.MultiLineText;
    description         @title           : '{i18n>SolutionDescription}'  @UI.HiddenFilter        @UI.MultiLineText;
    documentationUrl    @title           : '{i18n>DocumentationUrl}'     @UI.HiddenFilter;
    ID                  @UI.HiddenFilter;
    repository          @title           : '{i18n>RepositoryUrl}'        @UI.HiddenFilter;
    packageNamespace    @title           : '{i18n>PackageNamespace}'     @UI.HiddenFilter;
    sapVersion          @title           : '{i18n>SAPVersion}'           @(
        UI.HiddenFilter,
        Common.Text : {
            $value : sapVersion.descr,
            ![@UI.TextArrangement] : #TextFirst
        },
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'SAPVersion',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : sapVersion_code,
                    ValueListProperty : 'code',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'deployment',
                },
            ],
        },
        Common.ValueListWithFixedValues : false,
    );
    cleanCoreRating     @title           : '{i18n>CleanCoreRating}';
    codeQualityRating   @title           : '{i18n>CodeQualityRating}';
    businessCriticality @(
        title           : '{i18n>BusinessCriticality}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'BusinessCriticalityLevel',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : businessCriticality_code,
                    ValueListProperty : 'code',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                },
            ],
        },
    );
    costCenter          @title           : '{i18n>CostCenter}';
    owner               @title: '{i18n>Owner}'              @(
        UI.HiddenFilter,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'User',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : owner_username,
                    ValueListProperty : 'username',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'firstName',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'lastName',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'email',
                },
            ],
        },
        Common.ValueListWithFixedValues : false,
        );
    team                @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'SoftwareTeam',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterInOut',
            LocalDataProperty: team_teamName,
            ValueListProperty: 'teamName',
        }, ],
    }                                                                    @title: '{i18n>Team}'   @UI.HiddenFilter;
};
annotate service.BusinessCriticalityLevel with {
    code @Common.Text : descr
};

annotate service.SAPVersion with {
    code @Common.Text : descr
};

