import { SoftwareSolution } from "#cds-models/RadarService";
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
  AfterRead,
  BeforeCreate,
  BeforeUpdate,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import RequestsService from "../../services/RequestsService";
import SoftwareSolutionService from "../../services/SoftwareSolutionService";

@EntityHandler(SoftwareSolution)
export default class SoftwareSolutionHandler {
  private readonly logger: Logger;

  @Inject(RequestsService)
  private readonly requestsService: RequestsService;

  @Inject(SoftwareSolutionService)
  private readonly softwareSolutionService: SoftwareSolutionService;

  constructor() {
    this.logger = LoggerFactory.createLogger("software-solution-handler");
  }

  @AfterRead()
  public async afterRead(
    @Req() req: Request<SoftwareSolution>,
    @Result() result: SoftwareSolution[],
  ): Promise<unknown> {
    try {
      return await this.softwareSolutionService.handleVirtualProperties(
        req,
        result,
      );
    } catch (e) {
      this.logger.error(
        "Error thrown while post-processing SoftwareSolution read",
        e,
      );
      return req.error(500, "Unexpected error occured while post-processing");
    }
  }

  @BeforeUpdate()
  public async beforeUpdate(
    @Req() req: Request<SoftwareSolution>,
  ): Promise<unknown> {
    try {
      return this.softwareSolutionService.checkCompositedValues(req);
    } catch (e) {
      this.logger.error("Failed to handle pre-processing of update", e);
      return req.error(500, "Failed to pre-process request");
    }
  }

  @BeforeCreate()
  public async beforeCreate(
    @Req() req: Request<SoftwareSolution>,
  ): Promise<unknown> {
    try {
      return await this.softwareSolutionService.checkApprovalFlow(req);
    } catch (e) {
      this.logger.error(
        "Unexpected error occured while pre-processing create",
        e,
      );
      return req.error(500, "Unexpected error occured in pre-processing");
    }
  }

  @AfterCreate()
  public async afterCreated(
    @Req() req: Request<SoftwareSolution>,
    @Result() result: SoftwareSolution[],
  ): Promise<unknown> {
    try {
      if (!result || (Array.isArray(result) && result.length <= 0)) {
        this.logger.warn(
          "The created SoftwareSolution was not available for post-processing",
        );
        return;
      }

      const { name, ID } = Array.isArray(result) ? result[0] : result;
      if (!name || !ID) {
        this.logger.warn(
          "Invalid data for SoftwareSolution post-processing, skipping...",
        );
        return;
      }

      await this.requestsService.handleNewSolutionRequest(ID as string, name);
    } catch (e) {
      this.logger.error(
        "Error thrown while post-processing SoftwareSolution create",
        e,
      );
      return req.error(500, "Unexpected error occured while post-processing");
    }
  }

  @OnBoundAction(SoftwareSolution.actions.requestReview)
  public async onRequestReview(
    @Req() req: ActionRequest<typeof SoftwareSolution.actions.requestReview>,
  ): ActionReturn<typeof SoftwareSolution.actions.requestReview> {
    try {
      const keys = req.params[0] as string | Record<string, string>;
      const solutionID = typeof keys === "string" ? keys : keys.ID;
      if (!solutionID) {
        this.logger.warn("Invalid request, missing solution ID");
        return req.error(400, "Missing solution ID");
      }

      if (!req.data.description) {
        this.logger.warn("Invalid request, missing description");
        return req.error(400, "Invalid description provided");
      }

      await this.requestsService.handleReviewSolutionRequest(
        solutionID,
        req.data.description,
        req.user.id,
      );
    } catch (e) {
      this.logger.error("Failed to request review", e);
      return req.error(500, "Failed to request review");
    }
  }

  @OnBoundAction(SoftwareSolution.actions.requestSunset)
  public async onRequestSunset(
    @Req() req: ActionRequest<typeof SoftwareSolution.actions.requestSunset>,
  ): ActionReturn<typeof SoftwareSolution.actions.requestSunset> {
    try {
      const keys = req.params[0] as string | Record<string, string>;
      const solutionID = typeof keys === "string" ? keys : keys.ID;
      if (!solutionID) {
        this.logger.warn("Invalid request, missing solution ID");
        return req.error(400, "Missing solution ID");
      }

      if (!req.data.description) {
        this.logger.warn("Invalid request, missing description");
        return req.error(400, "Invalid description provided");
      }

      if (!req.data.sunsetDate) {
        this.logger.warn("Invalid request, missing sunset date");
        return req.error(400, "Invalid sunset date provided");
      }

      await this.requestsService.handleSunsetSolutionRequest(
        solutionID,
        req.data.sunsetDate,
        req.data.description,
      );
    } catch (e) {
      this.logger.error("Failed to request sunset of solution", e);
      return req.error(500, "Failed to request sunset of solution");
    }
  }

  @OnBoundAction(SoftwareSolution.actions.approveSolution)
  public async onApprove(
    @Req() req: ActionRequest<typeof SoftwareSolution.actions.approveSolution>,
  ): ActionReturn<typeof SoftwareSolution.actions.approveSolution> {
    try {
      await this.softwareSolutionService.handleApprovalLogic(req);
    } catch (e) {
      this.logger.error("Failed to approve solution", e);
      return req.error(500, "Failed to approve solution due to internal error");
    }
  }

  @OnBoundAction(SoftwareSolution.actions.rejectSolution)
  public async onReject(
    @Req() req: ActionRequest<typeof SoftwareSolution.actions.rejectSolution>,
  ): ActionReturn<typeof SoftwareSolution.actions.rejectSolution> {
    try {
      await this.softwareSolutionService.handleRejectLogic(req);
    } catch (e) {
      this.logger.error("Failed to reject solution", e);
      return req.error(500, "Failed to reject solution due to internal error");
    }
  }
}
