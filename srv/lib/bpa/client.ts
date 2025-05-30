import { Service } from "@sap/cds";
import {
  API_TRIGGER_ENDPOINT,
  BPABotExecutionRequest,
  BPAJobCreationResponse,
  BPATriggerEntity,
} from "./utils";

/**
 * Util wrapper function for fetching list of available BPA API triggers.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/path/get-runtime-v1-apiTriggers
 */
export async function fetchAvailableBpaApiTriggers(
  connection: Service,
): Promise<BPATriggerEntity[] | undefined> {
  const res: BPATriggerEntity[] = await connection.get(API_TRIGGER_ENDPOINT);
  return res;
}

/**
 * Util wrapper function for fetching an individual BPA API trigger.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/path/get-apiTriggers-triggerUid
 */
export async function fetchBpaApiTriggerByKey(
  key: string,
  connection: Service,
): Promise<BPATriggerEntity | undefined> {
  const res: BPATriggerEntity = await connection.get(
    `${API_TRIGGER_ENDPOINT}/${key}`,
  );
  return res;
}

/**
 * Util wrapper function for starting an execution of a BPA API trigger.
 * More info: https://api.sap.com/api/SPA_Automation_Execution/path/post-apiTriggers-triggerUid-runs
 */
export async function executeBpaApiTrigger<T extends object>(
  triggerKey: string,
  input: BPABotExecutionRequest<T>,
  connection: Service,
): Promise<BPAJobCreationResponse | undefined> {
  const res: BPAJobCreationResponse = await connection.post(
    `${API_TRIGGER_ENDPOINT}/${triggerKey}/runs`,
    input,
  );
  return res;
}
