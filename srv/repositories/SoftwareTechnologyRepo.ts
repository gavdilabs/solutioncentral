import { SoftwareTechnology } from "#cds-models/com/gavdilabs/techtransmgt/core";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class SoftwareTechnologyRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("soft-technology-repo");
  }

  public async deleteByParentKey(
    softwareVersion_ID: string,
    softwareVersion_solution_ID: string,
  ): Promise<unknown> {
    const query = DELETE.from(SoftwareTechnology.name).where({
      softwareVersion_ID: softwareVersion_ID,
      softwareVersion_solution_ID: softwareVersion_solution_ID,
    });

    this.logger.debug("Deleting SoftwareTechnology by parent key", query);
    return await cds.run(query);
  }
}
