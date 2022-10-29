import { Plugin, DefineComponent, ComputedRef } from 'vue-demi'
import { SubscribeOptions, Unsubscribe } from './subscriptions'
import { Root } from './createNervue'

export type Method = (...args: any[]) => any

export type GuardMethod = (val: any) => { value?: any, next: boolean }

export type StateTree = Record<string | number | symbol, any>

export type ComputedTree = Record<string, Method>

export type ActionsTree = Record<string, Method>

export type ExposesTree = Record<string, boolean>

export type GuardsTree<S extends StateTree = StateTree> = {
  [k in keyof S]?: GuardMethod[]
}

export type State<S> = {
  [k in keyof S]: S[k]
}

export type Actions<A> = {
  [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
}

export type Computed<C> = {
  [k in keyof C]: M[k] extends () => infer R
    ? ComputedRef<R>
    : never
}

export type Guards<G> = {
  [k in keyof G]: G[k] extends [ (val: infer P) => { value?: infer V, next: boolean } ]
    ? [ (val: P) => { value?: V, next: boolean } ]
    : never
}

export type _StoreWithProperties<Id extends string, S, C, G, E = ExposesTree> = {
  $id: Id
  $patch: (fn: (state: StateTree) => void) => void
  $subscribe: (subscribeOptions: SubscribeOptions) => Unsubscribe
  $state: StateTree
  $expose: (exposes: ExposesTree) => void
  $guards: Guards<G>,
  $computed: [keyof C],
  _exposed: Record<Id, Root['_exposed']>
}

export interface StoreOptions<
  Id extends string = string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}> {
  id: Id
  state?: () => S,
  guards?: G,
  computed?: C,
  actions?: A,
  expose?: E
}

export type Store<
  Id extends string = string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  > = _StoreWithProperties<Id, S, G>
  & State<S>
  & Guards<G>
  & Computed<C>
  & Actions<A>

export interface StoreDefinition<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
  > {
  (): Store<Id, S, G, C, A>

  $id: Id
}

export declare function defineStore<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
  >(options: StoreOptions<Id, S, G, C, A, E>): StoreDefinition<Id, S, G, C, A, E>

export type NervuePlugin = {
  add<
    Id extends string,
    S extends StateTree = {},
    G extends GuardsTree<S> = {},
    C extends ComputedTree = {},
    A /*extends ActionsTree*/ = {}
  >(useStore: () => Store<Id, S, G, C, A>): void
} & Plugin

export declare function createNervue(): NervuePlugin

export declare function useNervue<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {}
>(id?: Id): Store<Id, S, G, A> | unknown

export declare function mapActions<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {}>
(
  useStore: StoreDefinition<Id, S, G, C, A>,
  mapOrKeys?: [ keyof A ] | { [p: string]: keyof A }
): ActionsTree

export declare function mapState<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {}>
(
  useStore: StoreDefinition<Id, S, G, C, A>,
  mapOrKeys?: [ keyof S ] | { [key: string]: Method | keyof S }
): StateTree

export declare const VNervue: DefineComponent<{store: string | StoreDefinition}, any, any>
