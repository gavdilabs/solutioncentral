using {RadarService} from './service';

annotate RadarService.User with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Reviewer',
      'Developer',
      'Maintainer',
      'Approver'
    ]
  },
  {
    grant: ['*'],
    to   : ['Admin']
  }
];

annotate RadarService.SoftwareSolution with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Developer',
      'Approver'
    ]
  },
  {
    grant: [
      'requestSunset',
      'requestTechnology',
      'requestReview'
    ],
    to   : [
      'Developer',
      'Maintainer',
      'Reviewer'
    ],
    where: 'team._teamUsers.username = $user.id'
  },
  {
    grant: ['requestDependent'],
    to   : [
      'Developer',
      'Maintainer',
      'Reviewer'
    ]
  },
  {
    grant: [
      'READ',
      'UPDATE',
      'CREATE'
    ],
    to   : [
      'Maintainer',
      'Reviewer'
    ],
    where: 'team._reviewers.user.username = $user.id or team._maintainers.user.username = $user.id'
  },
  {
    grant: [
      'approve',
      'reject'
    ],
    to   : ['Approver'],
    where: 'solutionStatus_code = 0'
  },
  {
    grant: ['DELETE'],
    to   : ['Maintainer'],
    where: 'team._maintainers.user.username = $user.id'
  },
  {
    grant: ['*'],
    to   : ['Admin']
  }
];

annotate RadarService.SoftwareTeam with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Reviewer',
      'Developer',
      'Maintainer',
      'Approver'
    ]
  },
  {
    grant: ['requestAccess'],
    to   : [
      'Developer',
      'Maintainer',
      'Reviewer'
    ]
  },
  {
    grant: [
      'CREATE',
      'UPDATE',
      'addMember',
      'removeMember'
    ],
    to   : [
      'Developer',
      'Maintainer',
      'Reviewer'
    ],
    where: '_owner.username = $user.id'
  },
  {
    grant: ['*'],
    to   : ['Admin']
  }
];

annotate RadarService.SoftwareTeamUser with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Reviewer',
      'Developer',
      'Maintainer',
      'Approver'
    ]
  },
  {
    grant: [
      'CREATE',
      'UPDATE',
      'DELETE'
    ],
    to   : ['Maintainer'],
    where: 'team._maintainers.user.username = $user.id'
  },
  {
    grant: ['*'],
    to   : ['Admin']
  }
];

annotate RadarService.Technology with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Reviewer',
      'Developer',
      'Approver'
    ]
  },
  {
    grant: [
      'requestSunset',
      'requestChange'
    ],
    to   : [
      'Developer',
      'Maintainer',
      'Reviewer'
    ]
  },
  {
    grant: ['*'],
    to   : [
      'Admin',
      'Maintainer'
    ]
  }
];

annotate RadarService.TechnologyReplacement with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Developer',
      'Reviewer',
      'Approver'
    ]
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
];

annotate RadarService.CompanyConfiguration with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Reviewer',
      'Developer',
      'Maintainer',
      'Approver'
    ]
  },
  {
    grant: ['*'],
    to   : ['Admin']
  }
];

annotate RadarService.TechnologyStatus with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin',
    'Approver'
  ]
}];

annotate RadarService.SAPVersion with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin',
    'Approver'
  ]
}];

annotate RadarService.CleanCoreLevel with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin',
    'Approver'
  ]
}];

annotate RadarService.CodeQualityLevel with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin',
    'Approver'
  ]
}];

annotate RadarService.BusinessCriticalityLevel with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin',
    'Approver'
  ]
}];

annotate RadarService.SoftwareTechnology with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Developer',
      'Approver'
    ]
  },
  {
    grant: ['requestReview'],
    to   : [
      'Developer',
      'Reviewer',
      'Maintainer',
      'Admin'
    ]
  },
  {
    grant: ['requestTechnology'],
    to   : ['Developer'],
    where: 'software.team.user.username = $user.id'
  },
  {
    grant: [
      'READ',
      'CREATE',
      'UPDATE',
      'DELETE'
    ],
    to   : ['Reviewer']
  },
  {
    grant: ['*'],
    to   : [
      'Admin',
      'Maintainer'
    ]
  }
];

annotate RadarService.getActiveUser with @restrict: [{to: [
  'View',
  'Developer',
  'Reviewer',
  'Maintainer',
  'Admin',
  'Approver'
]}];

annotate RadarService.SolutionVersion with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Developer',
      'Reviewer',
      'Maintainer',
      'Approver'
    ]
  },
  {
    grant: [
      'CREATE',
      'UPDATE',
      'DELETE'
    ],
    to   : ['Maintainer']
  },
  {
    grant: [
      'approve',
      'reject'
    ],
    to   : ['Approver'],
    where: 'status_code = 0'
  },
  {
    grant: ['*'],
    to   : ['Admin']
  }
];

annotate RadarService.ActiveSolutionVersion with @(restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Approver',
    'Admin'
  ]
}]);

annotate RadarService.Tags with @(restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Developer',
      'Reviewer',
      'Maintainer',
      'Approver',
      'Admin'
    ]
  },
  {
    grant: [
      'CREATE',
      'UPDATE',
      'DELETE'
    ],
    to   : [
      'Maintainer',
      'Admin'
    ]
  }
]);
