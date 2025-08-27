import { SolutionHybrid } from "#cds-models/RadarService";
import {
  AfterCreate,
  AfterDelete,
  EntityHandler,
  Inject,
  Req,
  Request,
  Result,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SolutionHybridService from "../../services/SolutionHybridService";

@EntityHandler(SolutionHybrid)
export default class SolutionHybridHandler {
  private readonly logger: Logger;

  @Inject(SolutionHybridService)
  private solutionHybridSrv: SolutionHybridService;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-hybrid-handler");
  }

  @AfterDelete()
  public async afterDeleted(@Req() req: Request): Promise<unknown> {
    try {
      await this.solutionHybridSrv.deleteReverseSolutionHybrid(req);
    } catch (e) {
      this.logger.error(
        "Error thrown while post-processing SolutionHybrid delete",
        e,
      );
      return req.error(500, "Unexpected error occured while post-processing");
    }
  }

  @AfterCreate()
  public async afterCreate(
    @Req() req: Request<SolutionHybrid>,
    @Result() result: SolutionHybrid[],
  ): Promise<unknown> {
    try {
      if (!result || result.length <= 0) {
        this.logger.warn(
          "The created SolutionHybrid was not available for post-processing",
        );
        return;
      }

      const { solution_ID, hybridSolution_ID } = Array.isArray(result)
        ? result[0]
        : result;
      if (!solution_ID || !hybridSolution_ID) {
        this.logger.warn(
          "Invalid data for SolutionHybrid post-processing, skipping...",
        );
        return;
      }

      await this.solutionHybridSrv.createReverseSolutionHybrid(
        solution_ID,
        hybridSolution_ID,
      );
    } catch (e) {
      this.logger.error(
        "Unknown error occured while post-processing solution hybrid reverse create",
        e,
      );
      return req.error(500, "Error occured during post-processing data");
    }
  }
}
