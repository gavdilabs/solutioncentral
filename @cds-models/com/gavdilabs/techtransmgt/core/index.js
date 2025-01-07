// This is an automatically generated file. Please do not change its contents manually!
const cds = require('@sap/cds')
const csn = cds.entities('com.gavdilabs.techtransmgt.core')
// SAPVersion
module.exports.SAPVersion = { is_singular: true, __proto__: csn.SAPVersion }
module.exports.SAPVersion_ = csn.SAPVersion
// CleanCoreLevel
module.exports.CleanCoreLevel = { is_singular: true, __proto__: csn.CleanCoreLevel }
module.exports.CleanCoreLevel_ = csn.CleanCoreLevel
// CodeQualityLevel
module.exports.CodeQualityLevel = { is_singular: true, __proto__: csn.CodeQualityLevel }
module.exports.CodeQualityLevel_ = csn.CodeQualityLevel
// TechnologyStatus
module.exports.TechnologyStatu = { is_singular: true, __proto__: csn.TechnologyStatus }
module.exports.TechnologyStatus = csn.TechnologyStatus
// BusinessCriticalityLevel
module.exports.BusinessCriticalityLevel = { is_singular: true, __proto__: csn.BusinessCriticalityLevel }
module.exports.BusinessCriticalityLevel_ = csn.BusinessCriticalityLevel
// User
module.exports.User = { is_singular: true, __proto__: csn.User }
module.exports.User_ = csn.User
// SoftwareSolution
module.exports.SoftwareSolution = { is_singular: true, __proto__: csn.SoftwareSolution }
module.exports.SoftwareSolution_ = csn.SoftwareSolution
// SoftwareTeam
module.exports.SoftwareTeam = { is_singular: true, __proto__: csn.SoftwareTeam }
module.exports.SoftwareTeam_ = csn.SoftwareTeam
// SoftwareTeamUser
module.exports.SoftwareTeamUser = { is_singular: true, __proto__: csn.SoftwareTeamUser }
module.exports.SoftwareTeamUser_ = csn.SoftwareTeamUser
// SoftwareDependency
module.exports.SoftwareDependency = { is_singular: true, __proto__: csn.SoftwareDependency }
module.exports.SoftwareDependency_ = csn.SoftwareDependency
// SoftwareTechnology
module.exports.SoftwareTechnology = { is_singular: true, __proto__: csn.SoftwareTechnology }
module.exports.SoftwareTechnology_ = csn.SoftwareTechnology
// Technology
module.exports.Technology = { is_singular: true, __proto__: csn.Technology }
module.exports.Technology_ = csn.Technology
// TechnologyReplacement
module.exports.TechnologyReplacement = { is_singular: true, __proto__: csn.TechnologyReplacement }
module.exports.TechnologyReplacement_ = csn.TechnologyReplacement
// CompanyConfiguration
module.exports.CompanyConfiguration = { is_singular: true, __proto__: csn.CompanyConfiguration }
module.exports.CompanyConfiguration_ = csn.CompanyConfiguration
// events
// actions
// enums
module.exports.softwareStatus ??= { Development: "Development", Testing: "Testing", Released: "Released", Archived: "Archived" }
module.exports.softwareDependencyType ??= { Consuming: "Consuming", Embedding: "Embedding", Associating: "Associating" }
module.exports.technologyType ??= { ABAP: "ABAP", ABAP_Cloud: "ABAP_Cloud", CAP: "CAP" }
module.exports.criticalityLevel ??= { Very_High: "Very_High", High: "High", Medium: "Medium", Low: "Low" }
module.exports.deploymentTypes ??= { OnPremise: "OnPremise", Cloud: "Cloud" }
