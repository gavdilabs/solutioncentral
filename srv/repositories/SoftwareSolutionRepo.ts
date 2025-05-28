import { SoftwareSolution } from "#cds-models/com/gavdilabs/techtransmgt/core";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class SoftwareSolutionRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("soft-solution-repo");
  }

  public async byKey(
    id: string,
    isActive: boolean = true,
    columns?: string[],
  ): Promise<SoftwareSolution | undefined> {
    const query = SELECT.from(SoftwareSolution.name, {
      ID: id,
      IsActiveEntity: isActive,
    });

    if (columns) {
      query.columns(columns);
    }

    this.logger.debug("Fetching SoftwareSolution by key", query);
    return await cds.run(query);
  }

  public async updateStatus(id: string, statusCode: number): Promise<void> {
    const query = UPDATE.entity(SoftwareSolution.name, {
      ID: id,
      IsActiveEntity: true,
    }).set({
      solutionStatus_code: statusCode,
    });

    this.logger.debug("Performing status update query", query);
    await cds.run(query);
  }
}
