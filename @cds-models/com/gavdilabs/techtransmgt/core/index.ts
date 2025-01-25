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
export const technologyType = {
  ABAP: "ABAP",
  ABAP_Cloud: "ABAP_Cloud",
  CAP: "CAP",
} as const;
export type technologyType = "ABAP" | "ABAP_Cloud" | "CAP"

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
    declare descr?: string | null
    declare code?: __.Key<number>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareStatu>;
    declare static readonly elements: __.ElementsOf<SoftwareStatu>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class SoftwareStatu extends _SoftwareStatuAspect(__.Entity) {}
Object.defineProperty(SoftwareStatu, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareStatus' })
Object.defineProperty(SoftwareStatu, 'is_singular', { value: true })
export class SoftwareStatus extends Array<SoftwareStatu> {$count?: number}
Object.defineProperty(SoftwareStatus, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareStatus' })

export function _SAPVersionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SAPVersion extends _sap_common._CodeListAspect(Base) {
    declare name?: string | null
    declare code?: __.Key<string>
    declare deployment?: deploymentTypes | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SAPVersion>;
    declare static readonly elements: __.ElementsOf<SAPVersion>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class SAPVersion extends _SAPVersionAspect(__.Entity) {}
Object.defineProperty(SAPVersion, 'name', { value: 'com.gavdilabs.techtransmgt.core.SAPVersion' })
Object.defineProperty(SAPVersion, 'is_singular', { value: true })
export class SAPVersion_ extends Array<SAPVersion> {$count?: number}
Object.defineProperty(SAPVersion_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SAPVersion' })

export function _CleanCoreLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CleanCoreLevel extends _sap_common._CodeListAspect(Base) {
    declare descr?: string | null
    declare code?: __.Key<number>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CleanCoreLevel>;
    declare static readonly elements: __.ElementsOf<CleanCoreLevel>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class CleanCoreLevel extends _CleanCoreLevelAspect(__.Entity) {}
Object.defineProperty(CleanCoreLevel, 'name', { value: 'com.gavdilabs.techtransmgt.core.CleanCoreLevel' })
Object.defineProperty(CleanCoreLevel, 'is_singular', { value: true })
export class CleanCoreLevel_ extends Array<CleanCoreLevel> {$count?: number}
Object.defineProperty(CleanCoreLevel_, 'name', { value: 'com.gavdilabs.techtransmgt.core.CleanCoreLevel' })

export function _CodeQualityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CodeQualityLevel extends _sap_common._CodeListAspect(Base) {
    declare descr?: string | null
    declare code?: __.Key<number>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CodeQualityLevel>;
    declare static readonly elements: __.ElementsOf<CodeQualityLevel>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class CodeQualityLevel extends _CodeQualityLevelAspect(__.Entity) {}
Object.defineProperty(CodeQualityLevel, 'name', { value: 'com.gavdilabs.techtransmgt.core.CodeQualityLevel' })
Object.defineProperty(CodeQualityLevel, 'is_singular', { value: true })
export class CodeQualityLevel_ extends Array<CodeQualityLevel> {$count?: number}
Object.defineProperty(CodeQualityLevel_, 'name', { value: 'com.gavdilabs.techtransmgt.core.CodeQualityLevel' })

export function _TechnologyStatuAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyStatu extends _sap_common._CodeListAspect(Base) {
    declare descr?: string | null
    declare code?: __.Key<number>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyStatu>;
    declare static readonly elements: __.ElementsOf<TechnologyStatu>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class TechnologyStatu extends _TechnologyStatuAspect(__.Entity) {}
Object.defineProperty(TechnologyStatu, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyStatus' })
Object.defineProperty(TechnologyStatu, 'is_singular', { value: true })
export class TechnologyStatus extends Array<TechnologyStatu> {$count?: number}
Object.defineProperty(TechnologyStatus, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyStatus' })

export function _TechnologyGroupAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyGroup extends _sap_common._CodeListAspect(Base) {
    declare descr?: string | null
    declare code?: __.Key<number>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyGroup>;
    declare static readonly elements: __.ElementsOf<TechnologyGroup>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class TechnologyGroup extends _TechnologyGroupAspect(__.Entity) {}
Object.defineProperty(TechnologyGroup, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyGroup' })
Object.defineProperty(TechnologyGroup, 'is_singular', { value: true })
export class TechnologyGroup_ extends Array<TechnologyGroup> {$count?: number}
Object.defineProperty(TechnologyGroup_, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyGroup' })

export function _BusinessCriticalityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class BusinessCriticalityLevel extends _sap_common._CodeListAspect(Base) {
    declare descr?: string | null
    declare code?: __.Key<criticalityLevel>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<BusinessCriticalityLevel>;
    declare static readonly elements: __.ElementsOf<BusinessCriticalityLevel>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class BusinessCriticalityLevel extends _BusinessCriticalityLevelAspect(__.Entity) {}
Object.defineProperty(BusinessCriticalityLevel, 'name', { value: 'com.gavdilabs.techtransmgt.core.BusinessCriticalityLevel' })
Object.defineProperty(BusinessCriticalityLevel, 'is_singular', { value: true })
export class BusinessCriticalityLevel_ extends Array<BusinessCriticalityLevel> {$count?: number}
Object.defineProperty(BusinessCriticalityLevel_, 'name', { value: 'com.gavdilabs.techtransmgt.core.BusinessCriticalityLevel' })

export function _UserAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class User extends Base {
    declare username?: __.Key<string>
    declare email?: string | null
    declare firstName?: string | null
    declare lastName?: string | null
    declare imageUrl?: string | null
    declare imageType?: string | null
    declare softwareTeams?: __.Association.to.many<SoftwareTeamUser_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<User>;
    declare static readonly elements: __.ElementsOf<User>;
    declare static readonly actions: Record<never, never>;
  };
}
export class User extends _UserAspect(__.Entity) {}
Object.defineProperty(User, 'name', { value: 'com.gavdilabs.techtransmgt.core.User' })
Object.defineProperty(User, 'is_singular', { value: true })
export class User_ extends Array<User> {$count?: number}
Object.defineProperty(User_, 'name', { value: 'com.gavdilabs.techtransmgt.core.User' })

export function _SoftwareSolutionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareSolution extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare description?: string | null
    declare solutionStatus?: __.Association.to<SoftwareStatu> | null
    declare solutionStatus_code?: __.Key<number> | null
    declare technologyType?: technologyType | null
    declare packageNamespace?: string | null
    declare repository?: string | null
    declare documentationUrl?: string | null
    declare sapVersion?: __.Association.to<SAPVersion> | null
    declare sapVersion_code?: __.Key<string> | null
    declare businessCriticality?: __.Association.to<BusinessCriticalityLevel> | null
    declare businessCriticality_code?: __.Key<criticalityLevel> | null
    declare cleanCoreRating?: __.Association.to<CleanCoreLevel> | null
    declare cleanCoreRating_code?: __.Key<number> | null
    declare codeQualityRating?: __.Association.to<CodeQualityLevel> | null
    declare codeQualityRating_code?: __.Key<number> | null
    declare reasonNoCleanCore?: string | null
    declare costCenter?: string | null
    declare owner?: __.Association.to<User> | null
    declare owner_username?: __.Key<string> | null
    declare team?: __.Association.to<SoftwareTeam> | null
    declare team_teamName?: __.Key<string> | null
    declare dependencies?: __.Association.to.many<SoftwareDependency_>
    declare dependents?: __.Association.to.many<SoftwareDependency_>
    declare Technologies?: __.Composition.of.many<SoftwareTechnology_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareSolution> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<SoftwareSolution>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & Record<never, never>;
  };
}
export class SoftwareSolution extends _SoftwareSolutionAspect(__.Entity) {}
Object.defineProperty(SoftwareSolution, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution' })
Object.defineProperty(SoftwareSolution, 'is_singular', { value: true })
export class SoftwareSolution_ extends Array<SoftwareSolution> {$count?: number}
Object.defineProperty(SoftwareSolution_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution' })

export function _SoftwareTeamAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTeam extends Base {
    declare teamName?: __.Key<string>
    declare _teamUsers?: __.Association.to.many<SoftwareTeamUser_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTeam>;
    declare static readonly elements: __.ElementsOf<SoftwareTeam>;
    declare static readonly actions: Record<never, never>;
  };
}
export class SoftwareTeam extends _SoftwareTeamAspect(__.Entity) {}
Object.defineProperty(SoftwareTeam, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeam' })
Object.defineProperty(SoftwareTeam, 'is_singular', { value: true })
export class SoftwareTeam_ extends Array<SoftwareTeam> {$count?: number}
Object.defineProperty(SoftwareTeam_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeam' })

export function _SoftwareTeamUserAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTeamUser extends Base {
    declare team?: __.Key<__.Association.to<SoftwareTeam>>
    declare team_teamName?: __.Key<string>
    declare user?: __.Key<__.Association.to<User>>
    declare user_username?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTeamUser>;
    declare static readonly elements: __.ElementsOf<SoftwareTeamUser>;
    declare static readonly actions: Record<never, never>;
  };
}
export class SoftwareTeamUser extends _SoftwareTeamUserAspect(__.Entity) {}
Object.defineProperty(SoftwareTeamUser, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeamUser' })
Object.defineProperty(SoftwareTeamUser, 'is_singular', { value: true })
export class SoftwareTeamUser_ extends Array<SoftwareTeamUser> {$count?: number}
Object.defineProperty(SoftwareTeamUser_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTeamUser' })

export function _SoftwareDependencyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareDependency extends Base {
    declare source?: __.Key<string>
    declare target?: __.Key<string>
    declare softwareType?: softwareDependencyType | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareDependency>;
    declare static readonly elements: __.ElementsOf<SoftwareDependency>;
    declare static readonly actions: Record<never, never>;
  };
}
export class SoftwareDependency extends _SoftwareDependencyAspect(__.Entity) {}
Object.defineProperty(SoftwareDependency, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareDependency' })
Object.defineProperty(SoftwareDependency, 'is_singular', { value: true })
export class SoftwareDependency_ extends Array<SoftwareDependency> {$count?: number}
Object.defineProperty(SoftwareDependency_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareDependency' })

export function _SoftwareTechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTechnology extends _._cuidAspect(Base) {
    declare software?: __.Association.to<SoftwareSolution> | null
    declare software_ID?: __.Key<string> | null
    declare technology?: __.Association.to<Technology> | null
    declare technology_ID?: __.Key<string> | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTechnology> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<SoftwareTechnology>;
    declare static readonly actions: typeof _.cuid.actions & Record<never, never>;
  };
}
export class SoftwareTechnology extends _SoftwareTechnologyAspect(__.Entity) {}
Object.defineProperty(SoftwareTechnology, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTechnology' })
Object.defineProperty(SoftwareTechnology, 'is_singular', { value: true })
export class SoftwareTechnology_ extends Array<SoftwareTechnology> {$count?: number}
Object.defineProperty(SoftwareTechnology_, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareTechnology' })

export function _TechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Technology extends _._cuidAspect(Base) {
    declare name?: string | null
    declare description?: string | null
    declare maturityStatus?: __.Association.to<TechnologyStatu> | null
    declare maturityStatus_code?: __.Key<number> | null
    declare maturityLevel?: number | null
    declare group?: __.Association.to<TechnologyGroup> | null
    declare group_code?: __.Key<number> | null
    declare _replacements?: __.Association.to.many<TechnologyReplacement_>
    declare Solutions?: __.Composition.of.many<SoftwareTechnology_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Technology> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Technology>;
    declare static readonly actions: typeof _.cuid.actions & Record<never, never>;
  };
}
export class Technology extends _TechnologyAspect(__.Entity) {}
Object.defineProperty(Technology, 'name', { value: 'com.gavdilabs.techtransmgt.core.Technology' })
Object.defineProperty(Technology, 'is_singular', { value: true })
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
    declare static readonly actions: Record<never, never>;
  };
}
export class TechnologyReplacement extends _TechnologyReplacementAspect(__.Entity) {}
Object.defineProperty(TechnologyReplacement, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyReplacement' })
Object.defineProperty(TechnologyReplacement, 'is_singular', { value: true })
export class TechnologyReplacement_ extends Array<TechnologyReplacement> {$count?: number}
Object.defineProperty(TechnologyReplacement_, 'name', { value: 'com.gavdilabs.techtransmgt.core.TechnologyReplacement' })

export function _CompanyConfigurationAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CompanyConfiguration extends _._cuidAspect(Base) {
    declare currentSAPVersion?: __.Association.to<SAPVersion> | null
    declare currentSAPVersion_code?: __.Key<string> | null
    declare expectedMinimalCleanCoreValue?: __.Association.to<CleanCoreLevel> | null
    declare expectedMinimalCleanCoreValue_code?: __.Key<number> | null
    declare approvalForNewSolutions?: boolean | null
    declare allowDeprecationWithoutReplacement?: boolean | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CompanyConfiguration> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<CompanyConfiguration>;
    declare static readonly actions: typeof _.cuid.actions & Record<never, never>;
  };
}
export class CompanyConfiguration extends _CompanyConfigurationAspect(__.Entity) {}
Object.defineProperty(CompanyConfiguration, 'name', { value: 'com.gavdilabs.techtransmgt.core.CompanyConfiguration' })
Object.defineProperty(CompanyConfiguration, 'is_singular', { value: true })
export class CompanyConfiguration_ extends Array<CompanyConfiguration> {$count?: number}
Object.defineProperty(CompanyConfiguration_, 'name', { value: 'com.gavdilabs.techtransmgt.core.CompanyConfiguration' })
