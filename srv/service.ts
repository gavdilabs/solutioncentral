import { CDSDispatcher } from "@dxfrontier/cds-ts-dispatcher";
import FunctionImportHandler from "./api/functions";
import ActionImportHandler from "./api/actions";
import BusinessCriticalityLevelHandler from "./api/entities/BusinessCriticalityLevelHandler";
import CleanCoreLevelHandler from "./api/entities/CleanCoreLevelHandler";
import CodeQualityLevelHandler from "./api/entities/CodeQualityLevelHandler";
import CompanyConfigurationHandler from "./api/entities/CompanyConfigurationHandler";
import SAPVersionHandler from "./api/entities/SAPVersionHandler";
import SoftwareSolutionHandler from "./api/entities/SoftwareSolutionHandler";
import SoftwareTeamHandler from "./api/entities/SoftwareTeamHandler";
import SoftwareTeamUserHandler from "./api/entities/SoftwareTeamUserHandler";
import TechnologyHandler from "./api/entities/TechnologyHandler";
import TechnologyReplacementHandler from "./api/entities/TechnologyReplacementHandler";
import UserHandler from "./api/entities/UserHandler";
import EventHandler from "./api/events";
import SolutionVersionHandler from "./api/entities/SolutionVersionHandler";
import SolutionHybridHandler from "./api/entities/SolutionHybridHandler";

export default new CDSDispatcher([
  // Entities
  BusinessCriticalityLevelHandler,
  CleanCoreLevelHandler,
  CodeQualityLevelHandler,
  CompanyConfigurationHandler,
  SAPVersionHandler,
  SoftwareSolutionHandler,
  SoftwareTeamHandler,
  SoftwareTeamUserHandler,
  SolutionVersionHandler,
  TechnologyHandler,
  TechnologyReplacementHandler,
  UserHandler,
  SolutionHybridHandler,
  // Actions / Functions
  ActionImportHandler,
  FunctionImportHandler,
  EventHandler,
]).initialize();
