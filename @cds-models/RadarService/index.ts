// This is an automatically generated file. Please do not change its contents manually!
import cds from '@sap/cds'
import * as __ from './../_';
import * as _ from './..';
import * as _com_gavdilabs_techtransmgt_core from './../com/gavdilabs/techtransmgt/core';
import * as _com_gavdilabs_techtransmgt_types from './../com/gavdilabs/techtransmgt/types';
import * as _sap_common from './../sap/common';

export class RadarService extends cds.Service {
  /** FUNCTION IMPORTS */
  declare getActiveUser: typeof getActiveUser
}
export default RadarService

export function _UserAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class User extends Base {
    declare username?: __.Key<string>
    declare email?: string | null
    declare firstName?: string | null
    declare lastName?: string | null
    declare fullName?: string | null
    declare imageUrl?: string | null
    declare imageType?: string | null
    declare softwareTeams?: __.Association.to.many<SoftwareTeamUser_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<User>;
    declare static readonly elements: __.ElementsOf<User>;
    declare static readonly actions: Record<never, never>;
  };
}
/** ENTITIES */
export class User extends _UserAspect(__.Entity) {}
Object.defineProperty(User, 'name', { value: 'RadarService.User' })
Object.defineProperty(User, 'is_singular', { value: true })
/** ENTITIES */
export class User_ extends Array<User> {$count?: number}
Object.defineProperty(User_, 'name', { value: 'RadarService.User' })

export function _SoftwareSolutionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareSolution extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare description?: string | null
    declare solutionStatus?: __.Association.to<SoftwareStatu> | null
    declare solutionStatus_code?: __.Key<number> | null
    declare platform?: __.Association.to<Platform> | null
    declare platform_code?: __.Key<_com_gavdilabs_techtransmgt_core.platformType> | null
    declare packageNamespace?: string | null
    declare repository?: string | null
    declare documentationUrl?: string | null
    declare sapVersion?: __.Association.to<SAPVersion> | null
    declare sapVersion_code?: __.Key<string> | null
    declare businessCriticality?: __.Association.to<BusinessCriticalityLevel> | null
    declare businessCriticality_code?: __.Key<_com_gavdilabs_techtransmgt_core.criticalityLevel> | null
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
    declare Technologies?: __.Composition.of.many<SoftwareTechnology_>
    declare Dependents?: __.Composition.of.many<__.DeepRequired<RadarService.SoftwareSolution>['Dependents']>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareSolution>;
    declare static readonly elements: __.ElementsOf<SoftwareSolution>;
    declare static readonly actions: Record<never, never>;
  };
}
/** Individual field controls */
export class SoftwareSolution extends _SoftwareSolutionAspect(__.Entity) {static drafts: __.DraftOf<SoftwareSolution>}
Object.defineProperty(SoftwareSolution, 'name', { value: 'RadarService.SoftwareSolution' })
Object.defineProperty(SoftwareSolution, 'is_singular', { value: true })
/** Individual field controls */
export class SoftwareSolution_ extends Array<SoftwareSolution> {static drafts: __.DraftsOf<SoftwareSolution>
$count?: number}
Object.defineProperty(SoftwareSolution_, 'name', { value: 'RadarService.SoftwareSolution' })

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
Object.defineProperty(SoftwareTeam, 'name', { value: 'RadarService.SoftwareTeam' })
Object.defineProperty(SoftwareTeam, 'is_singular', { value: true })
export class SoftwareTeam_ extends Array<SoftwareTeam> {$count?: number}
Object.defineProperty(SoftwareTeam_, 'name', { value: 'RadarService.SoftwareTeam' })

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
Object.defineProperty(SoftwareTeamUser, 'name', { value: 'RadarService.SoftwareTeamUser' })
Object.defineProperty(SoftwareTeamUser, 'is_singular', { value: true })
export class SoftwareTeamUser_ extends Array<SoftwareTeamUser> {$count?: number}
Object.defineProperty(SoftwareTeamUser_, 'name', { value: 'RadarService.SoftwareTeamUser' })

export function _TechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Technology extends Base {
    declare ID?: __.Key<string>
    declare name?: string | null
    declare description?: string | null
    declare maturityStatus?: __.Association.to<TechnologyStatu> | null
    declare maturityStatus_code?: __.Key<number> | null
    declare maturityLevel?: number | null
    declare group?: __.Association.to<TechnologyGroup> | null
    declare group_code?: __.Key<number> | null
    declare _replacements?: __.Association.to.many<TechnologyReplacement_>
    declare Solutions?: __.Composition.of.many<SoftwareTechnology_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Technology>;
    declare static readonly elements: __.ElementsOf<Technology>;
    declare static readonly actions: Record<never, never>;
  };
}
/**
* Aspect for entities with canonical universal IDs
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-cuid
*/
export class Technology extends _TechnologyAspect(__.Entity) {}
Object.defineProperty(Technology, 'name', { value: 'RadarService.Technology' })
Object.defineProperty(Technology, 'is_singular', { value: true })
export class Technology_ extends Array<Technology> {$count?: number}
Object.defineProperty(Technology_, 'name', { value: 'RadarService.Technology' })

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
Object.defineProperty(TechnologyReplacement, 'name', { value: 'RadarService.TechnologyReplacement' })
Object.defineProperty(TechnologyReplacement, 'is_singular', { value: true })
export class TechnologyReplacement_ extends Array<TechnologyReplacement> {$count?: number}
Object.defineProperty(TechnologyReplacement_, 'name', { value: 'RadarService.TechnologyReplacement' })

