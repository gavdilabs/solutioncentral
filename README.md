# Solution Central

Solution Central helps you get an manage the full life-cycle of your SAP Technology-focused Software Solutions & Extensions.

| Be aware: This is the pre-release version : Expect the full version with deployment support and more features available in the coming days!

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#infrastructure-requirements">Infrastructure Requirements</a>
    </li>
    <li>
      <a href="#applications">Applications</a>
    </li>
    <li>
      <a href="#roles">Roles</a>
    </li>
    <li>
      <a href="#purpose">Purpose</a>
      <ul>
        <li><a href="#solution-approvals">Solution Approvals</a></li>
        <li><a href="#technology-radar">Technology Radar</a></li>
        <li><a href="#sunsetting--shifting">Sunsetting & Shifting</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## Infrastructure Requirements

This solutions runs on SAP Cloud Application Programming (CAP) as a Node.JS-based solution, coupled with OpenUI5 for serving the UIs.
To deploy the solution you need the following:

Service | Description
--------------------------------------------|------------------------------------------------------------------------
SAP BTP - Cloud Foundry                     | SAP Business Technology Platform with a Cloud Foundry Subaccount
Cloud Foundry Runtime                       | Runtime for the Node.JS application (with Minimum 2 gb of Memory)
HTML5 Repo & Runtime                        | Service for hosting and running (as Webserver) the Frontend
PostgreSQL Database                         | Hyper-Scaler supplied Database for hosting the data of the application
SAP Business Process Automation Services    | For Managing the Workflows and Approvals (Optional)

For detailed information on dependencies, check out the deployment descriptor.

## Applications

The solution includes 2 applications:

* Software Solution Cockpit : Allows you to register and manage the state and dependencies of your software solutions

* Technology Radar : Allows you to manage which Technologies you are currently using and what maturity state they are in

The applications are developed in Fiori Elements and UI5 with a CAP-based backend on SAP BTP.

## Roles

The solution includes 3 roles:

* Requester : Can propose and maintain new and existing solutions & extensions (based on team assignment)

* Approver : Can review, evaluate and approve new solutions & extensions

* Admin : Can setup and configure Solution Central and set up and Assign Teams, if no User Store is associated)

## Purpose

Most SAP S/4HANA projects discover the impact of not having tracked and maintained ownership and insight of the state of the applications and extensions added to the system.
A costly Custom Code Migration is typically needed and then intent of getting closer to the Clean Core lands far down the prioritization list, when the focus is on de-risking the massive cost constantly.
This is a missed opportunity to decrease the TCO of the system and to enable future agility, including preparing future shifts in technology.

To support the SAP eco-system in taking back control of their extensions made either on the ABAP/NetWeaver Platform as On-Stack Extensions or the SAP Business Technology Platform (BTP) as Side-By-Side Extensions Solution Central is introduced.
It allows you to capture everything around a new solution and control the process around approving, tracking and reviewing new extensions in a proper way - preventing the system from sanding up and ending up in another Custom Code Migration a few years down the line.
Capturing everything from the version to the dependencies allows you to document ownership - from both the technical and the business side.

Want to know the actual state - both in terms of Code Quality and Clean Core level? Check in Solution Central...
Want to know who can validate the system? Check in Solution Central...
Want to know where the documentation resides or the code repository? Check in Solution Central...
Want to know dependencies if a solution is to be shifted or deprecated? Check in Solution Central...

The concept is to bind together all the sources and the actual state of a solution or extension with its Package/Namespace and formally review the state of the solution, including how clean the solution is and what quality the source code has.
It is all about maturity in the Life-cycle management and while there is still a lot of manual tasks surrounding the solution it is a starting point - and the rest can be automated and improved over time.

### Solution Approvals

The Approval of a new proposed solution or extension can be set up in 3 ways:

* No Approval : Every new solution is automatically approved and can be shot to production immedidately - AKA the Cowboy approach!

* In-App Approval : New proposed solutions or extensions will go into status "Awaiting" approval when created by a Requester and a User with the role, Approver, needs to Review and Approve the solution in the application for it to be ready for deployment

* Workflow-Integration : Same as In-App Approval, but supported by SAP BTP Business Process Automation Workflow, allowing for fully configurable approval flows

### Technology Radar

To better control which technologies are currently applied via solutions & extensions in the Solution Central a Technology Radar is also included that allows the user to mature and monitor the technologies that needs to be maintained.
This also allows stronger control of deprecation of a technology and its impact on running solutions, supporting a controlled sunsetting or shifting to a newer technology

### Sunsetting & Shifting

Controlling depedencies and shifting technologies is critical when planning to sunset a solution or extension or equally if it needs to be shifted to a new solution, tracking what will potentially be affected and planning mitigating actions.
Solution Central allows you to capture this and manage these scenarios in a controlled manner.

## Roadmap

There is still a lot of baseline features planned for the Core Solution, but the main focus is automating and integrating the different platforms, including SAP S/4HANA (various versions) and SAP BTP.
The first thing on the list though is the deployment descriptors that are currently being tested and will be made available soon.

The main features planned are:
- Listing Packages from SAP S/4HANA (via the ADT services)
- Listing Namespaces from SAP BTP Cloud Foundry
- Creation of Packages from Solution Central in SAP S/4HANA (various version - via the ADT services)
- Integration to Pull Request in the GitFlow for Changes

Plus fixes - See the [open issues](https://github.com/gavdilabs/solutioncentral/issues) for a full list of proposed features (and known issues).

## Contributing

Any contributions to the project are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request and do your changes by following our required procedure (allowing us to manage the incoming work):
1. Bring your idea to a fix or a feature, or find one in the Issue Tracker!
2. Fork the repository and Create your Feature Branch, name it feature|fix-name of fix or feature with spaces as underscore-month-year - e.g. feature-de_translation-02-2025 or fix-injection_issue_data_loader-08-2024. Notice: If you are implementing a fix from the issue tracker use the issue number as the name, prefixed by #, e.g. fix-#6403-10-2024
3. Implement your changes, ensuring that you keep the code, methods and comments short and to the point
4. Add and Update Unit Test (your code will not be approved without these)
5. Make sure that you clearly state what you are committing in your commit message (and rather commit often with clear messages than committing a large, complex mess)
6. Once you implemented the changes, tested the code, it quality and speed and verified that all unit tests are green do a Pull Request, where you title the Pull Request the Feature/Fix you implemented
7. Make requested changes if asked by the reviewer
8. Receive a huge thanks and eternal appreciation from the team when your contribution is merged (we might even throw in a trophy for best contribution down the line)!

Rules that needs to be respected:
- Don't include code or dependencies that violates or breaks either the code's licenses or the provided license of this solution
- Don't try to change the underlying foundation, infrastructure or base functionality of the solution without discussing and getting approval from the maintainers beforehand
- Stay constructive in feedback, contribution and collaboration!

### Coordination

All Issues and Feature Requests are done using the Issue Tracker on GitHub, so be sure to check there first. All Prioritization is done by the Core Team to ensure a strong focus on the core solution and its focus.
All Communication and coordination is done via Discord on https://discord.com/channels/1217814600205205504/1217814718077603861 .

## License

Distributed under the Apache-2 License

Copyright 2025 Gavdi A/S
