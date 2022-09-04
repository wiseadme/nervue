import { Plugin } from 'vue'

export declare type Method = (...args: any[]) => any

export declare type StateTree = Record<string | number | symbol, any>
export declare type ActionsTree = Record<string, Method>

export declare type StateDefinition<S extends StateTree> = () => S
export declare type ActionsDefinition<A extends ActionsTree> = A

export declare interface StoreOptions<Id extends string, S extends StateTree = {}, A extends ActionsTree = {}> {
  id: Id
  state: StateDefinition<S>
  actions: ActionsDefinition<A>
}

type StoreProperties<Id> = {
  $id: Id
}

type _State<S> = { [key in keyof S]: S[key] }
type _Actions<A> = { [key in keyof A]: A[key] }

export type Store<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree
  > = StoreProperties<Id> & _State<S> & _Actions<A>

export interface StoreDefinition<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree
  > {
  (): Store<Id, S, A>
  $id: Id
}

export declare function defineStore<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree
  >(options: StoreOptions<Id, S, A>): StoreDefinition<Id, S, A>

export type VueZonePlugin = {
  add<Id extends string,
    S extends StateTree,
    A extends ActionsTree>(useStore: () => Store<Id, S, A>): void
} & Plugin

export declare function createVueZone(): VueZonePlugin

export declare function useVueZone(id?: string): Store | any
