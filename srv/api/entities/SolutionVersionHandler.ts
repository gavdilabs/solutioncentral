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
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SolutionVersionService from "../../services/SolutionVersionService";
import RequestsService from "../../services/RequestsService";

@EntityHandler(SolutionVersion)
export default class SolutionVersionHandler {
  private readonly logger: Logger;

  @Inject(SolutionVersionService)
  private readonly solutionVersionService: SolutionVersionService;

  @Inject(RequestsService)
  private readonly requestsService: RequestsService;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-version-handler");
  }

  @BeforeCreate()
  public async beforeCreate(
    @Req() req: Request<SolutionVersion>,
  ): Promise<unknown> {
    try {
      return this.solutionVersionService.handleDefaults(req.data);
    } catch (e) {
      this.logger.error(
        "Unexpected error occured in pre-processing SolutionVersion create",
        e,
      );
      return req.error(500, "Unexpcted error while pre-processing request");
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

      const { solution_ID, ID, version } = result[0];
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

      const { status_code, solution_ID, version } = result[0];
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

  @OnBoundAction(SolutionVersion.actions.approve)
  public async onApprove(
    @Req() req: ActionRequest<typeof SolutionVersion.actions.approve>,
  ): ActionReturn<typeof SolutionVersion.actions.approve> {
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

  @OnBoundAction(SolutionVersion.actions.reject)
  public async onReject(
    @Req() req: ActionRequest<typeof SolutionVersion.actions.reject>,
  ): ActionReturn<typeof SolutionVersion.actions.reject> {
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
}
