using {
  cuid,
  managed,
  sap
} from '@sap/cds/common';

namespace com.gavdilabs.techtransmgt.core;

// Types
type softwareStatus         : String enum {
  Development;
  Testing;
  Released;
  Archived
}

type softwareDependencyType : String enum {
  Consuming;
  Embedding;
  Associating
}

type technologyType         : String enum {
  ABAP;
  ABAP_Cloud;
  CAP
}

type criticalityLevel       : String enum {
  Very_High;
  High;
  Medium;
  Low
}

type technologyStatus       : String enum {
  Stopping;
  Reducing;
  Using;
  Adopting;
  Observing
}

type deploymentTypes        : String enum {
  OnPremise;
  Cloud
}

// CodeLists
entity SAPVersion : sap.common.CodeList {
  key code                : String(12);
      deployment          : deploymentTypes;
      @Core.Computed name : String = concat(
        deployment, ` - `, code
      );
}

entity CleanCoreLevel : sap.common.CodeList {
  key code  : Integer @assert.range: [
        1,
        5
      ];
      descr : String;
}

entity CodeQualityLevel : sap.common.CodeList {
  key code  : Integer @assert.range: [
        1,
        5
      ];
      descr : String;
}

entity BusinessCriticalityLevel : sap.common.CodeList {
  key code  : criticalityLevel;
      descr : String;
}

// Entities
entity User {
  key username  : String;
      firstName : String;
      lastName  : String;
      email     : String;
      imageUrl  : String  @Core.IsURL  @Core.MediaType: imageType;
      imageType : String  @Core.IsMediaType;
}

@cds.search: {name}
entity SoftwareSolution : cuid, managed {
  name                : String;
  description         : String;
  solutionStatus      : softwareStatus;
  technologyType      : technologyType;
  packageNamespace    : String;
  repository          : String;
  documentationUrl    : String;
  sapVersion          : Association to SAPVersion;
  businessCriticality : Association to BusinessCriticalityLevel;
  cleanCoreRating     : Association to CleanCoreLevel;
  codeQualityRating   : Association to CodeQualityLevel;
  reasonNoCleanCore   : String;
  costCenter          : String;
  owner               : Association to User;
  team                : Association to SoftwareTeam;
  // Needs Required Services from Cloud Credit Control
  _technologies       : Association to many SoftwareTechnology
                          on _technologies.software = $self;
}

@cds.search: {teamName}
entity SoftwareTeam {
  key teamName   : String;
      _teamUsers : Association to many SoftwareTeamUser
                     on _teamUsers.team = $self;
}

entity SoftwareTeamUser {
  key team : Association to SoftwareTeam;
  key user : Association to User;
}

entity SoftwareDependency {
  key source       : UUID;
  key target       : UUID;
      softwareType : softwareDependencyType;
}

entity SoftwareTechnology {
  key software   : Association to SoftwareSolution;
  key technology : Association to Technology;
}

@cds.search: {name}
entity Technology : cuid {
  name           : String;
  description    : String;
  maturityStatus : technologyStatus;
  maturityLevel  : Integer @assert.range: [
    1,
    5
  ];
  _replacements  : Association to many TechnologyReplacement
                     on _replacements.source = ID;
  _solutions     : Association to many SoftwareTechnology
                     on _solutions.technology = $self;
}

entity TechnologyReplacement {
  key source      : UUID;
  key target      : UUID;
      _technology : Association to Technology
                      on _technology.ID = source;
}

entity CompanyConfiguration : cuid {
  currentSAPVersion                  : Association to SAPVersion;
  expectedMinimalCleanCoreValue      : Association to CleanCoreLevel;
  approvalForNewSolutions            : Boolean;
  allowDeprecationWithoutReplacement : Boolean;
}
