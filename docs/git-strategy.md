# Git Strategy

## Table of Contents

* [Strategy](#strategy)
* [Branching](#branching)
    * [Release Branching](#release-branching)
    * [Changing Release Tags](#changing-release-tags)
* [Pull-Requests](#pull-requests)
    * [Developer Checklist](#developer-checklist)
    * [Approver Checklist](#approver-checklist)

## Strategy

This solution follows the "Main First" strategy, meaning that the core development branch is the "main" branch of the repository.
Upon a release of the solution, a release branch will be created to signify this, e.g. "release/2024.1".

The reason why we follow this structure is to simplify and empower fast deliverables and easy bugfixing.
When a hotfix is added to the main branch, it can easily be cherry-picked out to the current release branch(es) to make sure everything is working as intended.
On top of this, it allows us to have a non-destructive git workflow, where changes are pulled out from main to the release branches instead of merged in, which can usually lead to unexpected changes and issues.

In this document you can read about how we support this strategy, and what the rules are in relation to branching, implementing your code and merging back into the mainline changes.
It also outlines the rules for how to handle subsequent pull-requests when a feature/bugfix has been implemented.

> **Any git interactions that does not comply with this ruling will be wiped from the repository!**

## Branching

As mentioned earlier in this document, the "Main First" strategy follows the principle that all changes are merged into the main branch.
This means that all the latest development changes will always be present in the root of the repository, and it is from here we deviate to make releases.

Once a developer has been tasked with creating a branch and develop a new feature for the solution, the structure must follow the rule:

```
// Expected structure
feature/{ticket-number}-{feature-name}

// Meaning it will look as follows in real world example
feature/TTM-81-notification-email
```

If the task that the developer has been given is not a new feature, but instead a bugfix it should follow the structure of:

```
// Expected structure
bugfix/{ticket-number}-{bug-name}

// Meaning it would look as follows in a real world example
bugfix/TTM-110-unexpected-token
```

> **IT IS IMPORTANT THAT THIS STRUCTURE IS ALWAYS FOLLOWED AS IT GIVES US TRACEABILITY BACK TO ANY POTENTIAL DISCUSSIONS REGARDING THE IMPLEMENTATION!**

On top of this, all feature/bugfix branches must **ALWAYS** deviate out from the main branch, and **NEVER** from a different branch, no matter if it is a release, feature or bugfix branch.
It is imperitive that we structure the git tree this way, to make it easy for other developers to quickly get an overview of what is currently being worked on and from where they should commence their work.
Should someone create a non-correct branch, it will get deleted immediately to keep this structure intact!

Once the developer is satisfied with their implementation, the branch should be prepared for a pull-request into the main branch (for more on pull requests, [see following section](#pull-requests)).
When the branch is to be merged, the branch must be **squashed** before merging, to ensure a clean history on the main branch. This also means, that the squashed commit must have a message that encompasses the changes made.

Should the merged branch contain changes needed in an existing release, a cherry pick must be done on the merged commit on the main branch into the desired release branch. Do not merge in the entire main branch to the release branch, as this will include all elements being worked on and may corrupt the existing planned release.

### Release Branching

A release branch is a unique branch compared to the main, feature and bugfix branches, in the way that it shouldn't be created without direct agreement with the project owner.
Only when a release has been planned and agreed upon by the project owner, should the lead developer generate a release branch out from the agreed upon commit on the main branch.
When doing so, the following structure should be used:

```
// Example structure
release/{YEAR}.{RELEASE-NUMBER-FOR-YEAR}

// Meaning it would look as follows in a real world example
release/2024.4
```

Once a release branch has been created and desired changes has been included on the branch, tags will then be used to indicate which commit on the release branch is currently active in the given environment, and to also start any automated processes associated with the tag in the CI/CD process.
For most projects, these tags will be `test` and `prod`. These will indicate which commit is currently active on the environments used for the service. If new or other environments are introduced, these will also get their own tag.

This of course also means that once a developer has been instructed with marking a commit for release to an environment, they must go in and move the tag from any existing commit to the target commit.
The reason for this is to keep it visible what is expected to be running in an environment, allowing developers to more quickly analyse and fix any issues that might be happening in a given environment.

Visual example:

```
                               * main branch - latest commit
  feature/TTM-22-new-feature * |
                             | | * release/2024.4 branch - tag: test
                              \| |
                               | |
                               | * tag: prod
                               | |
                               | |
                               | |
                               |/
                               |
                               .
```

As you can see in the visual representation, we can easily get an idea of what version is currently running of the release in the `prod` environment, allowing us to quickly determining if a reported issue might've already been fixed in any of the subsequent commits for the release.
We can also quickly determine, that the `test` environment is currently running the latest version of the planned release, giving us a delta from which we can verify the different changes.

### Changing Release Tags

When you're ready to mark a commit/branch for a release to a specific environmt, be it '*test*' or '*prod*', you must follow the following steps:

```bash
$ git push origin :refs/tags/<tag-name> # Remove existing tag from current location

$ git tag -fa <tag-name> # Apply the tag to your current location/commit

$ git push origin --tags  # Push the changes in tags to the remote repository
```

## Pull-Requests

As mentioned in the [previous section](#branching), once a developer is satisfied with their implementation they must prepare a pull-request (PR) to merge their changes back into the main branch, i.e. the trunk.
This is the **ONLY** way for a developer to get their changes included and it should **NEVER** be possible to push directly into the main branch at any given moment.

When preparing the pull-request, the developer must include a direct link to the user story/task/bug ticket associated with the implementation performed, as well as a description of the changes made and their expected outcome.
On top of this, any new feature must be covered by an automated unit test, and if existing logic has been changed a regression test must be implemented as well.
Once all of this is in order, the developer must provide a minimum of 2 reviewers to the PR, of which one of them must be the lead developer of the project. If the developer in question is the lead developer, the project manager must be assigned instead.
This is done in order to ensure that the code quality standard is upheld.

A developer must **NEVER** approve their own PR, nor may they start the merging progress without consent of the approving parties. Doing so will result in the PR being removed entirely from the project.
Also, a PR must never be sent anywhere besides to the main branch!

### Developer Checklist

The following checklist must be followed when submitting your PR:

- [x] PR is set to be merged as a squash-commit
- [x] Link is provided in PR to the associated task/story/bug ticket
- [x] Description of elements changed included PR description
- [x] 2 approvers added to approver list
- [x] PR is targeting the `main` branch
- [x] Automated tests included for any new logic implementation
- [x] Automated regression tests performed/included in case of changes to existing logic

### Approver Checklist

The following checklist must be folloed when approving a PR:

- [x] Above developer checklist followed and implemented/used by PR
- [x] All automated tests are passed
- [x] Perform code-review and ensure standards are followed
- [x] All potential pipelines completed with no errors
- [x] Comments added regarding observations

-------------
[Back to top](#git-strategy)

