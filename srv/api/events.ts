import {
  Inject,
  OnEvent,
  Req,
  UnboundActions,
} from "@dxfrontier/cds-ts-dispatcher";
import { Request } from "@sap/cds";
import {
  newSolution,
  newSolutionVersion,
  reviewSolution,
  sunsetSolution,
  upgradeSolution,
} from "#cds-models/RadarService";
import BPAService from "../external/bpa";
import { isProcessDevelopment } from "../lib/utils/env";
import { Logger, LoggerFactory } from "@gavdi/caplog";

@UnboundActions()
export default class EventHandler {
  private readonly logger: Logger;

  @Inject(BPAService)
  private readonly bpaService: BPAService;

  constructor() {
    this.logger = LoggerFactory.createLogger("event-handler");
  }

  @OnEvent(newSolution)
  public async onNewSolution(@Req() req: Request<newSolution>): Promise<void> {
    this.logger.debug("Handling new solution event");
    if (isProcessDevelopment()) return;
    await this.bpaService.startNewSolutionProcess(req.data);
  }

  @OnEvent(reviewSolution)
  public async onReviewSolution(
    @Req() req: Request<reviewSolution>,
  ): Promise<void> {
    this.logger.debug("Handling review solution event");
    if (isProcessDevelopment()) return;
    await this.bpaService.startReviewSolutionProcess(req.data);
  }

  @OnEvent(sunsetSolution)
  public async onSunsetSolution(
    @Req() req: Request<sunsetSolution>,
  ): Promise<void> {
    this.logger.debug("Handling sunset solution event");
    if (isProcessDevelopment()) return;
    await this.bpaService.startSunsetSolutionProcess(req.data);
  }

  @OnEvent(upgradeSolution)
  public async onUpgradeSolution(
    @Req() req: Request<upgradeSolution>,
  ): Promise<void> {
    this.logger.debug("Handling upgrade solution event");
    if (isProcessDevelopment()) return;
    await this.bpaService.startUpgradeSolutionProcess(req.data);
  }

  @OnEvent(newSolutionVersion)
  public async onNewSolutionVersion(
    @Req() req: Request<newSolutionVersion>,
  ): Promise<void> {
    this.logger.debug("Handling new solution version event");
    if (isProcessDevelopment()) return;
    await this.bpaService.startNewSolutionVersionProcess(req.data);
  }
}
