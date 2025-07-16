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
  key code             : Integer @assert.range: [
        0,
        6
      ];
      descr            : String;
      criticalityLevel : Integer @assert.range: [
        0,
        5
      ];
}

entity ApprovalFlow : sap.common.CodeList {
  key code : Integer @assert.range: [
        1,
        3
      ];
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
entity User : managed {
  key username      : String;
      email         : String  @mandatory;
      firstName     : String;
      lastName      : String;
      fullName      : String = concat(
        firstName, ` `, lastName
      )                       @Core.Computed;
      imageUrl      : String  @Core.IsURL  @Core.MediaType: imageType;
      imageType     : String  @Core.IsMediaType;
      approver      : Boolean; // In the future this should be fetched from BTP in a smart way
      softwareTeams : Composition of many SoftwareTeamUser
                        on softwareTeams.user = $self;
}

entity SolutionVersion : cuid, managed {
  key solution     : Association to SoftwareSolution;
      status       : Association to SoftwareStatus  @mandatory  @assert.target;
      version      : String(100) @mandatory;
      releaseNotes : LargeString;
      releaseDate  : Date default null;
      sapVersion   : Association to SAPVersion;
      technologies : Association to many SoftwareTechnology
                       on technologies.softwareVersion = $self;
      reviews      : Association to many SolutionReview
                       on reviews.solutionVersion = $self;
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
  businessCriticality : Association to BusinessCriticalityLevel;
  cleanCoreRating     : Association to CleanCoreLevel;
  codeQualityRating   : Association to CodeQualityLevel;
  versions            : Association to many SolutionVersion
                          on versions.solution = $self;
  reasonNoCleanCore   : String;
  costCenter          : String;
  owner               : Association to User          @mandatory  @assert.target;
  team                : Association to SoftwareTeam  @mandatory  @assert.target  @title: 'TESTING TITLE';
  Dependents          : Composition of many {
                          key ID                        : UUID;
                              dependentSoftwareSolution : Association to SoftwareSolution @mandatory;
                              softwareType              : Association to DependencyType   @mandatory;
                        };
}

entity SolutionReview : cuid, managed {
  reasonNoCleanCore : String;
  cleanCoreRating   : Association to CleanCoreLevel;
  codeQualityRating : Association to CodeQualityLevel;
  solutionVersion   : Association to SolutionVersion;
}

@cds.search: {teamName}
entity SoftwareTeam : managed {
  key teamName     : String;
      _owner       : Association to User  @mandatory  @assert.target;
      _maintainers : Association to many SoftwareTeamUser
                       on  _maintainers.maintainer = true
                       and _maintainers.team       = $self;
      _reviewers   : Association to many SoftwareTeamUser
                       on  _reviewers.team     = $self
                       and _reviewers.reviewer = true;
      _teamUsers   : Association to many SoftwareTeamUser
                       on _teamUsers.team = $self;
}

entity SoftwareTeamUser {
  key team       : Association to SoftwareTeam @assert.target;
  key user       : Association to User         @asser.target;
      reviewer   : Boolean default false;
      maintainer : Boolean default false;
}

entity SoftwareTechnology : cuid, managed {
  version         : String(255);
  softwareVersion : Association to SolutionVersion;
  technology      : Association to Technology;
}

@cds.search: {name}
entity Technology : cuid, managed {
  name           : String;
  description    : String;
  maturityStatus : Association to TechnologyStatus @assert.target;
  maturityLevel  : Integer                         @assert.range: [
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

entity CompanyConfiguration : cuid, managed {
  currentSAPVersion                  : Association to SAPVersion;
  expectedMinimalCleanCoreValue      : Association to CleanCoreLevel;
  approvalFlow                       : Association to ApprovalFlow;
  allowDeprecationWithoutReplacement : Boolean;
  bpaEnabled                         : Boolean;
}
