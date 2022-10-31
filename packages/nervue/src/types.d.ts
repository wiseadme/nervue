import { Plugin, DefineComponent, UnwrapRef, UnwrapNestedRefs, App } from 'vue-demi'
import { Root } from './createNervue'

export type Method = (...args: any[]) => any

export type StateTree = Record<string | number | symbol, any>

export type ComputedTree = Record<string, Method>

export type ActionsTree = Record<string, Method>

export type ExposesTree = Record<string, boolean>

export type GuardsTree = Record<string, Method[]>

export type State<S> = {
  [k in keyof S]: S[k]
}

export type Actions<A> = {
  [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
}

export type Computed<C> = {
  [k in keyof C]: C[k] extends (...args: any) => infer R
    ? R
    : never
}

export type _StoreWithProperties<Id, S, G, C, A, E> = {
  $id: Id
  $patch: (mutator: ((state: UnwrapRef<S>) => void) | Partial<UnwrapRef<S>>) => void
  $subscribe: (subscribeOptions: SubscribeOptions<A>) => Unsubscribe
  $state: S
  $expose: (exposes: E) => void
  $guards: G,
  $computed: [keyof C],
  _exposed: Record<Id extends string ? Id : string, Root['_exposed']>
}

export interface StoreOptions<
  Id extends string = string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
  > {
  id: Id
  state?: () => S,
  guards?: keyof G extends keyof S ? G : Pick<G, keyof S & string>
  computed?: C,
  actions?: A,
  expose?: {[ k in keyof Partial<S & A & C> ]: E[k & string] & boolean}
}

export type Store<
  Id extends string = string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {},
  > = UnwrapNestedRefs<
  _StoreWithProperties<Id, S, G, C, A, E>
  & State<S>
  & Computed<C>
  & Actions<A>
  >

export interface StoreDefinition<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
  > {
  (): Store<Id, S, G, C, A, E>
  $id: Id
}

export type SubscribeOptions<A> = {
  name: keyof A & string
  detached?: boolean
  before?(...args: any[]): any
  after?(...result: any[]): any
  onError?(error: any): any
}

export type ExistingSubscribers = {
  beforeList: ((...args: any) => any)[]
  afterList: ((res: any) => any)[]
  onErrorList: ((error: unknown) => unknown)[]
}

export type Unsubscribe = () => Promise<boolean>

export function defineStore<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
  >(options: StoreOptions<Id, S, G, C, A, E>): StoreDefinition<Id, S, G, C, A, E>

export type NervuePlugin = {
  add<
    Id extends string,
    S extends StateTree = {},
    G extends GuardsTree = {},
    C extends ComputedTree = {},
    A /*extends ActionsTree*/ = {},
    E extends ExposesTree = {}
    >(useStore: StoreDefinition<Id, S, G, C, A, E>): void
  install(app: App): void
} & Plugin

export function createNervue(): NervuePlugin
export function getRoot(): UnwrapNestedRefs<Root>
export function useNervue(id?: string): Store | Record<string, Store> | void

export function useNervue<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
  >(id?: Id): Store<Id, S, G, C, A, E> | unknown

export function mapActions<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  >
(
  useStore: StoreDefinition<Id, S, G, C, A>,
  mapOrKeys?: [ keyof A ] | { [p: string]: keyof A }
): ActionsTree

export function mapState<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
  >
(
  useStore: StoreDefinition<Id, S, G, C, A, E>,
  mapOrKeys?: [ keyof S ] | { [key: string]: Method | keyof S }
): StateTree

export const VNervue: DefineComponent<{store: string | StoreDefinition<string>}, any, any>
