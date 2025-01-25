using {
  com.gavdilabs.techtransmgt.core,
  com.gavdilabs.techtransmgt.types
} from '../db';

@requires: 'authenticated-user'
service RadarService {

  /*** ENTITIES ***/
  entity User @(restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.User;

  entity SoftwareSolution @(
    odata.draft.enabled,
    restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.SoftwareSolution;

  entity SoftwareTeam @(restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.SoftwareTeam;

  entity SoftwareTeamUser @(restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.SoftwareTeamUser;

  entity SoftwareDependency @(restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.SoftwareDependency;

  entity Technology @(restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.Technology;

  entity TechnologyReplacement @(restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.TechnologyReplacement;

  entity CompanyConfiguration @(restrict: [
    {
      grant: ['READ'],
      to   : ['View']
    },
    {
      grant: [
        'READ',
        'UPDATE',
        'CREATE'
      ],
      to   : ['Maintainer']
    },
    {
      grant: ['*'],
      to   : ['Admin']
    }
  ])  as projection on core.CompanyConfiguration;

  @readonly
  entity TechnologyStatus as projection on core.TechnologyStatus;
  
  @readonly
  entity SAPVersion @(restrict: [{
    grant: ['READ'],
    to   : [
      'View',
      'Maintainer',
      'Admin'
    ]
  }]) as projection on core.SAPVersion;

  @readonly
  entity CleanCoreLevel @(restrict: [{
    grant: ['READ'],
    to   : [
      'View',
      'Maintainer',
      'Admin'
    ]
  }]) as projection on core.CleanCoreLevel;

  @readonly
  entity CodeQualityLevel @(restrict: [{
    grant: ['READ'],
    to   : [
      'View',
      'Maintainer',
      'Admin'
    ]
  }]) as projection on core.CodeQualityLevel;

  @readonly
  entity BusinessCriticalityLevel @(restrict: [{
    grant: ['READ'],
    to   : [
      'View',
      'Maintainer',
      'Admin'
    ]
  }]) as projection on core.BusinessCriticalityLevel;

  entity SoftwareTechnology as projection on core.SoftwareTechnology;

  /*** FUNCTION IMPORTS ***/
  function getActiveUser() returns types.ActiveUser;

  annotate getActiveUser with @restrict: [{to: [
    'View',
    'Maintainer',
    'Admin'
  ]}];

}
