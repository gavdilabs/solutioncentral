import { ADTNodeStructure } from "#cds-models/pxm/plugin/adt/ADTService";
import { ADTPlugin } from "@pxmsoft/cap-adt";
import { Request, ServiceLogic } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import { mapNodeStructureForPlugin } from "@pxmsoft/cap-adt/lib/utils";

@ServiceLogic()
export default class ADTPluginService {
  private readonly logger: Logger;
  private client: any;

  constructor() {
    this.client = ADTPlugin.getClient();
    this.logger = LoggerFactory.createLogger("adt-plugin-srv");
  }

  public async fetch(): Promise<ADTNodeStructure | undefined> {
    try {
      const fetchRes = await this.fetchWithParameter("DEVC/K", "");
      const packages: ADTNodeStructure = mapNodeStructureForPlugin(fetchRes);
      return packages;
    } catch (e) {
      throw new Error("Failed to fetch ADT Nodes", e);
    }
  }

  private async fetchWithParameter(
    objectType: string,
    objectName: string = "",
  ): Promise<ADTNodeStructure | undefined> {
    try {
      return await this.client.getNodeContents(objectType, objectName);
    } catch (e) {
      throw new Error("Failed to run external service query", e);
    }
  }
}
