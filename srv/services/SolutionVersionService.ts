import { SolutionVersion } from "#cds-models/RadarService";
import {
  ActionRequest,
  Inject,
  ServiceLogic,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SolutionVersionRepo from "../repositories/SoftwareVersionRepo";
import { DefaultSoftwareStatus } from "../lib/utils/defaults";

@ServiceLogic()
export default class SolutionVersionService {
  private readonly logger: Logger;

  @Inject(SolutionVersionRepo)
  private readonly solutionVersionRepo: SolutionVersionRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-version-service");
  }

  public handleDefaults(data: SolutionVersion): SolutionVersion {
    data.status_code = DefaultSoftwareStatus.AWAITING_APPROVAL;
    return data;
  }

  public async handleApprovalFlow(
    req: ActionRequest<typeof SolutionVersion.actions.approve>,
  ): Promise<void> {
    const solutionVersion = await this.checkApprovalFlowEntity(req);
    if (
      !solutionVersion ||
      !solutionVersion.ID ||
      !solutionVersion.solution_ID
    ) {
      return;
    }

    try {
      await this.solutionVersionRepo.updateStatus(
        solutionVersion.ID,
        solutionVersion.solution_ID,
        DefaultSoftwareStatus.APPROVED,
      );
    } catch (e) {
      this.logger.error(
        "Database query failed, could not update status",
        solutionVersion.ID,
      );
      this.logger.error(e);
      req.error(
        500,
        "Service failed to update solution version status in database",
      );
      return;
    }
  }

  public async handleRejectFlow(
    req: ActionRequest<typeof SolutionVersion.actions.reject>,
  ): Promise<void> {
    const solutionVersion = await this.checkApprovalFlowEntity(req);
    if (
      !solutionVersion ||
      !solutionVersion.ID ||
      !solutionVersion.solution_ID
    ) {
      return;
    }

    try {
      await this.solutionVersionRepo.updateStatus(
        solutionVersion.ID,
        solutionVersion.solution_ID,
        DefaultSoftwareStatus.REJECTED,
      );
    } catch (e) {
      this.logger.error(
        "Database query failed, could not update status",
        solutionVersion.ID,
      );
      this.logger.error(e);
      req.error(
        500,
        "Service failed to update solution version status in database",
      );
      return;
    }
  }

  private async checkApprovalFlowEntity(
    req: ActionRequest<
      | typeof SolutionVersion.actions.approve
      | typeof SolutionVersion.actions.reject
    >,
  ): Promise<SolutionVersion | undefined> {
    const solutionVersionID = req.params[0];
    if (!solutionVersionID || typeof solutionVersionID !== "string") {
      req.error(400, "Invalid solution version ID");
      return;
    }

    const solutionID = req.params[1];
    if (!solutionID || typeof solutionID !== "string") {
      req.error(400, "Invalid solution ID");
      return;
    }

    const solutionVersion = await this.solutionVersionRepo.byKey(
      solutionVersionID,
      solutionID,
      ["ID", "solution_ID", "status_code"],
    );
    if (
      !solutionVersion ||
      !solutionVersion.status_code ||
      solutionVersion.status_code !== DefaultSoftwareStatus.AWAITING_APPROVAL
    ) {
      req.error(404, "No solution version found awaiting approval");
      return;
    }

    return solutionVersion;
  }
}
