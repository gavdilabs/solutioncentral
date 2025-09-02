import { Inject, Request } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SolutionHybridRepo from "../repositories/SolutionHybridRepo";

export default class SolutionHybridService {
  private readonly logger: Logger;

  @Inject(SolutionHybridRepo)
  private solutionHybridRepo: SolutionHybridRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-hybrid-service");
  }

  public async deleteReverseSolutionHybrid(req: Request): Promise<unknown> {
    try {
      const params = (
        Array.isArray(req.params) ? req.params[0] : req.params
      ) as { solution_ID: string; hybridSolution_ID: string };

      return await this.solutionHybridRepo.deleteReverseByKey(
        params.solution_ID,
        params.hybridSolution_ID,
      );
    } catch (e) {
      this.logger.error(
        "Database query failed, could not delete related solution hybrid entry",
        e,
      );
      req.error(500, "Service failed to delete solution hybrid in database");
      return;
    }
  }

  public async createReverseSolutionHybrid(
    solution_ID: string,
    hybridSolution_ID: string,
  ): Promise<unknown> {
    return await this.solutionHybridRepo.createReverseByKey(
      solution_ID,
      hybridSolution_ID,
    );
  }
}
