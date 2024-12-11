// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../../../../_';

export function _ActiveUserAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ActiveUser extends Base {
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'type';
    declare static readonly keys: __.KeysOf<ActiveUser>;
    declare static readonly elements: __.ElementsOf<ActiveUser>;
    declare static readonly actions: Record<never, never>;
  };
}
export class ActiveUser extends _ActiveUserAspect(__.Entity) {}
Object.defineProperty(ActiveUser, 'name', { value: 'com.gavdilabs.techtransmgt.types.ActiveUser' })
Object.defineProperty(ActiveUser, 'is_singular', { value: true })
