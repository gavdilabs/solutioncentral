import { SolutionVersion } from "#cds-models/RadarService";
import type {
  ActionRequest,
  ActionReturn,
} from "@dxfrontier/cds-ts-dispatcher";
import {
  EntityHandler,
  Inject,
  OnBoundAction,
  Req,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SolutionVersionService from "../../services/SolutionVersionService";

@EntityHandler(SolutionVersion)
export default class SolutionVersionHandler {
  private readonly logger: Logger;

  @Inject(SolutionVersionService)
  private readonly solutionVersionService: SolutionVersionService;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-version-handler");
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
