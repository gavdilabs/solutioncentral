import {
  dependentSolution,
  newSolution,
  reviewSolution,
  sunsetSolution,
  upgradeSolution,
} from "#cds-models/RadarService";
import { ServiceLogic } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds, { Service } from "@sap/cds";
import {
  BPABotExecutionRequest,
  BPATriggerEntity,
  DefinedBPATriggerName,
} from "../lib/bpa/utils";
import {
  executeBpaApiTrigger,
  fetchAvailableBpaApiTriggers,
} from "../lib/bpa/client";

@ServiceLogic()
export default class BPAService {
  private readonly SERVICE_KEY = "bpa";
  private readonly logger: Logger;

  private connection: Service;
  private triggerMap: Map<string, BPATriggerEntity>;

  constructor() {
    this.logger = LoggerFactory.createLogger("bpa-srv");
    this.triggerMap = new Map();
  }

  public async startNewSolutionProcess(data: newSolution): Promise<void> {
    await this.startProcess("onNewSoftwareSolution", data);
  }

  public async startReviewSolutionProcess(data: reviewSolution): Promise<void> {
    await this.startProcess("onReviewSoftwareSolution", data);
  }

  public async startSunsetSolutionProcess(data: sunsetSolution): Promise<void> {
    await this.startProcess("onSoftwareSolutionSunset", data);
  }

  public async startUpgradeSolutionProcess(
    data: upgradeSolution,
  ): Promise<void> {
    await this.startProcess("onUpgradeSoftwareSolution", data);
  }

  public async startDependentSolutionProcess(
    data: dependentSolution,
  ): Promise<void> {
    await this.startProcess("onDependentSoftwareSolution", data);
  }

  private async startProcess<T extends object>(
    triggerName: DefinedBPATriggerName,
    data: T,
  ): Promise<void> {
    const body: BPABotExecutionRequest<T> = {
      input: data,
    };

    if (this.triggerMap.size <= 0) {
      await this.buildTriggerMap();
    }

    const trigger = this.triggerMap.get(triggerName);
    if (!trigger) {
      throw new Error("Failed to find the API trigger in the BPA registry");
    }

    const connection = await this.getConnection();
    await executeBpaApiTrigger<T>(trigger.uid, body, connection).catch((e) => {
      this.logger.error("Failed to trigger the process in BPA", e);
      throw new Error(`Failed to trigger process in BPA for ${triggerName}`);
    });
  }

  /**
   * Clears the existing BPA Trigger map and rebuilds it with information found on BPA.
   */
  private async buildTriggerMap(): Promise<void> {
    this.triggerMap.clear(); // For safety!

    const connection = await this.getConnection();
    const res = await fetchAvailableBpaApiTriggers(connection).catch((e) => {
      this.logger.error("Request to BPA failed with error", e);
      throw new Error("Failed to handle request to external BPA service");
    });

    if (!res || res.length <= 0) {
      this.logger.error(
        "Invalid list of API triggers retrieved from BPA",
        res?.length,
      );
      throw new Error(
        "Failed to retrieve API triggers from BPA registry. Please confirm configuration",
      );
    }

    this.triggerMap = new Map(res.map((el) => [el.name, el]));
  }

  /**
   * Utility for safely getting a live connection to the external service
   */
  private async getConnection(): Promise<Service> {
    if (!this.connection) {
      this.connection = await cds.connect.to(this.SERVICE_KEY);
    }

    return this.connection;
  }
}
