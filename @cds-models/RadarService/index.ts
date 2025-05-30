// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../_';
import * as _ from './..';
import * as _com_gavdilabs_techtransmgt_core from './../com/gavdilabs/techtransmgt/core';
import * as _com_gavdilabs_techtransmgt_types from './../com/gavdilabs/techtransmgt/types';
import * as _sap_common from './../sap/common';

export default class {
  /** FUNCTION IMPORTS */
  declare static readonly getActiveUser: typeof getActiveUser;
}

export function _UserAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class User extends Base {
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare username?: __.Key<string>
    declare email?: string | null
    declare firstName?: string | null
    declare lastName?: string | null
    declare fullName?: string | null
    declare imageUrl?: string | null
    declare imageType?: string | null
    declare approver?: boolean | null
    declare softwareTeams?: __.Association.to.many<SoftwareTeamUser_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<User>;
    declare static readonly elements: __.ElementsOf<User>;
    declare static readonly actions: globalThis.Record<never, never>;
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
    declare solutionStatus_code?: number | null
    declare platform?: __.Association.to<Platform> | null
    declare platform_code?: _com_gavdilabs_techtransmgt_core.platformType | null
    declare packageNamespace?: string | null
    declare repository?: string | null
    declare documentationUrl?: string | null
    declare businessCriticality?: __.Association.to<BusinessCriticalityLevel> | null
    declare businessCriticality_code?: _com_gavdilabs_techtransmgt_core.criticalityLevel | null
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
    declare isApprover?: boolean | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareSolution>;
    declare static readonly elements: __.ElementsOf<SoftwareSolution>;
    declare static readonly actions: {
      requestReview:  {
        // positional
        (description: string | null): any
        // named
        ({description}: {description?: string | null}): any
        // metadata (do not use)
        __parameters: {description?: string | null}, __returns: any
        kind: 'action'
      }
      requestSunset:  {
        // positional
        (description: string | null, sunsetDate: __.CdsDateTime | null): any
        // named
        ({description, sunsetDate}: {description?: string | null, sunsetDate?: __.CdsDateTime | null}): any
        // metadata (do not use)
        __parameters: {description?: string | null, sunsetDate?: __.CdsDateTime | null}, __returns: any
        kind: 'action'
      }
      approve:  {
        // positional
        (): any
        // named
        ({}: globalThis.Record<never, never>): any
        // metadata (do not use)
        __parameters: globalThis.Record<never, never>, __returns: any
        kind: 'action'
      }
      reject:  {
        // positional
        (): any
        // named
        ({}: globalThis.Record<never, never>): any
        // metadata (do not use)
        __parameters: globalThis.Record<never, never>, __returns: any
        kind: 'action'
      }
    };
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

export function _SolutionVersionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SolutionVersion extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
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
    declare isApprover?: boolean | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SolutionVersion>;
    declare static readonly elements: __.ElementsOf<SolutionVersion>;
    declare static readonly actions: {
      approve:  {
        // positional
        (): any
        // named
        ({}: globalThis.Record<never, never>): any
        // metadata (do not use)
        __parameters: globalThis.Record<never, never>, __returns: any
        kind: 'action'
      }
      reject:  {
        // positional
        (): any
        // named
        ({}: globalThis.Record<never, never>): any
        // metadata (do not use)
        __parameters: globalThis.Record<never, never>, __returns: any
        kind: 'action'
      }
    };
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SolutionVersion extends _SolutionVersionAspect(__.Entity) {}
Object.defineProperty(SolutionVersion, 'name', { value: 'RadarService.SolutionVersion' })
Object.defineProperty(SolutionVersion, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SolutionVersion_ extends Array<SolutionVersion> {$count?: number}
Object.defineProperty(SolutionVersion_, 'name', { value: 'RadarService.SolutionVersion' })

export function _SoftwareTeamAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTeam extends Base {
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare teamName?: __.Key<string>
    declare _owner?: __.Association.to<User> | null
    declare _owner_username?: string | null
    declare _maintainers?: __.Association.to.many<SoftwareTeamUser_>
    declare _reviewers?: __.Association.to.many<SoftwareTeamUser_>
    declare _teamUsers?: __.Association.to.many<SoftwareTeamUser_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTeam>;
    declare static readonly elements: __.ElementsOf<SoftwareTeam>;
    declare static readonly actions: {
      requestAccess:  {
        // positional
        (username: string | null): any
        // named
        ({username}: {username?: string | null}): any
        // metadata (do not use)
        __parameters: {username?: string | null}, __returns: any
        kind: 'action'
      }
      addMember:  {
        // positional
        (username: string | null): any
        // named
        ({username}: {username?: string | null}): any
        // metadata (do not use)
        __parameters: {username?: string | null}, __returns: any
        kind: 'action'
      }
      removeMember:  {
        // positional
        (username: string | null): any
        // named
        ({username}: {username?: string | null}): any
        // metadata (do not use)
        __parameters: {username?: string | null}, __returns: any
        kind: 'action'
      }
    };
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareTeam extends _SoftwareTeamAspect(__.Entity) {}
Object.defineProperty(SoftwareTeam, 'name', { value: 'RadarService.SoftwareTeam' })
Object.defineProperty(SoftwareTeam, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class SoftwareTeam_ extends Array<SoftwareTeam> {$count?: number}
Object.defineProperty(SoftwareTeam_, 'name', { value: 'RadarService.SoftwareTeam' })

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
Object.defineProperty(SoftwareTeamUser, 'name', { value: 'RadarService.SoftwareTeamUser' })
Object.defineProperty(SoftwareTeamUser, 'is_singular', { value: true })
export class SoftwareTeamUser_ extends Array<SoftwareTeamUser> {$count?: number}
Object.defineProperty(SoftwareTeamUser_, 'name', { value: 'RadarService.SoftwareTeamUser' })

export function _TechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Technology extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare description?: string | null
    declare maturityStatus?: __.Association.to<TechnologyStatu> | null
    declare maturityStatus_code?: number | null
    declare maturityLevel?: number | null
    declare group?: __.Association.to<TechnologyGroup> | null
    declare group_code?: number | null
    declare _replacements?: __.Association.to.many<TechnologyReplacement_>
    declare Solutions?: __.Composition.of.many<SoftwareTechnology_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Technology>;
    declare static readonly elements: __.ElementsOf<Technology>;
    declare static readonly actions: {
      requestSunset:  {
        // positional
        (description: string | null): any
        // named
        ({description}: {description?: string | null}): any
        // metadata (do not use)
        __parameters: {description?: string | null}, __returns: any
        kind: 'action'
      }
      requestChange:  {
        // positional
        (description: string | null): any
        // named
        ({description}: {description?: string | null}): any
        // metadata (do not use)
        __parameters: {description?: string | null}, __returns: any
        kind: 'action'
      }
    };
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class Technology extends _TechnologyAspect(__.Entity) {}
Object.defineProperty(Technology, 'name', { value: 'RadarService.Technology' })
Object.defineProperty(Technology, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
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
    declare static readonly actions: globalThis.Record<never, never>;
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
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare currentSAPVersion?: __.Association.to<SAPVersion> | null
    declare currentSAPVersion_code?: string | null
    declare expectedMinimalCleanCoreValue?: __.Association.to<CleanCoreLevel> | null
    declare expectedMinimalCleanCoreValue_code?: number | null
    declare approvalForNewSolutions?: boolean | null
    declare allowDeprecationWithoutReplacement?: boolean | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CompanyConfiguration>;
    declare static readonly elements: __.ElementsOf<CompanyConfiguration>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class CompanyConfiguration extends _CompanyConfigurationAspect(__.Entity) {}
Object.defineProperty(CompanyConfiguration, 'name', { value: 'RadarService.CompanyConfiguration' })
Object.defineProperty(CompanyConfiguration, 'is_singular', { value: true })
/**
* Aspect to capture changes by user and name
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-managed
*/
export class CompanyConfiguration_ extends Array<CompanyConfiguration> {$count?: number}
Object.defineProperty(CompanyConfiguration_, 'name', { value: 'RadarService.CompanyConfiguration' })

export function _TechnologyStatuAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyStatu extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<TechnologyStatus.texts>
    declare localized?: __.Association.to<TechnologyStatus.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyStatu>;
    declare static readonly elements: __.ElementsOf<TechnologyStatu>;
    declare static readonly actions: globalThis.Record<never, never>;
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
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyStatus extends Array<TechnologyStatu> {$count?: number}
Object.defineProperty(TechnologyStatus, 'name', { value: 'RadarService.TechnologyStatus' })

export function _SAPVersionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SAPVersion extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<string>
    declare deployment?: _com_gavdilabs_techtransmgt_core.deploymentTypes | null
    declare texts?: __.Composition.of.many<SAPVersion.texts>
    declare localized?: __.Association.to<SAPVersion.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SAPVersion>;
    declare static readonly elements: __.ElementsOf<SAPVersion>;
    declare static readonly actions: globalThis.Record<never, never>;
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
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SAPVersion_ extends Array<SAPVersion> {$count?: number}
Object.defineProperty(SAPVersion_, 'name', { value: 'RadarService.SAPVersion' })

export function _CleanCoreLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CleanCoreLevel extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<CleanCoreLevel.texts>
    declare localized?: __.Association.to<CleanCoreLevel.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CleanCoreLevel>;
    declare static readonly elements: __.ElementsOf<CleanCoreLevel>;
    declare static readonly actions: globalThis.Record<never, never>;
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
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CleanCoreLevel_ extends Array<CleanCoreLevel> {$count?: number}
Object.defineProperty(CleanCoreLevel_, 'name', { value: 'RadarService.CleanCoreLevel' })

export function _CodeQualityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CodeQualityLevel extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<CodeQualityLevel.texts>
    declare localized?: __.Association.to<CodeQualityLevel.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CodeQualityLevel>;
    declare static readonly elements: __.ElementsOf<CodeQualityLevel>;
    declare static readonly actions: globalThis.Record<never, never>;
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
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class CodeQualityLevel_ extends Array<CodeQualityLevel> {$count?: number}
Object.defineProperty(CodeQualityLevel_, 'name', { value: 'RadarService.CodeQualityLevel' })

export function _BusinessCriticalityLevelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class BusinessCriticalityLevel extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<_com_gavdilabs_techtransmgt_core.criticalityLevel>
    declare texts?: __.Composition.of.many<BusinessCriticalityLevel.texts>
    declare localized?: __.Association.to<BusinessCriticalityLevel.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<BusinessCriticalityLevel>;
    declare static readonly elements: __.ElementsOf<BusinessCriticalityLevel>;
    declare static readonly actions: globalThis.Record<never, never>;
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
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class BusinessCriticalityLevel_ extends Array<BusinessCriticalityLevel> {$count?: number}
Object.defineProperty(BusinessCriticalityLevel_, 'name', { value: 'RadarService.BusinessCriticalityLevel' })

export function _DependencyTypeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class DependencyType extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<_com_gavdilabs_techtransmgt_core.softwareDependencyType>
    declare texts?: __.Composition.of.many<DependencyTypes.texts>
    declare localized?: __.Association.to<DependencyTypes.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<DependencyType>;
    declare static readonly elements: __.ElementsOf<DependencyType>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class DependencyType extends _DependencyTypeAspect(__.Entity) {}
Object.defineProperty(DependencyType, 'name', { value: 'RadarService.DependencyTypes' })
Object.defineProperty(DependencyType, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class DependencyTypes extends Array<DependencyType> {$count?: number}
Object.defineProperty(DependencyTypes, 'name', { value: 'RadarService.DependencyTypes' })

export function _SoftwareTechnologyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class SoftwareTechnology extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare version?: __.DeepRequired<_com_gavdilabs_techtransmgt_core.SolutionVersion>['version'] | null
    declare software?: __.Association.to<SoftwareSolution> | null
    declare software_ID?: string | null
    declare technology?: __.Association.to<Technology> | null
    declare technology_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareTechnology>;
    declare static readonly elements: __.ElementsOf<SoftwareTechnology>;
    declare static readonly actions: globalThis.Record<never, never>;
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
  return class SoftwareStatu extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<SoftwareStatus.texts>
    declare localized?: __.Association.to<SoftwareStatus.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<SoftwareStatu>;
    declare static readonly elements: __.ElementsOf<SoftwareStatu>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SoftwareStatu extends _SoftwareStatuAspect(__.Entity) {}
Object.defineProperty(SoftwareStatu, 'name', { value: 'RadarService.SoftwareStatus' })
Object.defineProperty(SoftwareStatu, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class SoftwareStatus extends Array<SoftwareStatu> {$count?: number}
Object.defineProperty(SoftwareStatus, 'name', { value: 'RadarService.SoftwareStatus' })

export function _PlatformAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Platform extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<_com_gavdilabs_techtransmgt_core.platformType>
    declare texts?: __.Composition.of.many<Platform.texts>
    declare localized?: __.Association.to<Platform.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Platform>;
    declare static readonly elements: __.ElementsOf<Platform>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Platform extends _PlatformAspect(__.Entity) {}
Object.defineProperty(Platform, 'name', { value: 'RadarService.Platform' })
Object.defineProperty(Platform, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class Platform_ extends Array<Platform> {$count?: number}
Object.defineProperty(Platform_, 'name', { value: 'RadarService.Platform' })

export function _TechnologyGroupAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TechnologyGroup extends Base {
    declare name?: string | null
    declare descr?: string | null
    declare code?: __.Key<number>
    declare texts?: __.Composition.of.many<TechnologyGroup.texts>
    declare localized?: __.Association.to<TechnologyGroup.text> | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<TechnologyGroup>;
    declare static readonly elements: __.ElementsOf<TechnologyGroup>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyGroup extends _TechnologyGroupAspect(__.Entity) {}
Object.defineProperty(TechnologyGroup, 'name', { value: 'RadarService.TechnologyGroup' })
Object.defineProperty(TechnologyGroup, 'is_singular', { value: true })
/**
* Aspect for a code list with name and description
* 
* See https://cap.cloud.sap/docs/cds/common#aspect-codelist
*/
export class TechnologyGroup_ extends Array<TechnologyGroup> {$count?: number}
Object.defineProperty(TechnologyGroup_, 'name', { value: 'RadarService.TechnologyGroup' })

// event
export declare class newSolution {
  /** List of emails of people who can approve/reject this solution */
  declare approverEmails: Array<string>
  /** Name of the new solution */
  declare solutionName: string | null
  /** ID of the new solution */
  declare solutionID: string | null
}
// event
export declare class reviewSolution {
  /** Short description of why the requester wants a review of the solution */
  declare description: string | null
  /** Full name of the user that is requesting the review */
  declare requesterName: string | null
  /** The username of the user that is requesting the review */
  declare requesterUsername: string | null
  /** List of emails of the people who have the ability to review the solution */
  declare reviewerList: Array<string>
  /** ID of the solution that is to be reviewed */
  declare solutionID: string | null
  /** Name of the solution that is to be reviewed */
  declare solutionName: string | null
}
// event
export declare class sunsetSolution {
  /** Email list for the owners of the dependent solutions */
  declare dependentEmails: Array<string>
  /** The ID of the solution that is about to sunset */
  declare solutionID: string | null
  /** Name of the solution that is about to sunset */
  declare solutionName: string | null
  /** Email of the solution owner */
  declare solutionOwnerEmail: string | null
  /** Date for which the solution will sunset */
  declare sunsetDate: __.CdsDateTime | null
  /** Description of why the solution is being sunset */
  declare description: string | null
}
// event
export declare class upgradeSolution {
  /** List of emails of the solution owners for the dependent solutions */
  declare dependentEmails: Array<string>
  /** The version of the solution that is about to be released */
  declare newVersion: string | null
  /** The target date for the version release date */
  declare plannedReleaseDate: __.CdsDate | null
  /** Short description of elements changed or link to the location of changelog */
  declare releaseNotes: string | null
  /** Name of the solution that is being upgraded */
  declare solutionName: string | null
  /** Email of the solution owner */
  declare solutionOwnerEmail: string | null
}
// event
export declare class newSolutionVersion {
  /** List of emails for possible approvers */
  declare approverEmails: Array<string>
  /** ID of the solution getting a new version */
  declare solutionID: string | null
  /** Name of the solution getting a new version */
  declare solutionName: string | null
  /** Email of the owner of the solution getting a new version */
  declare solutionOwnerEmail: string | null
  /** The ID of the new version */
  declare versionID: string | null
  /** The semantic versioning name given to the new version */
  declare versionName: string | null
}
/** FUNCTION IMPORTS */
export declare const getActiveUser:  {
  // positional
  /** FUNCTION IMPORTS */
(): globalThis.Promise<_com_gavdilabs_techtransmgt_types.ActiveUser | null> | _com_gavdilabs_techtransmgt_types.ActiveUser | null
  // named
  /** FUNCTION IMPORTS */
({}: globalThis.Record<never, never>): globalThis.Promise<_com_gavdilabs_techtransmgt_types.ActiveUser | null> | _com_gavdilabs_techtransmgt_types.ActiveUser | null
  // metadata (do not use)
  __parameters: globalThis.Record<never, never>, __returns: globalThis.Promise<_com_gavdilabs_techtransmgt_types.ActiveUser | null> | _com_gavdilabs_techtransmgt_types.ActiveUser | null
  kind: 'function'
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
      declare softwareType_code?: _com_gavdilabs_techtransmgt_core.softwareDependencyType | null
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<Dependent>;
      declare static readonly elements: __.ElementsOf<Dependent>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  /** Sub table Dependent Solutions */
  export class Dependent extends _DependentAspect(__.Entity) {static drafts: __.DraftOf<Dependent>}
  Object.defineProperty(Dependent, 'name', { value: 'RadarService.SoftwareSolution.Dependents' })
  Object.defineProperty(Dependent, 'is_singular', { value: true })
  /** Sub table Dependent Solutions */
  export class Dependents extends Array<Dependent> {static drafts: __.DraftsOf<Dependent>
$count?: number}
  Object.defineProperty(Dependents, 'name', { value: 'RadarService.SoftwareSolution.Dependents' })
  
}
export namespace TechnologyStatus {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare code?: __.Key<number>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.TechnologyStatus.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.TechnologyStatus.texts' })
  
}
export namespace SAPVersion {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare descr?: string | null
      declare code?: __.Key<string>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.SAPVersion.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.SAPVersion.texts' })
  
}
export namespace CleanCoreLevel {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare code?: __.Key<number>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.CleanCoreLevel.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.CleanCoreLevel.texts' })
  
}
export namespace CodeQualityLevel {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare code?: __.Key<number>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.CodeQualityLevel.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.CodeQualityLevel.texts' })
  
}
export namespace BusinessCriticalityLevel {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare code?: __.Key<_com_gavdilabs_techtransmgt_core.criticalityLevel>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.BusinessCriticalityLevel.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.BusinessCriticalityLevel.texts' })
  
}
export namespace DependencyTypes {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare descr?: string | null
      declare code?: __.Key<_com_gavdilabs_techtransmgt_core.softwareDependencyType>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.DependencyTypes.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.DependencyTypes.texts' })
  
}
export namespace SoftwareStatus {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare code?: __.Key<number>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.SoftwareStatus.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.SoftwareStatus.texts' })
  
}
export namespace Platform {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare code?: __.Key<_com_gavdilabs_techtransmgt_core.platformType>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.Platform.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.Platform.texts' })
  
}
export namespace TechnologyGroup {
  export function _textAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class text extends Base {
      /** Type for a language code */
      declare locale?: __.Key<_sap_common.Locale>
      declare name?: string | null
      declare code?: __.Key<number>
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<text>;
      declare static readonly elements: __.ElementsOf<text>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class text extends _textAspect(__.Entity) {}
  Object.defineProperty(text, 'name', { value: 'RadarService.TechnologyGroup.texts' })
  Object.defineProperty(text, 'is_singular', { value: true })
  export class texts extends Array<text> {$count?: number}
  Object.defineProperty(texts, 'name', { value: 'RadarService.TechnologyGroup.texts' })
  
}