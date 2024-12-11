import type {
  ActionRequest,
  ActionReturn,
} from "@dxfrontier/cds-ts-dispatcher";
import { getActiveUser } from "#cds-models/Service";
import {
  Inject,
  OnFunction,
  Req,
  UnboundActions,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import UserService from "../services/UserService";

@UnboundActions()
export default class FunctionImportHandler {
  private readonly logger: Logger;

  @Inject(UserService)
  private readonly userService: UserService;

  constructor() {
    this.logger = LoggerFactory.createLogger("function-import-handler");
  }

  @OnFunction(getActiveUser)
  public async onGetActiveUser(
    @Req() req: ActionRequest<typeof getActiveUser>,
  ): ActionReturn<typeof getActiveUser> {
    try {
      const activeUser = await this.userService.getActiveUser(req);

      if (!activeUser) {
        this.logger.warn(
          "Provided user ID in request token did not match internal user",
          req.user.id,
        );
        req.error(404, "Could not find active user with provided ID");
        return undefined;
      }

      return activeUser;
    } catch (e) {
      this.logger.error("Unexpected error occured in service", e);
      req.error(500, "Unexpected Error Occured");
      return;
    }
  }
}
