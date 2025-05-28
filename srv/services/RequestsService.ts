import {
  CDS_DISPATCHER,
  Inject,
  Service,
  ServiceLogic,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import UserRepo from "../repositories/UserRepo";

@ServiceLogic()
export default class RequestsService {
  private readonly logger: Logger;

  @Inject(CDS_DISPATCHER.SRV)
  private readonly core: Service;

  @Inject(UserRepo)
  private readonly userRepo: UserRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("requests-service");
  }

  public async handleNewSolutionRequest(
    solutionID: string,
    solutionName: string,
  ): Promise<unknown> {
    const approverEmails = await this.userRepo.getApproverUserEmails();

    this.logger.debug("Emitting new solution event");
    return await this.core.emit("newSolution", {
      approverEmails: Array.from(approverEmails.values()),
      solutionName: solutionName,
      solutionID: solutionID,
    });
  }
}
