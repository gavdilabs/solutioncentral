using {RadarService} from './service';

extend service RadarService with {

  // Solution events - Internal

  event newSolution : {
    /**
     * List of emails of people who can approve/reject this solution
     */
    approverEmails : array of String;
    /**
     * Name of the new solution
     */
    solutionName   : String;
    /**
     * ID of the new solution
     */
    solutionID     : String;
  };

  event reviewSolution : {
    /**
     * Short description of why the requester wants a review of the solution
     */
    description       : String;
    /**
     * Full name of the user that is requesting the review
     */
    requesterName     : String;
    /**
     * The username of the user that is requesting the review
     */
    requesterUsername : String;
    /**
     * List of emails of the people who have the ability to review the solution
     */
    reviewerList      : array of String;
    /**
     * ID of the solution that is to be reviewed
     */
    solutionID        : String;
    /**
     * Name of the solution that is to be reviewed
     */
    solutionName      : String;
  };

  event sunsetSolution : {
    /**
     * Email list for the owners of the dependent solutions
     */
    dependentEmails    : array of String;
    /**
     * The ID of the solution that is about to sunset
     */
    solutionID         : String;
    /**
     * Name of the solution that is about to sunset
     */
    solutionName       : String;
    /**
     * Email of the solution owner
     */
    solutionOwnerEmail : String;
    /**
     * Date for which the solution will sunset
     */
    sunsetDate         : DateTime;
    /**
     * Description of why the solution is being sunset
     */
    description        : String;
  };

  event upgradeSolution : {
    /**
     * List of emails of the solution owners for the dependent solutions
     */
    dependentEmails    : array of String;
    /**
     * The version of the solution that is about to be released
     */
    newVersion         : String;
    /**
     * The target date for the version release date
     */
    plannedReleaseDate : Date;
    /**
     * Short description of elements changed or link to the location of changelog
     */
    releaseNotes       : String;
    /**
     * Name of the solution that is being upgraded
     */
    solutionName       : String;
    /**
     * Email of the solution owner
     */
    solutionOwnerEmail : String;
  };

  event newSolutionVersion : {
    /**
    * List of emails for possible approvers
    */
    approverEmails     : array of String;
    /**
    * ID of the solution getting a new version
    */
    solutionID         : String;
    /**
    * Name of the solution getting a new version
    */
    solutionName       : String;
    /**
    * Email of the owner of the solution getting a new version
    */
    solutionOwnerEmail : String;
    /**
    * The ID of the new version
    */
    versionID          : String;
    /**
    * The semantic versioning name given to the new version
    */
    versionName        : String;
  }
}
