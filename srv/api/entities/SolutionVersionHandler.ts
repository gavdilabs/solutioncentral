import { SolutionVersion } from "#cds-models/RadarService";
import type {
  ActionRequest,
  ActionReturn,
} from "@dxfrontier/cds-ts-dispatcher";
import {
  Request,
  AfterCreate,
  EntityHandler,
  Inject,
  OnBoundAction,
  Req,
  Result,
  BeforeCreate,
  AfterUpdate,
  AfterRead,
  AfterDelete,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SolutionVersionService from "../../services/SolutionVersionService";
import RequestsService from "../../services/RequestsService";
import SoftwareTechnologyService from "../../services/SoftwareTechnologyService";

@EntityHandler(SolutionVersion)
export default class SolutionVersionHandler {
  private readonly logger: Logger;

  @Inject(SolutionVersionService)
  private readonly solutionVersionService: SolutionVersionService;

  @Inject(RequestsService)
  private readonly requestsService: RequestsService;

  @Inject(SoftwareTechnologyService)
  private readonly softwareTechnologyService: SoftwareTechnologyService;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-version-handler");
  }

  @AfterRead()
  public async afterReadEntities(
    @Req() req: Request<SolutionVersion>,
    @Result() result: SolutionVersion[],
  ): Promise<unknown> {
    try {
      return await this.solutionVersionService.handleVirtualProperties(
        req,
        result,
      );
    } catch (e) {
      this.logger.error(
        "Unexpected error occured while post-processing read data",
        e,
      );
      return req.error(500, "Unexpected error while post-processing request");
    }
  }

  @BeforeCreate()
  public async beforeCreate(
    @Req() req: Request<SolutionVersion>,
  ): Promise<unknown> {
    try {
      return await this.solutionVersionService.handleDefaults(req);
    } catch (e) {
      this.logger.error(
        "Unexpected error occured in pre-processing SolutionVersion create",
        e,
      );
      return req.error(500, "Unexpected error while pre-processing request");
    }
  }

  @AfterCreate()
  public async afterCreate(
    @Req() req: Request<SolutionVersion>,
    @Result() result: SolutionVersion[],
  ): Promise<unknown> {
    try {
      if (!result || result.length <= 0) {
        this.logger.warn(
          "The created SolutionVersion was not available for post-processing",
        );
        return;
      }

      const { solution_ID, ID, version } = Array.isArray(result)
        ? result[0]
        : result;
      if (!solution_ID || !ID || !version) {
        this.logger.warn(
          "Invalid data for SolutionVersion post-processing, skipping...",
        );
        return;
      }

      await this.requestsService.handleNewSolutionVersionRequest(
        solution_ID,
        ID,
        version,
      );
    } catch (e) {
      this.logger.error(
        "Unknown error occured while post-processing solution version create",
        e,
      );
      return req.error(500, "Error occured during post-processing data");
    }
  }

  @AfterUpdate()
  public async afterUpdateEntity(
    @Req() req: Request<SolutionVersion>,
    @Result() result: SolutionVersion[],
  ): Promise<unknown> {
    try {
      if (!result || result.length <= 0) {
        this.logger.warn(
          "The updated SolutionVersion was not available for post-prcessing",
        );
        return;
      }

      const { status_code, solution_ID, version } = Array.isArray(result)
        ? result[0]
        : result;
      if (!status_code) {
        this.logger.warn("No status code available, skipping check");
        return;
      }

      if (!version || !solution_ID) {
        this.logger.warn(
          "Cannot handle solution upgrade event due to missing property",
        );
        return;
      }

      await this.requestsService.handleUpgradeSolutionRequest(
        version,
        solution_ID,
      );
    } catch (e) {
      this.logger.error(
        "Unexpected error occured while post-processing solution version update",
        e,
      );
      return req.error(500, "Error occured during post-processing data");
    }
  }

  @AfterDelete()
  public async afterDeleted(@Req() req: Request): Promise<unknown> {
    try {
      this.logger.info("After Delete hit");
      await this.softwareTechnologyService.deleteSoftwareTechnologies(req);
    } catch (e) {
      this.logger.error(
        "Error thrown while post-processing SoftwareSolution delete",
        e,
      );
      return req.error(500, "Unexpected error occured while post-processing");
    }
  }

  @OnBoundAction(SolutionVersion.actions.approveVersion)
  public async onApprove(
    @Req() req: ActionRequest<typeof SolutionVersion.actions.approveVersion>,
  ): ActionReturn<typeof SolutionVersion.actions.approveVersion> {
    try {
      await this.solutionVersionService.handleApprovalFlow(req);
    } catch (e) {
      this.logger.error(
        "Unexpected error occured while approving solution version",
        e,
      );
      return req.error(
        500,
        "Failed to approve solution version due to unexpected error",
      );
    }
  }

  @OnBoundAction(SolutionVersion.actions.rejectVersion)
  public async onReject(
    @Req() req: ActionRequest<typeof SolutionVersion.actions.rejectVersion>,
  ): ActionReturn<typeof SolutionVersion.actions.rejectVersion> {
    try {
      await this.solutionVersionService.handleRejectFlow(req);
    } catch (e) {
      this.logger.error(
        "Unexpected error occured while rejecting solution version",
        e,
      );
      return req.error(
        500,
        "Failed to reject solution version due to unexpected error",
      );
    }
  }

  @OnBoundAction(SolutionVersion.actions.submitReview)
  public async onSubmitReview(
    @Req() req: ActionRequest<typeof SolutionVersion.actions.submitReview>,
  ): ActionReturn<typeof SolutionVersion.actions.submitReview> {
    try {
      await this.solutionVersionService.handleSubmitReviewLogic(req);
    } catch (e) {
      this.logger.error("Failed to submit review", e);
      return req.error(500, "Failed to submit review due to internal error");
    }
  }
}