export function _CompanyConfigurationAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CompanyConfiguration extends Base {
    declare ID?: __.Key<string>
    declare currentSAPVersion?: __.Association.to<SAPVersion> | null
    declare currentSAPVersion_code?: __.Key<string> | null
    declare expectedMinimalCleanCoreValue?: __.Association.to<CleanCoreLevel> | null
    declare expectedMinimalCleanCoreValue_code?: __.Key<number> | null
    declare approvalForNewSolutions?: boolean | null
    declare allowDeprecationWithoutReplacement?: boolean | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CompanyConfiguration>;
    declare static readonly elements: __.ElementsOf<CompanyConfiguration>;
    declare static readonly actions: Record<never, never>;
  };
}
/**
* Aspect for entities with canonical universal IDs
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-cuid
*/
export class CompanyConfiguration extends _CompanyConfigurationAspect(__.Entity) {}
Object.defineProperty(CompanyConfiguration, 'name', { value: 'RadarService.CompanyConfiguration' })
Object.defineProperty(CompanyConfiguration, 'is_singular', { value: true })
export class CompanyConfiguration_ extends Array<CompanyConfiguration> {$count?: number}
Object.defineProperty(CompanyConfiguration_, 'name', { value: 'RadarService.CompanyConfiguration' })

export function _TechnologyStatuAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyStatu extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyStatu>;
    declare static readonly elements: __.ElementsOf<TechnologyStatu>;
    declare static readonly actions: Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyStatu extends _TechnologyStatuAspect(__.Entity) {}
Object.defineProperty(TechnologyStatu, 'name', { value: 'RadarService.TechnologyStatus' })
Object.defineProperty(TechnologyStatu, 'is_singular', { value: true })
export class TechnologyStatus extends Array<TechnologyStatu> {$count?: number}
Object.defineProperty(TechnologyStatus, 'name', { value: 'RadarService.TechnologyStatus' })

export function _SAPVersionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SAPVersion extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<string>
    declare deployment?: _com_gavdilabs_techtransmgt_core.deploymentTypes | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SAPVersion>;
    declare static readonly elements: __.ElementsOf<SAPVersion>;
    declare static readonly actions: Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SAPVersion extends _SAPVersionAspect(__.Entity) {}
Object.defineProperty(SAPVersion, 'name', { value: 'RadarService.SAPVersion' })
Object.defineProperty(SAPVersion, 'is_singular', { value: true })
export class SAPVersion_ extends Array<SAPVersion> {$count?: number}
Object.defineProperty(SAPVersion_, 'name', { value: 'RadarService.SAPVersion' })

export function _CleanCoreLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CleanCoreLevel extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CleanCoreLevel>;
    declare static readonly elements: __.ElementsOf<CleanCoreLevel>;
    declare static readonly actions: Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CleanCoreLevel extends _CleanCoreLevelAspect(__.Entity) {}
Object.defineProperty(CleanCoreLevel, 'name', { value: 'RadarService.CleanCoreLevel' })
Object.defineProperty(CleanCoreLevel, 'is_singular', { value: true })
export class CleanCoreLevel_ extends Array<CleanCoreLevel> {$count?: number}
Object.defineProperty(CleanCoreLevel_, 'name', { value: 'RadarService.CleanCoreLevel' })

export function _CodeQualityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CodeQualityLevel extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CodeQualityLevel>;
    declare static readonly elements: __.ElementsOf<CodeQualityLevel>;
    declare static readonly actions: Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CodeQualityLevel extends _CodeQualityLevelAspect(__.Entity) {}
Object.defineProperty(CodeQualityLevel, 'name', { value: 'RadarService.CodeQualityLevel' })
Object.defineProperty(CodeQualityLevel, 'is_singular', { value: true })
export class CodeQualityLevel_ extends Array<CodeQualityLevel> {$count?: number}
Object.defineProperty(CodeQualityLevel_, 'name', { value: 'RadarService.CodeQualityLevel' })

export function _BusinessCriticalityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class BusinessCriticalityLevel extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<_com_gavdilabs_techtransmgt_core.criticalityLevel>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<BusinessCriticalityLevel>;
    declare static readonly elements: __.ElementsOf<BusinessCriticalityLevel>;
    declare static readonly actions: Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class BusinessCriticalityLevel extends _BusinessCriticalityLevelAspect(__.Entity) {}
Object.defineProperty(BusinessCriticalityLevel, 'name', { value: 'RadarService.BusinessCriticalityLevel' })
Object.defineProperty(BusinessCriticalityLevel, 'is_singular', { value: true })
export class BusinessCriticalityLevel_ extends Array<BusinessCriticalityLevel> {$count?: number}
Object.defineProperty(BusinessCriticalityLevel_, 'name', { value: 'RadarService.BusinessCriticalityLevel' })

