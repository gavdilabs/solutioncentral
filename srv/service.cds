using {
  com.gavdilabs.techtransmgt.core,
  com.gavdilabs.techtransmgt.types
} from '../db';

@requires: 'authenticated-user'
service RadarService {

  /*** ENTITIES ***/
  entity User                     as projection on core.User;
  entity SoftwareSolution         as projection on core.SoftwareSolution;
  annotate SoftwareSolution with @odata.draft.enabled;

  extend SoftwareSolution with actions {
    action requestReview(description : String);
    action requestSunset(description : String, sunsetDate : DateTime);
    action approveSolution();
    action rejectSolution();
  }

  extend projection SoftwareSolution with {
    virtual null as isApprover : Boolean
  }

  entity SolutionVersion          as projection on core.SolutionVersion;

  extend projection SolutionVersion with {
    virtual null as isApprover : Boolean
  }

  extend SolutionVersion with actions {
    action approveVersion();
    action rejectVersion();
  }

  entity SoftwareTeam             as projection on core.SoftwareTeam;

  extend SoftwareTeam with actions {
    action requestAccess(username : String);
    action addMember(username : String);
    action removeMember(username : String);
  }

  entity SoftwareTeamUser         as projection on core.SoftwareTeamUser;
  entity Technology               as projection on core.Technology;

  extend Technology with actions {
    action requestSunset(description : String);
    action requestChange(description : String);
  }

  entity TechnologyReplacement    as projection on core.TechnologyReplacement;
  entity CompanyConfiguration     as projection on core.CompanyConfiguration;

  @readonly
  entity TechnologyStatus         as projection on core.TechnologyStatus;

  @readonly
  entity SAPVersion               as projection on core.SAPVersion;

  @readonly
  entity CleanCoreLevel           as projection on core.CleanCoreLevel;

  @readonly
  entity ApprovalFlow             as projection on core.ApprovalFlow;

  @readonly
  entity CodeQualityLevel         as projection on core.CodeQualityLevel;

  @readonly
  entity BusinessCriticalityLevel as projection on core.BusinessCriticalityLevel;

  @readonly
  entity DependencyTypes          as projection on core.DependencyType;

  entity SoftwareTechnology       as projection on core.SoftwareTechnology;
  /*** FUNCTION IMPORTS ***/
  function getActiveUser() returns types.ActiveUser;

}
