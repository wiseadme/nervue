import { Plugin, DefineComponent } from 'vue'

type Maybe<T> = T | null

export type Method = (...args: any[]) => any
export type GuardMethod = (val: any) => boolean

export type StateTree = Record<string | number | symbol, any>
export type ActionsTree = Record<string, Method>
export type GuardsTree = Record<string, GuardMethod | GuardMethod[]>

export type StateDefinition<S extends StateTree> = () => S
export type ActionsDefinition<A extends ActionsTree> = A
export type GuardsDefinition<G extends GuardsTree> = G
export type _State<S> = { [K in keyof S]: S[K] }
export type _Actions<A> = { [K in keyof A]: A[K] }
export type _Guards<G, S> = Pick<Record<keyof S, GuardMethod | GuardMethod[]>, keyof G>

export interface StoreOptions<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  A extends ActionsTree = {}
  > {
  id: Id
  state?: StateDefinition<S>
  actions?: ActionsDefinition<A>
  guards?: GuardsDefinition<G>
}

export type StoreProperties<Id, S, G> = {
  $id: Id,
  $guards: _Guards<G, S>,
}

export type Store<
  Id extends string = string,
  S extends StateTree = StateTree,
  G extends GuardsTree = GuardsTree,
  A extends ActionsTree = ActionsTree
  > = StoreProperties<Id, S, G> & _State<S> & _Actions<A>

export interface StoreDefinition<
  Id extends string = string,
  S extends StateTree = StateTree,
  G extends GuardsTree = GuardsTree,
  A extends ActionsTree = ActionsTree> {
  (): Store<Id, S, G, A>
  $id: Id
}

export declare function defineStore<
  Id extends string = string,
  S extends StateTree = StateTree,
  G extends GuardsTree = GuardsTree,
  A extends ActionsTree = ActionsTree
>(options: StoreOptions<Id, S, G, A>): StoreDefinition<Id, S, G, A>

export type NervuePlugin = {
  add<
    Id extends string,
    S extends StateTree = {},
    G extends GuardsTree = {},
    A extends ActionsTree = {}
  >(useStore: () => Store<Id, S, G, A>): void
} & Plugin

export declare function createNervue(): NervuePlugin

export declare function useNervue<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  A extends ActionsTree = {}
  >(id?: Id): Store<Id, S, G, A> | unknown

export declare function mapActions<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  A extends ActionsTree = {}>
(
  useStore: StoreDefinition<Id, S, G, A>,
  mapOrKeys?: [ keyof A ] | { [p: string]: keyof A }
): ActionsTree

export declare function mapState<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  A extends ActionsTree = {}>
(
  useStore: StoreDefinition<Id, S, G, A>,
  mapOrKeys?: [ keyof S ] | { [key: string]: Method | keyof S }
): StateTree

export declare const VNervue: DefineComponent<any, any, any>
