import { SolutionReview, SolutionVersion } from "#cds-models/RadarService";
import {
  Request,
  ActionRequest,
  Inject,
  ServiceLogic,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SolutionVersionRepo from "../repositories/SoftwareVersionRepo";
import {
  DefaultApprovalFlows,
  DefaultSoftwareStatus,
} from "../lib/utils/defaults";
import CompanyConfigurationRepo from "../repositories/CompanyConfigurationRepo";
import SolutionReviewRepo from "../repositories/SolutionReviewRepo";

@ServiceLogic()
export default class SolutionVersionService {
  private readonly logger: Logger;

  @Inject(SolutionVersionRepo)
  private readonly solutionVersionRepo: SolutionVersionRepo;

  @Inject(SolutionReviewRepo)
  private readonly solutionReviewRepo: SolutionReviewRepo;

  @Inject(CompanyConfigurationRepo)
  private readonly companyConfigRepo: CompanyConfigurationRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-version-service");
  }

  public async handleVirtualProperties(
    req: Request<SolutionVersion | SolutionVersion[]>,
    result: SolutionVersion[],
  ): Promise<SolutionVersion[]> {
    const companyConfig = await this.companyConfigRepo.getConfiguration();
    if (
      !companyConfig ||
      companyConfig.approvalFlow_code === DefaultApprovalFlows.NO_APPROVAL
    ) {
      return result;
    }

    const isApprover = req.user.is("Approver") || req.user.is("Admin");
    result.forEach((el) => {
      el.isApprover = isApprover;
    });
    return result;
  }

  public async handleDefaults(
    req: Request<SolutionVersion>,
  ): Promise<Request<SolutionVersion>> {
    const companyConfig = await this.companyConfigRepo.getConfiguration();
    if (
      !companyConfig ||
      companyConfig.approvalFlow_code === DefaultApprovalFlows.NO_APPROVAL
    ) {
      req.data.status_code = DefaultSoftwareStatus.DEVELOP;
      return req;
    }

    req.data.status_code = DefaultSoftwareStatus.AWAITING_APPROVAL;
    return req;
  }

  public async handleApprovalFlow(
    req: ActionRequest<typeof SolutionVersion.actions.approveVersion>,
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
    req: ActionRequest<typeof SolutionVersion.actions.rejectVersion>,
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
      | typeof SolutionVersion.actions.approveVersion
      | typeof SolutionVersion.actions.rejectVersion
    >,
  ): Promise<SolutionVersion | undefined> {
    const keys = req.params[0] as Record<string, string>;
    const solutionVersionID = keys.ID;
    if (!solutionVersionID) {
      req.error(400, "Invalid solution version ID");
      return;
    }

    const solutionID = keys.solution_ID;
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
      solutionVersion.status_code !== DefaultSoftwareStatus.AWAITING_APPROVAL
    ) {
      req.error(404, "No solution version found awaiting approval");
      return;
    }

    return solutionVersion;
  }

  public async handleSubmitReviewLogic(
    req: ActionRequest<typeof SolutionVersion.actions.submitReview>,
  ): Promise<void> {
    const keys = req.params[0] as Record<string, string>;
    const solutionVersion_ID = keys?.ID;
    const solution_ID = keys?.solution_ID;

    const versionReviewData: SolutionReview = {
      solutionVersion_ID: solutionVersion_ID,
      solutionVersion_solution_ID: solution_ID,
      cleanCoreRating_code: req.data.cleanCore || 0,
      codeQualityRating_code: req.data.codeQuality || 0,
      reasonNoCleanCore: req.data.reasonNotCleanCore || undefined,
    };

    return await this.solutionReviewRepo.createReview(versionReviewData);
  }
}
