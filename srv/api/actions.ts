import {
  importSolutionsFromADT,
  SoftwareSolution,
} from "#cds-models/RadarService";
import type {
  ActionRequest,
  ActionReturn,
} from "@dxfrontier/cds-ts-dispatcher";
import {
  Inject,
  OnAction,
  Req,
  UnboundActions,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import { DefaultSoftwareStatus } from "../lib/utils/defaults";
import SoftwareSolutionService from "../services/SoftwareSolutionService";

@UnboundActions()
export default class ActionImportHandler {
  private readonly logger: Logger;

  @Inject(SoftwareSolutionService)
  private softwareSolutionSrv: SoftwareSolutionService;

  constructor() {
    this.logger = LoggerFactory.createLogger("action-handler");
  }
  @OnAction(importSolutionsFromADT)
  public async onImportSolutionsFromADT(
    @Req() req: ActionRequest<typeof importSolutionsFromADT>,
  ): ActionReturn<typeof importSolutionsFromADT> {
    try {
      if (!req.data?.packages) {
        this.logger.warn(
          "Request was made to import solutions from ADT without required importing parameters",
        );
        req.error("Missing importing parameter. Import is cancelled.");
        return undefined;
      }

      const packages = req.data.packages;
      const promises = [];
      packages.forEach((p) => {
        const entry: SoftwareSolution = {
          solutionStatus_code: DefaultSoftwareStatus.RELEASED,
          packageNamespace: p.techName,
          name: p.name,
          description: p.description,
          platform_code: "ABAP",
        };
        promises.push(
          this.softwareSolutionSrv.handleImportSoftwareSolutionLogic(entry),
        );
      });

      await Promise.all(promises);
    } catch (e) {
      this.logger.error("Unexpected error occured in service", e);
      req.error(500, "Unexpected Error Occured");
      return;
    }
  }
}
