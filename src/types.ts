import { Plugin } from 'vue'

export type Method = (...args: any[]) => any

export type StateTree = Record<string | number | symbol, any>
export type ActionsTree = Record<string, Method>

export type StateDefinition<S extends StateTree> = () => S
export type ActionsDefinition<A extends ActionsTree> = A

export interface StoreOptions<
  Id extends string,
  S extends StateTree = {},
  A extends ActionsTree = {}
  > {
  id: Id
  state?: StateDefinition<S>
  actions?: ActionsDefinition<A>
}

export type StoreProperties<Id> = { $id: Id }
export type _State<S> = { [key in keyof S]: S[key] }
export type _Actions<A> = { [key in keyof A]: A[key] }

export type Store<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree> = StoreProperties<Id> & _State<S> & _Actions<A>

export interface StoreDefinition<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree> {
  (): Store<Id, S, A>
  $id: Id
}

export declare function defineStore<
  Id extends string = string,
  S extends StateTree = StateTree,
  A extends ActionsTree = ActionsTree>
(options: StoreOptions<Id, S, A>): StoreDefinition<Id, S, A>

export type ZikkuratPlugin = {
  add<
    Id extends string,
    S extends StateTree,
    A extends ActionsTree>(useStore: () => Store<Id, S, A>): void
} & Plugin

export declare function createZikkurat(): ZikkuratPlugin

export declare function useZikkurat<Id extends string,
  S extends StateTree,
  A extends ActionsTree>(id?: Id): Store<Id, S, A> | unknown

export declare function mapActions<
  Id extends string,
  S extends StateTree,
  A extends ActionsTree>
(
  useStore: StoreDefinition<Id, S, A>,
  mapOrKeys?: [ keyof A ] | { [p: string]: keyof A }
): ActionsTree

export declare function mapState<
  Id extends string,
  S extends StateTree,
  A extends ActionsTree>
(
  useStore: StoreDefinition<Id, S, A>,
  mapOrKeys?: [ keyof S ] | { [key: string]: Method | keyof S }
): StateTree
