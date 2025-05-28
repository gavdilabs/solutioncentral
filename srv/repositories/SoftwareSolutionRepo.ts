import { SoftwareSolution } from "#cds-models/com/gavdilabs/techtransmgt/core";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class SoftwareSolutionRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("soft-solution-repo");
  }

  public async byKey(
    id: string,
    isActive: boolean = true,
    columns?: string[],
  ): Promise<SoftwareSolution | undefined> {
    const query = SELECT.from(SoftwareSolution.name, {
      ID: id,
      IsActiveEntity: isActive,
    });

    if (columns) {
      query.columns(columns);
    }

    this.logger.debug("Fetching SoftwareSolution by key", query);
    return await cds.run(query);
  }

  public async updateStatus(id: string, statusCode: number): Promise<void> {
    const query = UPDATE.entity(SoftwareSolution.name, {
      ID: id,
      IsActiveEntity: true,
    }).set({
      solutionStatus_code: statusCode,
    });

    this.logger.debug("Performing status update query", query);
    await cds.run(query);
  }

  public async getReviewerEmailList(
    solutionID: string,
  ): Promise<Set<string> | undefined> {
    const query = SELECT.from(SoftwareSolution.name, {
      ID: solutionID,
      IsActiveEntity: true,
    }).columns((el: any) => {
      el.team((t: any) => {
        t._reviewers((r: any) => {
          r.user((u: any) => {
            u.email;
          });
        });
      });
    });

    const res: SoftwareSolution = await cds.run(query);
    const emails = res?.team?._reviewers?.map((el) => el.user?.email);
    return emails
      ? new Set<string>(emails.filter((el) => el !== undefined && el !== null))
      : undefined;
  }

  public async getSolutionName(
    solutionID: string,
    isActiveEntity: boolean = true,
  ): Promise<string | undefined> {
    const query = SELECT.from(SoftwareSolution.name, {
      ID: solutionID,
      IsActiveEntity: isActiveEntity,
    }).columns("name");

    const res: SoftwareSolution = await cds.run(query);
    return res.name as string;
  }

  public async getDependentOwnersEmails(
    solutionID: string,
  ): Promise<Set<string> | undefined> {
    const query = SELECT.from(SoftwareSolution.name, {
      ID: solutionID,
      IsActiveEntity: true,
    }).columns((el: any) => {
      el.Dependents((dep: any) => {
        dep.dependentSoftwareSolution((sol: any) => {
          sol.owner((o: any) => {
            o.email;
          });
        });
      });
    });

    const res: SoftwareSolution = await cds.run(query);
    const emails = res.Dependents?.map(
      (el) => el.dependentSoftwareSolution,
    ).map((el) => el?.owner?.email);
    return emails
      ? new Set<string>(emails.filter((e) => e !== undefined && e !== null))
      : undefined;
  }
}
