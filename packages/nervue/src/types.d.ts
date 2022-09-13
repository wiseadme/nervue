import { Plugin, DefineComponent } from 'vue'
import { SubscribeOptions, Unsubscribe } from './subscriptions'
import { Root } from './createNervue'

export type Method = (...args: any[]) => any
export type GuardMethod = (val: any) => boolean

export type StateTree = Record<string | number | symbol, any>
export type ActionsTree = Record<string, Method>
export type GuardsTree<S extends StateTree = StateTree> = {
  [k in keyof S]?: GuardMethod[]
}

export type State<S> = {
  [K in keyof S]: S[K]
}

export type Actions<A> = {
  [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
}

export type Guards<S, G> = {
  [k in keyof S]: G[k] extends [(val: infer P) => boolean]
    ? [(val: infer P) => boolean]
    : never
}

export type _StoreWithProperties<Id, S, G, A> = {
  $id: Id
  $patch: (fn: (state: StateTree) => void) => void
  $subscribe: (subscribeOptions: SubscribeOptions) => Unsubscribe
  $share: (sharedObject:Partial< {[key in keyof Store<Id, S, G, A>]: Store<Id, S, G, A>[key]}>) => void
  $state: StateTree
  $guards: Guards<S, G>,
  _shares: Record<string, Record<string, any>>
  _r: Root | null
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
  > = _StoreWithProperties<Id, S, G, A> &
  State<S> &
  Actions<A>

export interface StoreDefinition<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A = {}> {
  (): Store<Id, S, G, A>
  $id: Id
}

export declare function defineStore<
  Id extends string,
  S extends StateTree = {},
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
