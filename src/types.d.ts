import { Plugin, DefineComponent } from 'vue'

export type Method = (...args: any[]) => any
export type GuardMethod = (val: any) => boolean

export type StateTree = Record<string | number | symbol, any>
export type ActionsTree = Record<string, Method>
export type GuardsTree<S extends StateTree> = {
  [k in keyof S]?: GuardMethod[]
}

export type _State<S> = {
  [K in keyof S]: S[K]
}

export type _Actions<A> = {
  [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
}

export type _Guards<S, G> = {
  [k in keyof S]: G[k] extends [(val: infer P) => boolean]
    ? [(val: infer P) => boolean]
    : never
}

export type _StoreWithProperties<Id> = {
  $id: Id,
}

export type _StoreWithGuards<S, G> = {
  $guards: _Guards<S, G>,
}

export interface StoreOptions<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
  > {
  id: Id
  state?: () => S
  actions?: A,
  guards?: G
}

export type Store<
  Id extends string = string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
  > = _StoreWithProperties<Id> &
  _StoreWithGuards<S, G> &
  _State<S> &
  _Actions<A>

export interface StoreDefinition<
  Id extends string = string,
  S extends StateTree = StateTree,
  G extends GuardsTree<S> = {},
  A = {}> {
  (): Store<Id, S, G, A>
  $id: Id
}

export declare function defineStore<
  Id extends string = string,
  S extends StateTree = StateTree,
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(options: StoreOptions<Id, S, G, A>): StoreDefinition<Id, S, G, A>

export type NervuePlugin = {
  add<
    Id extends string,
    S extends StateTree = {},
    G extends GuardsTree<S> = {},
    A extends ActionsTree = {}
  >(useStore: () => Store<Id, S, G, A>): void
} & Plugin

export declare function createNervue(): NervuePlugin

export declare function useNervue<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
  >(id?: Id): Store<Id, S, G, A> | unknown

export declare function mapActions<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}>
(
  useStore: StoreDefinition<Id, S, G, A>,
  mapOrKeys?: [ keyof A ] | { [p: string]: keyof A }
): ActionsTree

export declare function mapState<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}>
(
  useStore: StoreDefinition<Id, S, G, A>,
  mapOrKeys?: [ keyof S ] | { [key: string]: Method | keyof S }
): StateTree

export declare const VNervue: DefineComponent<any, any, any>
