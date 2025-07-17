import {
  SoftwareSolution,
  SolutionReview,
  SolutionVersion,
} from "#cds-models/RadarService";
import {
  Request,
  ActionRequest,
  Inject,
  ServiceLogic,
  ActionReturn,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SoftwareSolutionRepo from "../repositories/SoftwareSolutionRepo";
import {
  DefaultApprovalFlows,
  DefaultSoftwareStatus,
} from "../lib/utils/defaults";
import CompanyConfigurationRepo from "../repositories/CompanyConfigurationRepo";
import SolutionVersionRepo from "../repositories/SoftwareVersionRepo";
import RequestsService from "./RequestsService";
import cds from "@sap/cds";
import SolutionReviewRepo from "../repositories/SolutionReviewRepo";

@ServiceLogic()
export default class SoftwareSolutionService {
  private readonly logger: Logger;

  @Inject(SoftwareSolutionRepo)
  private readonly softwareSolutionRepo: SoftwareSolutionRepo;

  @Inject(CompanyConfigurationRepo)
  private readonly companyConfigRepo: CompanyConfigurationRepo;

  @Inject(SolutionVersionRepo)
  private readonly solutionVersionRepo: SolutionVersionRepo;

  @Inject(SolutionReviewRepo)
  private readonly solutionReviewRepo: SolutionReviewRepo;

  @Inject(RequestsService)
  private readonly requestsService: RequestsService;

  constructor() {
    this.logger = LoggerFactory.createLogger("soft-solution-srv");
  }

  public async checkCompositedValues(
    req: Request<SoftwareSolution>,
  ): Promise<Request<SoftwareSolution>> {
    const companyConfig = await this.companyConfigRepo.getConfiguration();
    if (
      !companyConfig ||
      companyConfig.approvalFlow_code === DefaultApprovalFlows.NO_APPROVAL
    ) {
      return req;
    }

    if (!req.data.versions) {
      this.logger.debug("No versions found as input, skipping processing");
      return req;
    }

    if (!req.data.ID) {
      this.logger.warn("Cannot perform pre-processing, missing solution ID");
      return req;
    }

    // We need to verify the delta of the solution versions
    const versions = await this.solutionVersionRepo.getSolutionVersions(
      req.data.ID,
      ["ID", "solution_ID"],
    );
    const versionIDSet = new Set<string>(versions.map((el) => el.ID ?? ""));

    const mappedInputs = new Map<string, SolutionVersion>(
      req.data.versions.map((el) => [el.ID ?? "", el]),
    );
    const filteredInputs = req.data.versions.filter(
      (el) => !versionIDSet.has(el.ID ?? ""),
    );

    for (const el of filteredInputs) {
      el.status_code = DefaultSoftwareStatus.AWAITING_APPROVAL;
      mappedInputs.set(el.ID ?? "", el);

      cds.spawn({}, async () => {
        await this.requestsService.handleNewSolutionVersionRequest(
          req.data.ID ?? "",
          el.ID ?? "",
          el.version ?? "",
        );
      });
    }

    req.data.versions = Array.from(mappedInputs.values());
    return req;
  }

  public async checkApprovalFlow(
    req: Request<SoftwareSolution>,
  ): Promise<Request<SoftwareSolution>> {
    const companyConfiguration =
      await this.companyConfigRepo.getConfiguration();
    if (
      !companyConfiguration ||
      companyConfiguration.approvalFlow_code ===
        DefaultApprovalFlows.NO_APPROVAL
    ) {
      req.data.solutionStatus_code ??= DefaultSoftwareStatus.DEVELOP;
      return req;
    }

    req.data.solutionStatus_code = DefaultSoftwareStatus.AWAITING_APPROVAL;
    return req;
  }

  public async handleVirtualProperties(
    req: Request<SoftwareSolution>,
    result: SoftwareSolution[],
  ): Promise<SoftwareSolution[]> {
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

  public async handleApprovalLogic(
    req: ActionRequest<typeof SoftwareSolution.actions.approveSolution>,
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
    req: ActionRequest<typeof SoftwareSolution.actions.rejectSolution>,
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
      | typeof SoftwareSolution.actions.approveSolution
      | typeof SoftwareSolution.actions.rejectSolution
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

  public async handleSubmitReviewLogic(
    req: ActionRequest<typeof SoftwareSolution.actions.submitReview>,
  ): Promise<void> {
    const keys = req.params[0] as Record<string, string>;
    const solutionID = keys?.ID;

    const activeSolutionVersion =
      await this.solutionVersionRepo.getActiveSolutionVersion(solutionID);

    if (!activeSolutionVersion) {
      req.error(400, "Invalid request. No active version for solution");
      return;
    }

    const reviewData: SolutionReview = {
      solutionVersion_ID: activeSolutionVersion.ID,
      solutionVersion_solution_ID: solutionID,
      cleanCoreRating_code: req.data.cleanCore || 0,
      codeQualityRating_code: req.data.codeQuality || 0,
      reasonNoCleanCore: req.data.reasonNotCleanCore || undefined,
    };

    return await this.solutionReviewRepo.createReview(reviewData);
  }
}
