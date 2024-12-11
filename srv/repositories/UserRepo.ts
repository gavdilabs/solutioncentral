import { User } from "#cds-models/com/gavdilabs/techtransmgt/core";
import {
  CDS_DISPATCHER,
  Inject,
  Repository,
  Service,
} from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";

@Repository()
export default class UserRepo {
  private readonly logger: Logger;

  @Inject(CDS_DISPATCHER.SRV)
  private readonly core: Service;

  constructor() {
    this.logger = LoggerFactory.createLogger("user-repo");
  }

  public async getUserByKey(key: string): Promise<User | undefined> {
    return await this.core
      .run(SELECT.one.from(User.name, { username: key }))
      .catch((e) => {
        this.logger.error("Failed to find entry", e);
        return undefined;
      });
  }
}
