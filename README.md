# Gavdi Labs - Technology Transition Management 

This application is meant to help you get an overview of your SAP Technology-focused Software Solutions, including the maturity level and help you control and guide how you manage the cost around software solutions.

## Infrastructure Requirements

This solutions runs on SAP Cloud Application Programming (CAP) as a Node.JS-based solution, coupled with OpenUI5 for serving the UIs.
To deploy the solution you need the following:

Service | Description
--------------------------------------------|------------------------------------------------------------------------
SAP BTP - Cloud Foundry                     | SAP Business Technology Platform with a Cloud Foundry Subaccount
Cloud Foundry Runtime                       | Runtime for the Node.JS application (with Minimum 2 gb of Memory)
HTML5 Repo & Runtime                        | Service for hosting and running (as Webserver) the Frontend
PostgreSQL Database                         | Hyper-Scaler supplied Database for hosting the data of the application
SAP Business Process Automation Services    | For Managing the Workflows and Approvals

For detailed information on dependencies, check out the deployment descriptor.

## Applications

The solution includes 3 applications:
* Software Solution Cockpit : Allows you to register and manage the state and dependencies of your software solutions
* Technology Radar : Allows you to manage which Technologies you are currently using and what maturity state they are in
* Cloud Credit Control : Allows you to manage your spending and approval flows on SAP BTP