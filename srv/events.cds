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

  event dependentSolution : {
    /**
     * ID of the solution that is to be added as dependent to the target solution
     */
    dependentID           : String;
    /**
     * Name of the solution that is to be added as dependent to the target solution
     */
    dependentName         : String;
    /**
     * Email of the owner of the solution that is to be added as dependent
     */
    dependentOwnerEmail   : String;
    /**
     * List of usernames of the maintainers of the target solution
     */
    maintainerUsernames   : array of String;
    /**
     * Description of why the requester wants a dependent link to target solution
     */
    requestDescription    : String;
    /**
     * Email of the requesting user
     */
    requesterEmail        : String;
    /**
     * Full name of the requesting user
     */
    requesterName         : String;
    /**
     * Username of the requesting user
     */
    requesterUsername     : String;
    /**
     * ID of the target solution
     */
    solutionID            : String;
    /**
     * Name of the target solution
     */
    solutionName          : String;
    /**
     * Email of the owner of the target solution
     */
    solutionOwnerEmail    : String;
    /**
     * Username of the owner of the target solution
     */
    solutionOwnerUsername : String;
  };
}
