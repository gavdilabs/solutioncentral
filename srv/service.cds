using {
  com.gavdilabs.techtransmgt.core,
  com.gavdilabs.techtransmgt.types
} from '../db';

@requires: 'authenticated-user'
service RadarService {

  /*** ENTITIES ***/
  entity User                     as projection on core.User;
  entity SoftwareSolution         as projection on core.SoftwareSolution;
  entity SoftwareTeam             as projection on core.SoftwareTeam;
  entity SoftwareTeamUser         as projection on core.SoftwareTeamUser;
  entity SoftwareDependency       as projection on core.SoftwareDependency;
  entity Technology               as projection on core.Technology;
  entity TechnologyReplacement    as projection on core.TechnologyReplacement;
  entity CompanyConfiguration     as projection on core.CompanyConfiguration;

  @readonly
  entity SAPVersion               as projection on core.SAPVersion;

  @readonly
  entity CleanCoreLevel           as projection on core.CleanCoreLevel;

  @readonly
  entity CodeQualityLevel         as projection on core.CodeQualityLevel;

  @readonly
  entity BusinessCriticalityLevel as projection on core.BusinessCriticalityLevel;

  /*** FUNCTION IMPORTS ***/
  function getActiveUser() returns types.ActiveUser;

}
