import { SolutionReview } from "#cds-models/RadarService";
import { Repository } from "@dxfrontier/cds-ts-dispatcher";
import { Logger, LoggerFactory } from "@gavdi/caplog";
import cds from "@sap/cds";

@Repository()
export default class SolutionReviewRepo {
  private readonly logger: Logger;

  constructor() {
    this.logger = LoggerFactory.createLogger("solution-review-repo");
  }

  public async createReview(reviewData: SolutionReview): Promise<void> {
    const query = INSERT.into(SolutionReview.name).entries(reviewData);
    return await cds.run(query);
  }
}
