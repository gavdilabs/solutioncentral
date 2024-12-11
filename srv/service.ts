import { CDSDispatcher } from "@dxfrontier/cds-ts-dispatcher";
import FunctionImportHandler from "./api/functions";
import ActionImportHandler from "./api/actions";
import BusinessCriticalityLevelHandler from "./api/entities/BusinessCriticalityLevelHandler";
import CleanCoreLevelHandler from "./api/entities/CleanCoreLevelHandler";
import CodeQualityLevelHandler from "./api/entities/CodeQualityLevelHandler";
import CompanyConfigurationHandler from "./api/entities/CompanyConfigurationHandler";
import SAPVersionHandler from "./api/entities/SAPVersionHandler";
import SoftwareDependencyHandler from "./api/entities/SoftwareDependencyHandler";
import SoftwareSolutionHandler from "./api/entities/SoftwareSolutionHandler";
import SoftwareTeamHandler from "./api/entities/SoftwareTeamHandler";
import SoftwareTeamUserHandler from "./api/entities/SoftwareTeamUserHandler";
import TechnologyHandler from "./api/entities/TechnologyHandler";
import TechnologyReplacementHandler from "./api/entities/TechnologyReplacementHandler";
import UserHandler from "./api/entities/UserHandler";

export default new CDSDispatcher([
  // Entities
  BusinessCriticalityLevelHandler,
  CleanCoreLevelHandler,
  CodeQualityLevelHandler,
  CompanyConfigurationHandler,
  SAPVersionHandler,
  SoftwareDependencyHandler,
  SoftwareSolutionHandler,
  SoftwareTeamHandler,
  SoftwareTeamUserHandler,
  TechnologyHandler,
  TechnologyReplacementHandler,
  UserHandler,
  // Actions / Functions
  ActionImportHandler,
  FunctionImportHandler,
]).initialize();
