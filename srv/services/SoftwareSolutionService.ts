import { SoftwareSolution, SoftwareStatus } from "#cds-models/RadarService";
import {
  ActionRequest,
  Inject,
  ServiceLogic,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SoftwareSolutionRepo from "../repositories/SoftwareSolutionRepo";
import { DefaultSoftwareStatus } from "../lib/utils/defaults";

@ServiceLogic()
export default class SoftwareSolutionService {
  private readonly logger: Logger;

  @Inject(SoftwareSolutionRepo)
  private readonly softwareSolutionRepo: SoftwareSolutionRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("soft-solution-srv");
  }

  public async handleApprovalLogic(
    req: ActionRequest<typeof SoftwareSolution.actions.approve>,
  ): Promise<void> {
    const solution = await this.checkApprovalFlowEntity(req);
    if (!solution || !solution.ID) {
      return;
    }

    try {
      await this.softwareSolutionRepo.updateStatus(
        solution.ID,
        DefaultSoftwareStatus.APPROVED,
      );
    } catch (e) {
      this.logger.error(
        "Database query failed, could not update status",
        solution.ID,
      );
      this.logger.error(e);
      req.error(500, "Service failed to update solution status in database");
      return;
    }
  }

  public async handleRejectLogic(
    req: ActionRequest<typeof SoftwareSolution.actions.reject>,
  ): Promise<void> {
    const solution = await this.checkApprovalFlowEntity(req);
    if (!solution || !solution.ID) {
      return;
    }

    try {
      await this.softwareSolutionRepo.updateStatus(
        solution.ID,
        DefaultSoftwareStatus.REJECTED,
      );
    } catch (e) {
      this.logger.error(
        "Database query failed, could not update status",
        solution.ID,
      );
      this.logger.error(e);
      req.error(500, "Service failed to update solution status in database");
      return;
    }
  }

  private async checkApprovalFlowEntity(
    req: ActionRequest<
      | typeof SoftwareSolution.actions.approve
      | typeof SoftwareSolution.actions.reject
    >,
  ): Promise<SoftwareSolution | undefined> {
    const solutionID =
      typeof req.params[0] === "string"
        ? req.params[0]
        : (req.params[0] as Record<string, string>)?.ID;
    if (!solutionID) {
      req.error(400, "Invalid solution ID");
      return;
    }

    const solution = await this.softwareSolutionRepo.byKey(solutionID, [
      "ID",
      "solutionStatus_code",
    ]);
    if (
      !solution ||
      solution.solutionStatus_code !== DefaultSoftwareStatus.AWAITING_APPROVAL
    ) {
      req.error(404, "No solution found awaiting approval");
      return;
    }

    return solution;
  }
}
