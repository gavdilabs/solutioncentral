using {
  cuid,
  managed,
  sap
} from '@sap/cds/common';

namespace com.gavdilabs.techtransmgt.core;

// Types
type softwareDependencyType : String enum {
  Consuming;
  Embedding;
  Associating;
}

type platformType           : String enum {
  ABAP;
  ABAP_Cloud;
  CAP;
  OnPrem;
}

type criticalityLevel       : String enum {
  Very_High;
  High;
  Medium;
  Low
}

type deploymentTypes        : String enum {
  OnPremise;
  Cloud
}

// CodeLists
entity SoftwareStatus : sap.common.CodeList {
  key code  : Integer @assert.range: [
        1,
        5
      ];
      descr : String;
}

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

entity TechnologyStatus : sap.common.CodeList {
  key code  : Integer @assert.range: [
        1,
        5
      ];
      descr : String;
}

entity TechnologyGroup : sap.common.CodeList {
  key code  : Integer @assert.range: [
        1,
        10
      ];
      descr : String;
}

entity BusinessCriticalityLevel : sap.common.CodeList {
  key code  : criticalityLevel;
      descr : String;
}

entity Platform : sap.common.CodeList {
  key code  : platformType;
      descr : String;
}

entity DependencyType : sap.common.CodeList {
  key code : softwareDependencyType
}

// Entities
entity User {
  key username      : String;
      email         : String  @mandatory;
      firstName     : String;
      lastName      : String;
      fullName      : String = concat(
        firstName, ` `, lastName
      )                       @Core.Computed;
      imageUrl      : String  @Core.IsURL  @Core.MediaType: imageType;
      imageType     : String  @Core.IsMediaType;
      softwareTeams : Association to many SoftwareTeamUser
                        on softwareTeams.user = $self;
}

@cds.search: {name}
entity SoftwareSolution : cuid, managed {
  name                : String @mandatory;
  description         : String;
  solutionStatus      : Association to SoftwareStatus;
  platform            : Association to Platform;
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
  Technologies        : Composition of many SoftwareTechnology
                          on Technologies.software = $self;

  Dependents          : Composition of many {
                          key ID                        : UUID;
                              dependentSoftwareSolution : Association to SoftwareSolution @mandatory;
                              softwareType              : Association to DependencyType   @mandatory;
                        }
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

entity SoftwareTechnology : cuid {
  software   : Association to SoftwareSolution;
  technology : Association to Technology;
}

@cds.search: {name}
entity Technology : cuid {
  name           : String;
  description    : String;
  maturityStatus : Association to TechnologyStatus @assert.target;
  maturityLevel  : Integer @assert.range: [
    1,
    5
  ];
  group          : Association to TechnologyGroup;
  _replacements  : Association to many TechnologyReplacement
                     on _replacements.source = ID;
  Solutions      : Composition of many SoftwareTechnology
                     on Solutions.technology = $self;
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
