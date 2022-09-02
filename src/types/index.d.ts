import { UnwrapRef, Plugin } from 'vue'

export declare type Method = (...args: any[]) => any

export declare type StateTree = Record<string | number | symbol, any>
export declare type ActionsTree = Record<string, Method>

export declare type StateDefinition<S extends StateTree> = () => S
export declare type ActionsDefinition<A> = ActionsTree extends A ? A : {}

export declare type StoreOptions<S extends StateTree = {}, A = {}> = {
  state: StateDefinition<S>
  actions: ActionsTree extends A ? A : {}
}

export declare type Store<
  Id extends string = string,
  S extends StateTree = {},
  A extends ActionsTree = {}> = {
  state: UnwrapRef<S>
  $id: Id
} & {
  [key in keyof A]: A[key]
}

export declare interface StoreDefinition<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree> {
  (): Store<Id, S, A>
  $id: Id
}

export declare function defineStore<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree
  >(id: Id, options?: StoreOptions<S, A>): StoreDefinition<Id, S, A>

export type VueZonePlugin = {
  add(useStore: () => Store): void
} & Plugin

export declare function createVueZone(): VueZonePlugin

export declare function useVueZone(id?: string): Store | any
