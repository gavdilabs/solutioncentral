using {
  cuid,
  managed,
  sap
} from '@sap/cds/common';

namespace com.gavdilabs.techtransmgt;

type softwareStatus         : String enum { Development; Testing; Released; Archived }
type softwareDependencyType : String enum { Consuming; Embedding; Associating }
type technologyType         : String enum { ABAP; ABAP_Cloud; CAP }
type criticalityLevel       : String enum { Very_High; High; Medium; Low }
type technologyStatus       : String enum { Stopping; Reducing; Using; Adopting; Observing }
type deploymentTypes        : String enum { OnPremise; Cloud }
entity SAPVersion : sap.common.CodeList {
  code : String(12);
  deployment : deploymentTypes;
  descr : String;
}

entity CleanCoreLevel : sap.common.CodeList {
  code : Integer @assert.range: [ 1, 5 ];
  descr : String;
}

entity CodeQualityLevel : sap.common.CodeList {
  code : Integer @assert.range: [ 1, 5 ];
  descr : String;
}

entity BusinessCriticalityLevel : sap.common.CodeList {
  code : criticalityLevel;
  descr : String;
}

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
    sapVersion          : Association to SAPVersion;
    documentationUrl    : String;
    businessCriticality : Association to BusinessCriticalityLevel;
    cleanCoreRating     : Association to CleanCoreLevel;
    codeQualityRating   : Association to CodeQualityLevel;
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