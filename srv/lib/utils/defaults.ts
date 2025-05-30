/**
 * Default SoftwareStatus enum containing standard values.
 * Used for fast and naive look-ups
 */
export enum DefaultSoftwareStatus {
  AWAITING_APPROVAL = 0,
  APPROVED = 1,
  REJECTED = 2,
  DEVELOP = 3,
  TESTING = 4,
  RELEASED = 5,
  ARCHIVED = 6,
}

export enum DefaultApprovalFlows {
  NO_APPROVAL = 0,
  APPROVAL = 1,
  BPA_APPROVAL = 2,
}