export function _SoftwareTechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTechnology extends Base {
    declare ID?: __.Key<string>
    declare software?: __.Association.to<SoftwareSolution> | null
    declare software_ID?: __.Key<string> | null
    declare technology?: __.Association.to<Technology> | null
    declare technology_ID?: __.Key<string> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTechnology>;
    declare static readonly elements: __.ElementsOf<SoftwareTechnology>;
    declare static readonly actions: Record<never, never>;
  };
}
/** Sub table Technologies */
export class SoftwareTechnology extends _SoftwareTechnologyAspect(__.Entity) {static drafts: __.DraftOf<SoftwareTechnology>}
Object.defineProperty(SoftwareTechnology, 'name', { value: 'RadarService.SoftwareTechnology' })
Object.defineProperty(SoftwareTechnology, 'is_singular', { value: true })
/** Sub table Technologies */
export class SoftwareTechnology_ extends Array<SoftwareTechnology> {static drafts: __.DraftsOf<SoftwareTechnology>
$count?: number}
Object.defineProperty(SoftwareTechnology_, 'name', { value: 'RadarService.SoftwareTechnology' })

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

export function _PlatformAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Platform extends _sap_common._CodeListAspect(Base) {
    declare descr?: string | null
    declare code?: __.Key<_com_gavdilabs_techtransmgt_core.platformType>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Platform>;
    declare static readonly elements: __.ElementsOf<Platform>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class Platform extends _PlatformAspect(__.Entity) {}
Object.defineProperty(Platform, 'name', { value: 'com.gavdilabs.techtransmgt.core.Platform' })
Object.defineProperty(Platform, 'is_singular', { value: true })
export class Platform_ extends Array<Platform> {$count?: number}
Object.defineProperty(Platform_, 'name', { value: 'com.gavdilabs.techtransmgt.core.Platform' })

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

export function _DependencyTypeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class DependencyType extends _sap_common._CodeListAspect(Base) {
    declare code?: __.Key<_com_gavdilabs_techtransmgt_core.softwareDependencyType>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<DependencyType>;
    declare static readonly elements: __.ElementsOf<DependencyType>;
    declare static readonly actions: typeof _sap_common.CodeList.actions & Record<never, never>;
  };
}
export class DependencyType extends _DependencyTypeAspect(__.Entity) {}
Object.defineProperty(DependencyType, 'name', { value: 'com.gavdilabs.techtransmgt.core.DependencyType' })
Object.defineProperty(DependencyType, 'is_singular', { value: true })
export class DependencyType_ extends Array<DependencyType> {$count?: number}
Object.defineProperty(DependencyType_, 'name', { value: 'com.gavdilabs.techtransmgt.core.DependencyType' })

/** FUNCTION IMPORTS */
export declare const getActiveUser:  {
  // positional
  /** FUNCTION IMPORTS */
(): Promise<_com_gavdilabs_techtransmgt_types.ActiveUser | null> | _com_gavdilabs_techtransmgt_types.ActiveUser | null
  // named
  /** FUNCTION IMPORTS */
({}: Record<never, never>): Promise<_com_gavdilabs_techtransmgt_types.ActiveUser | null> | _com_gavdilabs_techtransmgt_types.ActiveUser | null
  // metadata (do not use)
  __parameters: Record<never, never>, __returns: Promise<_com_gavdilabs_techtransmgt_types.ActiveUser | null> | _com_gavdilabs_techtransmgt_types.ActiveUser | null
  kind: 'function'
}
export namespace SoftwareSolution {
  export function _DependentAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class Dependent extends Base {
      declare up_?: __.Key<__.Association.to<_com_gavdilabs_techtransmgt_core.SoftwareSolution>>
      declare up__ID?: __.Key<string>
      declare ID?: __.Key<string>
      declare dependentSoftwareSolution?: __.Association.to<_com_gavdilabs_techtransmgt_core.SoftwareSolution> | null
      declare dependentSoftwareSolution_ID?: __.Key<string> | null
      declare softwareType?: __.Association.to<_com_gavdilabs_techtransmgt_core.DependencyType> | null
      declare softwareType_code?: __.Key<_com_gavdilabs_techtransmgt_core.softwareDependencyType> | null
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<Dependent>;
      declare static readonly elements: __.ElementsOf<Dependent>;
      declare static readonly actions: Record<never, never>;
    };
  }
  export class Dependent extends _DependentAspect(__.Entity) {static drafts: __.DraftOf<Dependent>}
  Object.defineProperty(Dependent, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution.Dependents' })
  Object.defineProperty(Dependent, 'is_singular', { value: true })
  export class SoftwareSolution extends Array<Dependent> {static drafts: __.DraftsOf<Dependent>
$count?: number}
  Object.defineProperty(SoftwareSolution, 'name', { value: 'com.gavdilabs.techtransmgt.core.SoftwareSolution.Dependents' })
  
}