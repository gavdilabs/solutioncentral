// This is an automatically generated file. Please do not change its contents manually!
import * as _sap_common from './../../../../sap/common';
import * as __ from './../../../../_';
import * as _ from './../../../..';

// enum
export const softwareDependencyType = {
  Consuming: "Consuming",
  Embedding: "Embedding",
  Associating: "Associating",
} as const;
export type softwareDependencyType = "Consuming" | "Embedding" | "Associating"

// enum
export const platformType = {
  ABAP: "ABAP",
  ABAP_Cloud: "ABAP_Cloud",
  CAP: "CAP",
  OnPrem: "OnPrem",
} as const;
export type platformType = "ABAP" | "ABAP_Cloud" | "CAP" | "OnPrem"

// enum
export const criticalityLevel = {
  Very_High: "Very_High",
  High: "High",
  Medium: "Medium",
  Low: "Low",
} as const;
export type criticalityLevel = "Very_High" | "High" | "Medium" | "Low"

// enum
export const deploymentTypes = {
  OnPremise: "OnPremise",
  Cloud: "Cloud",
} as const;
export type deploymentTypes = "OnPremise" | "Cloud"

export function _SoftwareStatuAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareStatu extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<number>
    declare criticalityLevel?: number | null
    declare texts?: __.Composition.of.many<SoftwareStatus.texts>
    declare localized?: __.Association.to<SoftwareStatus.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareStatu>;
    declare static readonly elements: __.ElementsOf<SoftwareStatu>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SoftwareStatu extends _SoftwareStatuAspect(__.Entity) {}
