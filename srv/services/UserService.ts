import { ActiveUser } from "#cds-models/com/gavdilabs/techtransmgt/types";
import { Inject, Request, ServiceLogic } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import UserRepo from "../repositories/UserRepo";

@ServiceLogic()
export default class UserService {
  private readonly logger: Logger;

  @Inject(UserRepo)
  private readonly userRepo: UserRepo;

  constructor() {
    this.logger = LoggerFactory.createLogger("user-srv");
  }

  public async getActiveUser(req: Request): Promise<ActiveUser | undefined> {
    const userID = req.user.id;
    const user = await this.userRepo.getUserByKey(userID);

    this.logger.trace(
      `Searched for active user with key: ${userID} - Found:`,
      user,
    );

    this.logger.info("User Roles: " + JSON.stringify(req.user.roles));
    return user
      ? {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: {
            isAdmin: req.user.is("Admin"),
            isReviewer: req.user.is("Reviewer"),
            isView: req.user.is("View"),
            isDeveloper: req.user.is("Developer"),
            isMaintainer: req.user.is("Maintainer"),
            isApprover: req.user.is("Approver"),
          },
        }
      : undefined;
  }
}
