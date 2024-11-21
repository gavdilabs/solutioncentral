using { com.gavdilabs.techtransmgt as data } from '../db/data';
service Service { 
  entity User as projection on data.User;
  entity SoftwareSolution as projection on data.SoftwareSolution;
  entity SoftwareTeam as projection on data.SoftwareTeam;
  entity SoftwareTeamUser as projection on data.SoftwareTeamUser;
  entity SoftwareDependency as projection on data.SoftwareDependency;
  entity Technology as projection on data.Technology;
  entity TechnologyReplacement as projection on data.TechnologyReplacement;
  entity CompanyConfiguration as projection on data.CompanyConfiguration;
  @readonly entity SAPVersion as projection on data.SAPVersion;
  @readonly entity CleanCoreLevel as projection on data.CleanCoreLevel;
  @readonly entity CodeQualityLevel as projection on data.CodeQualityLevel;
  @readonly entity BusinessCriticalityLevel as projection on data.BusinessCriticalityLevel;
}
