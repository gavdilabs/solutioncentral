import { SolutionVersion } from "#cds-models/com/gavdilabs/techtransmgt/core";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class SolutionVersionRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("soft-version-repo");
  }

  public async byKey(
    id: string,
    solutionID: string,
    columns?: string[],
  ): Promise<SolutionVersion | undefined> {
    const query = SELECT.from(SolutionVersion, {
      ID: id,
      solution_ID: solutionID,
    });

    if (columns) {
      query.columns(columns);
    }

    this.logger.debug("Fetching SolutionVersion by key", query);
    return await cds.run(query);
  }

  public async updateStatus(
    id: string,
    solutionID: string,
    status: number,
  ): Promise<void> {
    const query = UPDATE.entity(SolutionVersion.name, {
      ID: id,
      solution_ID: solutionID,
    }).set({ status_code: status });

    this.logger.debug("Performing status update query", query);
    await cds.run(query);
  }
}
