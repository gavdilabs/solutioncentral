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
    virtual null as isApprover : Boolean,
    activeVersion              : Association to ActiveSolutionVersion on activeVersion.solution = $self,
  }

  entity SolutionVersion          as projection on core.SolutionVersion;
  entity SolutionReview           as projection on core.SolutionReview;

  extend projection SolutionReview with {
    DATE(createdAt) as reviewDate : Date
  }

  extend projection SolutionVersion with {
    virtual null as isApprover : Boolean,
    latestReview               : Association to LatestSolutionReview on latestReview.solutionVersion = $self
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
  entity DependencyTypes          as projection on core.DependencyType;

  @readonly
  entity SoftwareStatus           as projection on core.SoftwareStatus;

  entity SoftwareTechnology       as projection on core.SoftwareTechnology;
  /*** FUNCTION IMPORTS ***/
  function getActiveUser() returns types.ActiveUser;

  /** VIEWS **/
  view ActiveSolutionVersion as
    select from SolutionVersion as version
    where
          version.status.code =      5
      and version.releaseDate is not null
      and version.releaseDate =      (
        select max(
          sv.releaseDate
        ) from SolutionVersion as sv
        inner join SoftwareStatus as status
          on sv.status = status
        where
              sv.solution.ID =      version.solution.ID
          and status.code    =      5
          and sv.releaseDate is not null
      );

  view LatestSolutionReview as
    select from SolutionReview as review
    where
          review.solutionVersion.status.code =      5
      and review.createdAt                   =      (
        select max(
          sr.createdAt
        ) from SolutionReview as sr
      )
      and review.solutionVersion.releaseDate is not null
      and review.solutionVersion.releaseDate =      (
        select max(
          sv.releaseDate
        ) from SolutionVersion as sv
        inner join SoftwareStatus as status
          on sv.status = status
        where
              sv.solution.ID =      review.solutionVersion.solution.ID
          and status.code    =      5
          and sv.releaseDate is not null
      );

}
