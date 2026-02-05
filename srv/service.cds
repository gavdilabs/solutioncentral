using {
  com.gavdilabs.techtransmgt.core,
  com.gavdilabs.techtransmgt.types
} from '../db';

@requires: 'authenticated-user'
service RadarService {

  /*** ENTITIES ***/
  entity User                     as projection on core.User;
  entity SoftwareSolution         as projection on core.SoftwareSolution;
  entity SolutionHybrid           as projection on core.SolutionHybrid;
  entity SolutionTags             as projection on core.SolutionTags;

  annotate SoftwareSolution with @odata.draft.enabled;

  extend SoftwareSolution with actions {
    action requestReview(description: String);
    action requestSunset(description: String, sunsetDate: DateTime);
    action approveSolution();
    action rejectSolution();
    action submitReview(codeQuality: Integer, cleanCore: Integer, reasonNotCleanCore: String);
  }

  extend projection SoftwareSolution with {
    virtual null as isApprover : Boolean,
    activeVersion              : Association to ActiveSolutionVersion
                                   on activeVersion.solution = $self,
  }

  entity SolutionVersion          as projection on core.SolutionVersion;
  entity SolutionReview           as projection on core.SolutionReview;
  entity SolutionBusinessCase     as projection on core.SolutionBusinessCase;

  extend projection SolutionVersion with {
    virtual null as isApprover : Boolean,
    latestReview               : Association to LatestVersionReview
                                   on latestReview.solutionVersion = $self
  }

  extend SolutionVersion with actions {
    action approveVersion();
    action rejectVersion();
    action submitReview(codeQuality: Integer, cleanCore: Integer, reasonNotCleanCore: String);
  }

  entity SoftwareTeam             as projection on core.SoftwareTeam;

  extend SoftwareTeam with actions {
    action requestAccess(username: String);
    action addMember(username: String);
    action removeMember(username: String);
  }

  entity SoftwareTeamUser         as projection on core.SoftwareTeamUser;
  entity Technology               as projection on core.Technology;

  extend Technology with actions {
    action requestSunset(description: String);
    action requestChange(description: String);
  }

  entity TechnologyReplacement    as projection on core.TechnologyReplacement;

  @odata.singleton.nullable
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
  entity BusinessCaseRating       as projection on core.BusinessCaseRating;

  @readonly
  entity DependencyTypes          as projection on core.DependencyType;

  @readonly
  entity SoftwareStatus           as projection on core.SoftwareStatus;

  entity SoftwareTechnology       as projection on core.SoftwareTechnology;

  entity Tags                     as projection on core.Tag;

  /*** FUNCTION IMPORTS ***/
  function getActiveUser() returns types.ActiveUser;

  view ActiveSolutionVersion as
    select from SolutionVersion as version
    where
          version.status.code =      5
      and version.releaseDate is not null
      and version.releaseDate =      (
        select max(sv.releaseDate) from SolutionVersion as sv
        inner join SoftwareStatus as status
          on sv.status = status
        where
              sv.solution.ID =      version.solution.ID
          and status.code    =      5
          and sv.releaseDate is not null
      );

  view LatestVersionReview as
    select from SolutionReview as review
    where
          createdAt is not null
      and createdAt =      (
        select max(createdAt) from SolutionReview as sv
        where
              review.solutionVersion.ID          = sv.solutionVersion.ID
          and review.solutionVersion.solution.ID = sv.solutionVersion.solution.ID
      );

}
