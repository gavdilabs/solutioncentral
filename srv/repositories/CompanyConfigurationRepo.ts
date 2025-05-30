import { CompanyConfiguration } from "#cds-models/com/gavdilabs/techtransmgt/core";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class CompanyConfigurationRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("company-config-repo");
  }

  public async getConfiguration(): Promise<CompanyConfiguration | undefined> {
    this.logger.debug("Loading company configuration");
    const query = SELECT.from(CompanyConfiguration.name).limit(1);
    const result: CompanyConfiguration[] = await cds.run(query);

    return !result || result.length <= 0 ? undefined : result[0];
  }
}
