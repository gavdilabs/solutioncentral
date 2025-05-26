using {RadarService} from './service';

annotate RadarService.User with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Reviewer',
      'Developer',
      'Maintainer'
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
      'Developer'
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
      'Maintainer'
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
      'Maintainer'
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
      'Developer'
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
      'Reviewer'
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
      'Maintainer'
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
    'Admin'
  ]
}];

annotate RadarService.SAPVersion with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin'
  ]
}];

annotate RadarService.CleanCoreLevel with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin'
  ]
}];

annotate RadarService.CodeQualityLevel with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin'
  ]
}];

annotate RadarService.BusinessCriticalityLevel with @restrict: [{
  grant: ['READ'],
  to   : [
    'View',
    'Developer',
    'Reviewer',
    'Maintainer',
    'Admin'
  ]
}];

annotate RadarService.SoftwareTechnology with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Developer'
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
  'Admin'
]}];

annotate RadarService.Requests with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Reviewer',
      'Maintainer',
      'Developer'
    ]
  },
  {
    grant: ['CREATE'],
    to   : [
      'Reviewer',
      'Developer',
      'Maintainer'
    ]
  },
  {
    grant: [
      'approve',
      'reject'
    ],
    to   : [
      'Reviewer',
      'Maintainer'
    ],
    where: 'approverUser.username = $user.id or approverTeam._maintainers.user.username = $user.id '
  },
  {
    grant: [
      'approve',
      'reject'
    ],
    to   : [
      'Reviewer',
      'Maintainer'
    ],
    where: 'approverTeam._maintainers.user.username = $user.id'
  },
  {
    grant: [
      'approve',
      'reject'
    ],
    to   : [
      'Reviewer',
      'Maintainer'
    ],
    where: 'approverTeam._reviewers.user.username = $user.id'
  },
  {
    grant: ['*'],
    to   : ['Admin']
  }
];

annotate RadarService.SolutionVersion with @restrict: [
  {
    grant: ['READ'],
    to   : [
      'View',
      'Developer',
      'Reviewer',
      'Maintainer'
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
    grant: ['*'],
    to   : ['Admin']
  }
];
