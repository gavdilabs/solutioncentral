import {
  Inject,
  OnEvent,
  Req,
  UnboundActions,
} from "@dxfrontier/cds-ts-dispatcher";
import { Request } from "@sap/cds";
import {
  dependentSolution,
  newSolution,
  reviewSolution,
  sunsetSolution,
  upgradeSolution,
} from "#cds-models/RadarService";
import BPAService from "../external/bpa";
import { isProcessDevelopment } from "../lib/utils/env";

@UnboundActions()
export default class EventHandler {
  @Inject(BPAService)
  private readonly bpaService: BPAService;

  @OnEvent(newSolution)
  public async onNewSolution(@Req() req: Request<newSolution>): Promise<void> {
    if (isProcessDevelopment()) return;
    await this.bpaService.startNewSolutionProcess(req.data);
  }

  @OnEvent(reviewSolution)
  public async onReviewSolution(
    @Req() req: Request<reviewSolution>,
  ): Promise<void> {
    if (isProcessDevelopment()) return;
    await this.bpaService.startReviewSolutionProcess(req.data);
  }

  @OnEvent(sunsetSolution)
  public async onSunsetSolution(
    @Req() req: Request<sunsetSolution>,
  ): Promise<void> {
    if (isProcessDevelopment()) return;
    await this.bpaService.startSunsetSolutionProcess(req.data);
  }

  @OnEvent(upgradeSolution)
  public async onUpgradeSolution(
    @Req() req: Request<upgradeSolution>,
  ): Promise<void> {
    if (isProcessDevelopment()) return;
    await this.bpaService.startUpgradeSolutionProcess(req.data);
  }

  @OnEvent(dependentSolution)
  public async onDependentSolution(
    @Req() req: Request<dependentSolution>,
  ): Promise<void> {
    if (isProcessDevelopment()) return;
    await this.bpaService.startDependentSolutionProcess(req.data);
  }
}
