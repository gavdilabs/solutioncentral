/**
 * URI endpoint for the BPA Trigger
 */
export const API_TRIGGER_ENDPOINT = "/apiTriggers";

/**
 * Entity definition for the Trigger entity provided by BPA.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/schema
 */
export interface BPATriggerEntity {
  uid: string;
  name: string;
  description: string;
  jobPriority: string;
  environmentUid: string;
  bot: BPABotEntity;
}

/**
 * Entity definition for the Bot entity provided by BPA.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/schema
 */
export interface BPABotEntity {
  type: "SCENARIO" | "PROCESS";
  name: string;
  description: string;
  version: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
}

/**
 * Entity definition for the Job entity provided by BPA.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/schema
 */
export interface BPAJobEntity {
  jobUid: string;
  invocationTime: string;
  lastUpdate: string;
  status: "ready" | "started" | "failed" | "success" | "canceled" | "expired";
  triggerUid: string;
}

/**
 * Entity definition for the Job creation response object used by BPA.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/schema
 */
export interface BPAJobCreationResponse {
  jobUid: string;
}

/**
 * Entity definition for the Bot Execution Request.
 * The generic type can be the object you wish to use as input for the given bot.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/schema
 */
export interface BPABotExecutionRequest<T extends object> {
  invocationContext?: Record<string, any>;
  input: T;
  apiKey?: string;
}

/**
 * Given trigger names configured for our BPA project (Solution Catalog)
 */
export type DefinedBPATriggerName =
  | "onNewSoftwareSolution"
  | "onReviewSoftwareSolution"
  | "onSoftwareSolutionSunset"
  | "onUpgradeSoftwareSolution"
  | "onNewSolutionVersion";
