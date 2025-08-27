import { SolutionHybrid } from "#cds-models/RadarService";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class SolutionHybridRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-hybrid-repo");
  }

  public async deleteReverseByKey(
    solution_ID: string,
    hybridSolution_ID: string,
  ): Promise<void> {
    const query = DELETE.from(SolutionHybrid.name).where({
      solution_ID: hybridSolution_ID,
      hybridSolution_ID: solution_ID,
    });

    this.logger.debug("Deleting SolutionHybrid by From Link", query);
    return await cds.run(query);
  }

  public async createReverseByKey(
    solution_ID: string,
    hybridSolution_ID: string,
  ): Promise<void> {
    const entry: SolutionHybrid = {
      solution_ID: hybridSolution_ID,
      hybridSolution_ID: solution_ID,
    };
    const query = INSERT.into(SolutionHybrid.name).entries(entry);
    return await cds.run(query);
  }
}
