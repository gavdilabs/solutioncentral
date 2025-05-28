import { User } from "#cds-models/com/gavdilabs/techtransmgt/core";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class UserRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("user-repo");
  }

  public async getUserByKey(key: string): Promise<User | undefined> {
    return await cds
      .run(SELECT.one.from(User.name, { username: key }))
      .catch((e) => {
        this.logger.error("Failed to find entry", e);
        return undefined;
      });
  }

  public async getApproverUserEmails(): Promise<Set<string>> {
    const query = SELECT.from(User.name)
      .where(`approver = true AND email is not null`)
      .columns("email");

    const res: { username: string; email: string }[] = await cds.run(query);
    return new Set<string>(res.map((el) => el.email));
  }

  public async getUsersName(username: string): Promise<string | undefined> {
    const query = SELECT.from(User.name, { username: username }).columns(
      "fullName",
    );
    const res: User = await cds.run(query);
    return res.fullName as string;
  }
}
