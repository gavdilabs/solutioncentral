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
    action requestTechnology(technologyID : String);
    action requestReview(description : String);
    action requestSunset(description : String);
    action requestDependent(dependentID : String, softwareType : String);
  }

  entity SolutionVersion          as projection on core.SolutionVersion;

  @cds.redirection.target
  entity Requests                 as projection on core.Request;

  extend Requests with actions {
    action approve();
    action reject();
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
  entity CodeQualityLevel         as projection on core.CodeQualityLevel;

  @readonly
  entity BusinessCriticalityLevel as projection on core.BusinessCriticalityLevel;

  @readonly
  entity DependencyTypes          as projection on core.DependencyType;

  entity SoftwareTechnology       as projection on core.SoftwareTechnology;
  /*** FUNCTION IMPORTS ***/
  function getActiveUser() returns types.ActiveUser;

  /*** VIEWS ***/
  view UserRequests as
    select from core.Request {
      key ID,
          requestType,
          requester,
          status,
          correlationID,
          description,
          data
    }
    where
         approverUser.username                   = $user.id
      or approverTeam._reviewers.user.username   = $user.id
      or approverTeam._maintainers.user.username = $user.id;

}

