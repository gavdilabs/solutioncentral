import {
  EntityHandler,
  Next,
  OnRead,
  Req,
  Request,
} from "@dxfrontier/cds-ts-dispatcher";
import type { NextEvent } from "@dxfrontier/cds-ts-dispatcher";
import { CompanyConfiguration } from "#cds-models/RadarService";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@EntityHandler(CompanyConfiguration)
export default class CompanyConfigurationHandler {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("company-config-handler");
  }

  @OnRead()
  public async onRead(
    @Req() req: Request<CompanyConfiguration>,
    @Next() next: NextEvent,
  ): Promise<CompanyConfiguration> {
    let result = (await next()) as CompanyConfiguration;
    if (!result) {
      await INSERT.into(CompanyConfiguration.name).entries({
        ID: cds.utils.uuid(),
      });
      result = await SELECT.one.from(CompanyConfiguration.name);
    }
    return result;
  }
}
