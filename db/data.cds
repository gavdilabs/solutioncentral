using {
  cuid,
  managed
} from '@sap/cds/common';

namespace com.gavdilabs.techtransmgt;

type softwareStatus         : String enum { Development; Testing; Released; Archived }
type softwareDependencyType : String enum { Consuming; Embedding; Associating }
type technologyType         : String enum { ABAP; ABAP_Cloud; CAP }
type criticalityLevel       : String enum { Very_High; High; Medium; Low }
type technologyStatus       : String enum { Stopping; Reducing; Using; Adopting; Observing }

/* 
Clean Core
1. On-Stack - Modification, Enhancement, Interaction with Un-Released Objects
2. On-Stack - S/4HANA Ready, Secure, No Modifications, Enhancements or interactions with Un-Released Objects
3. Tier-2 Extension - Encapsulating S/4HANA Functionality, ABAP Cloud Ready
4. Fully Tier-1, but depending on Custom Fields/On-Stack Extensions
5. Only White-Listed APIs, Side-By-Side Extensions, Works on Full Standard

Code Quality
1. Documented, Business Tested and Executes
2. Seperation of Concerns, Maintainable and Readable
3. DbC, Logs and Exception Handling
4. Includes Unit Tests that cover Critical Areas
5. Includes Automated Testing and good Coverage of Unit Tests (>80%)

Business Criticality
> Very High - Critical Business Operations will stop within hours
> High - Critical Business Operations will stop within days
> Medium - Critical Business Operations will be affected to some degree
> Low - Non-Critical Business Operations will be affected to some degree
*/

entity User {
    key userName        : String;
    firstName           : String;
    lastName            : String;
    email               : String;
}

entity SoftwareSolution : cuid, managed {
    name                : String;
    description         : String;
    solutionStatus      : softwareStatus;
    technologyType      : technologyType;
    packageMamespace    : String;   
    repository          : String;
    sapVersion          : String; // Should perhaps be a CodeList?
    documentationUrl    : String;
    businessCriticality : criticalityLevel;
    cleanCoreRating     : Integer @assert.range: [ 1, 5 ];
    codeQualityRating   : Integer @assert.range: [ 1, 5 ];
    reasonNoCleanCore   : String;
    costCenter          : String;
    owner               : Association to User;
    team                : Association to SoftwareTeam;
    // Needs Required Services from Cloud Credit Control
    _technologies       : Association to many SoftwareTechnology on _technologies.software = $self;
}

entity SoftwareTeam {
    key teamName        : String;
    _teamUsers          : Association to many SoftwareTeamUser on _teamUsers.team = $self;
}

entity SoftwareTeamUser {
    key team            : Association to SoftwareTeam;
    key user            : Association to User;
}

entity SoftwareDependency {
    key source          : UUID;
    key target          : UUID;
    softwareType        : softwareDependencyType;
}

entity SoftwareTechnology {
    key software        : Association to SoftwareSolution;
    key technology      : Association to Technology;
}

entity Technology : cuid {
    name                : String;
    maturityStatus      : technologyStatus;
    maturityLevel       : Integer @assert.range: [ 1, 5 ];
    _replacements       : Association to many TechnologyReplacement on _replacements.source = ID;
    _solutions          : Association to many SoftwareTechnology on _solutions.technology = $self;
}

entity TechnologyReplacement {
    key source          : UUID;
    key target          : UUID;
    _technology         : Association to Technology on _technology.ID = source;
}