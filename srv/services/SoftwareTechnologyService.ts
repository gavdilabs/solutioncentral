import { Inject, Request, ServiceLogic } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import SoftwareTechnologyRepo from "../repositories/SoftwareTechnologyRepo";

@ServiceLogic()
export default class SoftwareTechnologyService {
  private readonly logger: Logger;

  @Inject(SoftwareTechnologyRepo)
  private softTechnologyRepo: SoftwareTechnologyRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("software-technology-service");
  }

  public async deleteSoftwareTechnologies(req: Request): Promise<unknown> {
    try {
      const params = (
        Array.isArray(req.params) ? req.params[0] : req.params
      ) as { ID: string; solution_ID: string };

      return await this.softTechnologyRepo.deleteByParentKey(
        params.ID,
        params.solution_ID,
      );
    } catch (e) {
      this.logger.error(
        "Database query failed, could not delete related software technologies",
        e,
      );
      req.error(
        500,
        "Service failed to delete software technologies in database",
      );
      return;
    }
  }
}