Object.defineProperty(SoftwareStatu, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareStatus' })
Object.defineProperty(SoftwareStatu, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SoftwareStatus extends Array<SoftwareStatu> {$count?: number}
Object.defineProperty(SoftwareStatus, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareStatus' })

export function _ApprovalFlowAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ApprovalFlow extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<ApprovalFlow.texts>
    declare localized?: __.Association.to<ApprovalFlow.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ApprovalFlow>;
    declare static readonly elements: __.ElementsOf<ApprovalFlow>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class ApprovalFlow extends _ApprovalFlowAspect(__.Entity) {}
Object.defineProperty(ApprovalFlow, 'name', { value: 'com.gavdilabs.techtransmgt.core.ApprovalFlow' })
Object.defineProperty(ApprovalFlow, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class ApprovalFlow_ extends Array<ApprovalFlow> {$count?: number}
Object.defineProperty(ApprovalFlow_, 'name', { value: 'com.gavdilabs.techtransmgt.core.ApprovalFlow' })

export function _SAPVersionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SAPVersion extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<string>
    declare deployment?: deploymentTypes | null
    declare texts?: __.Composition.of.many<SAPVersion.texts>
    declare localized?: __.Association.to<SAPVersion.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SAPVersion>;
    declare static readonly elements: __.ElementsOf<SAPVersion>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SAPVersion extends _SAPVersionAspect(__.Entity) {}
Object.defineProperty(SAPVersion, 'name', { value: 'com.gavdilabs.techtransmgt.core.SAPVersion' })
Object.defineProperty(SAPVersion, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SAPVersion_ extends Array<SAPVersion> {$count?: number}
Object.defineProperty(SAPVersion_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SAPVersion' })

export function _CleanCoreLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CleanCoreLevel extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<CleanCoreLevel.texts>
    declare localized?: __.Association.to<CleanCoreLevel.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CleanCoreLevel>;
    declare static readonly elements: __.ElementsOf<CleanCoreLevel>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CleanCoreLevel extends _CleanCoreLevelAspect(__.Entity) {}
Object.defineProperty(CleanCoreLevel, 'name', { value: 'com.gavdilabs.techtransmgt.core.CleanCoreLevel' })
Object.defineProperty(CleanCoreLevel, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CleanCoreLevel_ extends Array<CleanCoreLevel> {$count?: number}
Object.defineProperty(CleanCoreLevel_, 'name', { value: 'com.gavdilabs.techtransmgt.core.CleanCoreLevel' })

export function _CodeQualityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CodeQualityLevel extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<CodeQualityLevel.texts>
    declare localized?: __.Association.to<CodeQualityLevel.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CodeQualityLevel>;
    declare static readonly elements: __.ElementsOf<CodeQualityLevel>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CodeQualityLevel extends _CodeQualityLevelAspect(__.Entity) {}
Object.defineProperty(CodeQualityLevel, 'name', { value: 'com.gavdilabs.techtransmgt.core.CodeQualityLevel' })
Object.defineProperty(CodeQualityLevel, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CodeQualityLevel_ extends Array<CodeQualityLevel> {$count?: number}
Object.defineProperty(CodeQualityLevel_, 'name', { value: 'com.gavdilabs.techtransmgt.core.CodeQualityLevel' })

export function _TechnologyStatuAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyStatu extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<TechnologyStatus.texts>
    declare localized?: __.Association.to<TechnologyStatus.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyStatu>;
    declare static readonly elements: __.ElementsOf<TechnologyStatu>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyStatu extends _TechnologyStatuAspect(__.Entity) {}
Object.defineProperty(TechnologyStatu, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyStatus' })
Object.defineProperty(TechnologyStatu, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyStatus extends Array<TechnologyStatu> {$count?: number}
Object.defineProperty(TechnologyStatus, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyStatus' })

export function _TechnologyGroupAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyGroup extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<TechnologyGroup.texts>
    declare localized?: __.Association.to<TechnologyGroup.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyGroup>;
    declare static readonly elements: __.ElementsOf<TechnologyGroup>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyGroup extends _TechnologyGroupAspect(__.Entity) {}
Object.defineProperty(TechnologyGroup, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyGroup' })
Object.defineProperty(TechnologyGroup, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyGroup_ extends Array<TechnologyGroup> {$count?: number}
Object.defineProperty(TechnologyGroup_, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyGroup' })

export function _BusinessCriticalityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class BusinessCriticalityLevel extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<criticalityLevel>
    declare texts?: __.Composition.of.many<BusinessCriticalityLevel.texts>
    declare localized?: __.Association.to<BusinessCriticalityLevel.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<BusinessCriticalityLevel>;
    declare static readonly elements: __.ElementsOf<BusinessCriticalityLevel>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class BusinessCriticalityLevel extends _BusinessCriticalityLevelAspect(__.Entity) {}
Object.defineProperty(BusinessCriticalityLevel, 'name', { value: 'com.gavdilabs.techtransmgt.core.BusinessCriticalityLevel' })
Object.defineProperty(BusinessCriticalityLevel, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class BusinessCriticalityLevel_ extends Array<BusinessCriticalityLevel> {$count?: number}
Object.defineProperty(BusinessCriticalityLevel_, 'name', { value: 'com.gavdilabs.techtransmgt.core.BusinessCriticalityLevel' })

export function _PlatformAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Platform extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<platformType>
    declare texts?: __.Composition.of.many<Platform.texts>
    declare localized?: __.Association.to<Platform.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Platform>;
    declare static readonly elements: __.ElementsOf<Platform>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Platform extends _PlatformAspect(__.Entity) {}
Object.defineProperty(Platform, 'name', { value: 'com.gavdilabs.techtransmgt.core.Platform' })
Object.defineProperty(Platform, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Platform_ extends Array<Platform> {$count?: number}
Object.defineProperty(Platform_, 'name', { value: 'com.gavdilabs.techtransmgt.core.Platform' })

export function _DependencyTypeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class DependencyType extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<softwareDependencyType>
    declare texts?: __.Composition.of.many<DependencyType.texts>
    declare localized?: __.Association.to<DependencyType.text> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<DependencyType>;
    declare static readonly elements: __.ElementsOf<DependencyType>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class DependencyType extends _DependencyTypeAspect(__.Entity) {}
Object.defineProperty(DependencyType, 'name', { value: 'com.gavdilabs.techtransmgt.core.DependencyType' })
Object.defineProperty(DependencyType, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class DependencyType_ extends Array<DependencyType> {$count?: number}
Object.defineProperty(DependencyType_, 'name', { value: 'com.gavdilabs.techtransmgt.core.DependencyType' })

export function _UserAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class User extends _._managedAspect(Base) {
    declare username?: __.Key<string>
    declare email?: string | null
    declare firstName?: string | null
    declare lastName?: string | null
    declare fullName?: string | null
    declare imageUrl?: string | null
    declare imageType?: string | null
    declare approver?: boolean | null
    declare softwareTeams?: __.Association.to.many<SoftwareTeamUser_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<User>;
    declare static readonly elements: __.ElementsOf<User>;
    declare static readonly actions: typeof _.managed.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class User extends _UserAspect(__.Entity) {}
Object.defineProperty(User, 'name', { value: 'com.gavdilabs.techtransmgt.core.User' })
Object.defineProperty(User, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class User_ extends Array<User> {$count?: number}
Object.defineProperty(User_, 'name', { value: 'com.gavdilabs.techtransmgt.core.User' })

export function _SolutionVersionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SolutionVersion extends _._cuidAspect(_._managedAspect(Base)) {
    declare solution?: __.Key<__.Association.to<SoftwareSolution>>
    declare solution_ID?: __.Key<string>
    declare status?: __.Association.to<SoftwareStatu> | null
    declare status_code?: number | null
    declare version?: string | null
    declare releaseNotes?: import("stream").Readable | null
    declare mediaType?: string | null
    declare releaseDate?: __.CdsDate | null
    declare sapVersion?: __.Association.to<SAPVersion> | null
    declare sapVersion_code?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SolutionVersion> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<SolutionVersion>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SolutionVersion extends _SolutionVersionAspect(__.Entity) {}
Object.defineProperty(SolutionVersion, 'name', { value: 'com.gavdilabs.techtransmgt.core.SolutionVersion' })
Object.defineProperty(SolutionVersion, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SolutionVersion_ extends Array<SolutionVersion> {$count?: number}
Object.defineProperty(SolutionVersion_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SolutionVersion' })

export function _SoftwareSolutionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareSolution extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare description?: string | null
    declare solutionStatus?: __.Association.to<SoftwareStatu> | null
    declare solutionStatus_code?: number | null
    declare platform?: __.Association.to<Platform> | null
    declare platform_code?: platformType | null
    declare packageNamespace?: string | null
    declare repository?: string | null
    declare documentationUrl?: string | null
    declare businessCriticality?: __.Association.to<BusinessCriticalityLevel> | null
    declare businessCriticality_code?: criticalityLevel | null
    declare cleanCoreRating?: __.Association.to<CleanCoreLevel> | null
    declare cleanCoreRating_code?: number | null
    declare codeQualityRating?: __.Association.to<CodeQualityLevel> | null
    declare codeQualityRating_code?: number | null
    declare versions?: __.Association.to.many<SolutionVersion_>
    declare reasonNoCleanCore?: string | null
    declare costCenter?: string | null
    declare owner?: __.Association.to<User> | null
    declare owner_username?: string | null
    declare team?: __.Association.to<SoftwareTeam> | null
    declare team_teamName?: string | null
    declare Technologies?: __.Composition.of.many<SoftwareTechnology_>
    declare Dependents?: __.Composition.of.many<SoftwareSolution.Dependents>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareSolution> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<SoftwareSolution>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareSolution extends _SoftwareSolutionAspect(__.Entity) {}
Object.defineProperty(SoftwareSolution, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution' })
Object.defineProperty(SoftwareSolution, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareSolution_ extends Array<SoftwareSolution> {$count?: number}
Object.defineProperty(SoftwareSolution_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution' })

export function _SoftwareTeamAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTeam extends _._managedAspect(Base) {
    declare teamName?: __.Key<string>
    declare _owner?: __.Association.to<User> | null
    declare _owner_username?: string | null
    declare _maintainers?: __.Association.to.many<SoftwareTeamUser_>
    declare _reviewers?: __.Association.to.many<SoftwareTeamUser_>
    declare _teamUsers?: __.Association.to.many<SoftwareTeamUser_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTeam>;
    declare static readonly elements: __.ElementsOf<SoftwareTeam>;
    declare static readonly actions: typeof _.managed.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareTeam extends _SoftwareTeamAspect(__.Entity) {}
Object.defineProperty(SoftwareTeam, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeam' })
Object.defineProperty(SoftwareTeam, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareTeam_ extends Array<SoftwareTeam> {$count?: number}
Object.defineProperty(SoftwareTeam_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeam' })

export function _SoftwareTeamUserAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTeamUser extends Base {
    declare team?: __.Key<__.Association.to<SoftwareTeam>>
    declare team_teamName?: __.Key<string>
    declare user?: __.Key<__.Association.to<User>>
    declare user_username?: __.Key<string>
    declare reviewer?: boolean | null
    declare maintainer?: boolean | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTeamUser>;
    declare static readonly elements: __.ElementsOf<SoftwareTeamUser>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class SoftwareTeamUser extends _SoftwareTeamUserAspect(__.Entity) {}
Object.defineProperty(SoftwareTeamUser, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeamUser' })
Object.defineProperty(SoftwareTeamUser, 'is_singular', { value: true })
export class SoftwareTeamUser_ extends Array<SoftwareTeamUser> {$count?: number}
Object.defineProperty(SoftwareTeamUser_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeamUser' })

export function _SoftwareTechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTechnology extends _._cuidAspect(_._managedAspect(Base)) {
    declare version?: __.DeepRequired<SolutionVersion>['version'] | null
    declare software?: __.Association.to<SoftwareSolution> | null
    declare software_ID?: string | null
    declare technology?: __.Association.to<Technology> | null
    declare technology_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTechnology> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<SoftwareTechnology>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareTechnology extends _SoftwareTechnologyAspect(__.Entity) {}
Object.defineProperty(SoftwareTechnology, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTechnology' })
Object.defineProperty(SoftwareTechnology, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareTechnology_ extends Array<SoftwareTechnology> {$count?: number}
Object.defineProperty(SoftwareTechnology_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTechnology' })

export function _TechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Technology extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare description?: string | null
    declare maturityStatus?: __.Association.to<TechnologyStatu> | null
    declare maturityStatus_code?: number | null
    declare maturityLevel?: number | null
    declare group?: __.Association.to<TechnologyGroup> | null
    declare group_code?: number | null
    declare _replacements?: __.Association.to.many<TechnologyReplacement_>
    declare Solutions?: __.Composition.of.many<SoftwareTechnology_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Technology> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Technology>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Technology extends _TechnologyAspect(__.Entity) {}
Object.defineProperty(Technology, 'name', { value: 'com.gavdilabs.techtransmgt.core.Technology' })
Object.defineProperty(Technology, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Technology_ extends Array<Technology> {$count?: number}
Object.defineProperty(Technology_, 'name', { value: 'com.gavdilabs.techtransmgt.core.Technology' })

export function _TechnologyReplacementAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyReplacement extends Base {
    declare source?: __.Key<string>
    declare target?: __.Key<string>
    declare _technology?: __.Association.to<Technology> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyReplacement>;
    declare static readonly elements: __.ElementsOf<TechnologyReplacement>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class TechnologyReplacement extends _TechnologyReplacementAspect(__.Entity) {}
Object.defineProperty(TechnologyReplacement, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyReplacement' })
Object.defineProperty(TechnologyReplacement, 'is_singular', { value: true })
export class TechnologyReplacement_ extends Array<TechnologyReplacement> {$count?: number}
Object.defineProperty(TechnologyReplacement_, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyReplacement' })

export function _CompanyConfigurationAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CompanyConfiguration extends _._cuidAspect(_._managedAspect(Base)) {
    declare currentSAPVersion?: __.Association.to<SAPVersion> | null
    declare currentSAPVersion_code?: string | null
    declare expectedMinimalCleanCoreValue?: __.Association.to<CleanCoreLevel> | null
    declare expectedMinimalCleanCoreValue_code?: number | null
    declare approvalFlow?: __.Association.to<ApprovalFlow> | null
    declare approvalFlow_code?: number | null
    declare allowDeprecationWithoutReplacement?: boolean | null
    declare bpaEnabled?: boolean | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CompanyConfiguration> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<CompanyConfiguration>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class CompanyConfiguration extends _CompanyConfigurationAspect(__.Entity) {}
Object.defineProperty(CompanyConfiguration, 'name', { value: 'com.gavdilabs.techtransmgt.core.CompanyConfiguration' })
Object.defineProperty(CompanyConfiguration, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class CompanyConfiguration_ extends Array<CompanyConfiguration> {$count?: number}
Object.defineProperty(CompanyConfiguration_, 'name', { value: 'com.gavdilabs.techtransmgt.core.CompanyConfiguration' })

export namespace SoftwareStatus {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare code?: __.Key<number>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareStatus.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareStatus.texts' })
  
}
export namespace ApprovalFlow {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare descr?: string | null
      declare code?: __.Key<number>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.ApprovalFlow.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.ApprovalFlow.texts' })
  
}
export namespace SAPVersion {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare descr?: string | null
      declare code?: __.Key<string>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.SAPVersion.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.SAPVersion.texts' })
  
}
export namespace CleanCoreLevel {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare code?: __.Key<number>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.CleanCoreLevel.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.CleanCoreLevel.texts' })
  
}
export namespace CodeQualityLevel {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare code?: __.Key<number>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.CodeQualityLevel.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.CodeQualityLevel.texts' })
  
}
export namespace TechnologyStatus {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare code?: __.Key<number>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyStatus.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyStatus.texts' })
  
}
export namespace TechnologyGroup {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare code?: __.Key<number>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyGroup.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyGroup.texts' })
  
}
export namespace BusinessCriticalityLevel {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare code?: __.Key<criticalityLevel>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.BusinessCriticalityLevel.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.BusinessCriticalityLevel.texts' })
  
}
export namespace Platform {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare code?: __.Key<platformType>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.Platform.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.Platform.texts' })
  
}
export namespace DependencyType {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends _sap_common._TextsAspectAspect(Base) {
      declare name?: string | null
      declare descr?: string | null
      declare code?: __.Key<softwareDependencyType>
      static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text> & typeof _sap_common.TextsAspect.keys;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: typeof _sap_common.TextsAspect.actions & globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'com.gavdilabs.techtransmgt.core.DependencyType.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'com.gavdilabs.techtransmgt.core.DependencyType.texts' })
  
}
export namespace SoftwareSolution {
  export function _DependentAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class Dependent extends Base {
      declare up_?: __.Key<__.Association.to<SoftwareSolution>>
      declare up__ID?: __.Key<string>
      declare ID?: __.Key<string>
      declare dependentSoftwareSolution?: __.Association.to<SoftwareSolution> | null
      declare dependentSoftwareSolution_ID?: string | null
      declare softwareType?: __.Association.to<DependencyType> | null
      declare softwareType_code?: softwareDependencyType | null
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<Dependent>;
      declare static readonly elements: __.ElementsOf<Dependent>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class Dependent extends _DependentAspect(__.Entity) {}
  Object.defineProperty(Dependent, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution.Dependents' })
  Object.defineProperty(Dependent, 'is_singular', { value: true })
  export class Dependents extends Array<Dependent> {$count?: number}
  Object.defineProperty(Dependents, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution.Dependents' })
  
}