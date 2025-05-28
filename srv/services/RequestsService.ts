import {
  CDS_DISPATCHER,
  Inject,
  Service,
  ServiceLogic,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import UserRepo from "../repositories/UserRepo";
import SoftwareSolutionRepo from "../repositories/SoftwareSolutionRepo";

@ServiceLogic()
export default class RequestsService {
  private readonly logger: Logger;

  @Inject(CDS_DISPATCHER.SRV)
  private readonly core: Service;

  @Inject(UserRepo)
  private readonly userRepo: UserRepo;

  @Inject(SoftwareSolutionRepo)
  private readonly softwareSolutionRepo: SoftwareSolutionRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("requests-service");
  }

  public async handleNewSolutionVersionRequest(
    solutionID: string,
    versionID: string,
    versionName: string,
  ): Promise<unknown> {
    const [approverEmails, solutionInfo] = await Promise.all([
      this.userRepo.getApproverUserEmails(),
      this.softwareSolutionRepo.byKey(solutionID, true, [
        "name",
        "owner.email",
      ]),
    ]);

    this.logger.debug("Emitting new solution version event");
    return await this.core.emit("newSolutionVersion", {
      solutionID: solutionID,
      versionID: versionID,
      versionName: versionName,
      solutionName: solutionInfo?.name,
      solutionOwnerEmail: solutionInfo?.owner?.email,
      approverEmails: approverEmails,
    });
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

  public async handleReviewSolutionRequest(
    solutionID: string,
    description: string,
    username: string,
  ): Promise<unknown> {
    const [reviewerEmails, solutionName, requesterName] = await Promise.all([
      this.softwareSolutionRepo.getReviewerEmailList(solutionID),
      this.softwareSolutionRepo.getSolutionName(solutionID),
      this.userRepo.getUsersName(username),
    ]);

    this.logger.debug("Emitting review solution event");
    return await this.core.emit("reviewSolution", {
      description: description,
      solutionID: solutionID,
      solutionName: solutionName,
      requesterName: requesterName,
      requesterUsername: username,
      reviewerList: reviewerEmails,
    });
  }

  public async handleSunsetSolutionRequest(
    solutionID: string,
    sunsetDate: string,
    description: string,
  ): Promise<unknown> {
    const [solutionInfo, dependentEmails] = await Promise.all([
      this.softwareSolutionRepo.byKey(solutionID, true, [
        "name",
        "owner.email",
      ]),
      this.softwareSolutionRepo.getDependentOwnersEmails(solutionID),
    ]);

    if (!solutionInfo) {
      throw new Error("Cannot find targeted software solution");
    }

    if (!dependentEmails) {
      throw new Error("Failed to find dependents' emails");
    }

    this.logger.debug("Emitting sunset solution event");
    return await this.core.emit("sunsetSolution", {
      solutionID: solutionID,
      sunsetDate: sunsetDate,
      solutionName: solutionInfo.name as string,
      dependentEmails: Array.from(dependentEmails?.values() ?? []),
      solutionOwnerEmail: solutionInfo.owner?.email as string,
      description: description,
    });
  }

  public async handleUpgradeSolutionRequest(
    version: string,
    solutionID: string,
  ): Promise<unknown> {
    const [dependentEmails, solutionInfo] = await Promise.all([
      this.softwareSolutionRepo.getDependentOwnersEmails(solutionID),
      this.softwareSolutionRepo.byKey(solutionID, true, [
        "name",
        "owner.email",
      ]),
    ]);

    this.logger.debug("Emitting solution upgrade event");
    return await this.core.emit("upgradeSolution", {
      dependentEmails: Array.from(dependentEmails?.values() ?? []),
      newVersion: version,
      solutionName: solutionInfo?.name,
      solutionOwnerEmail: solutionInfo?.owner?.email,
      plannedReleaseDate: "", // Not yet available
      releaseNotes: "", // Not yet available
    });
  }
}
