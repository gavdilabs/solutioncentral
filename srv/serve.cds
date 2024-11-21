using { com.gavdilabs.techtransmgt as data } from '../db/data';
service Service { 
  entity User as projection on data.User;
  entity SoftwareSolution as projection on data.SoftwareSolution;
  entity SoftwareTeam as projection on data.SoftwareTeam;
  entity SoftwareTeamUser as projection on data.SoftwareTeamUser;
  entity SoftwareDependency as projection on data.SoftwareDependency;
  entity Technology as projection on data.Technology;
  entity TechnologyReplacement as projection on data.TechnologyReplacement;
}
