import { Plugin, UnwrapRef, UnwrapNestedRefs } from 'vue-demi'
import type { Nervue } from './root'
import { ComputedRef } from 'vue'

export type Method = (...args: any[]) => any

export type GuardMethod = (...val: any[]) => { next: boolean, value?: any }

export type StateTree = Record<string | number | symbol, any>

export declare type ComputedTree<S extends StateTree> = Record<string, ((state: UnwrapRef<S>) => any) | (() => any)>;

export type ActionsTree = Record<string, Method>

export type ExposesTree = Record<string, boolean>

export type GuardsTree = Record<string, GuardMethod[]>

export type State<S> = {
  [k in keyof S]: S[k]
}

export type Actions<A> = {
  readonly [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
}

export type Computed<C> = {
  readonly [k in keyof C]: C[k] extends (state: any) => infer R
    ? ComputedRef<R>
    : never
}

export type _StoreWithProperties<Id, S, G, C, A, E> = {
  $id: Id
  $patch(mutator: ((state: UnwrapRef<S>) => void) | Partial<Record<keyof S, any>>): void
  $subscribe(subscribeOptions: SubscribeOptions<A>): Unsubscribe
  $state: UnwrapRef<S>
  _guards: G
  _computed: [ keyof C ]
  _expose: [ keyof E ]
}

export type _StateGuards<G extends GuardsTree, K extends string> = Pick<G, K>;
export type _StoreStateWithGuards<K extends string, G> = G extends GuardsTree ? keyof G extends K ? G : _StateGuards<G, K> : unknown;

export interface StoreOptions<
  Id extends string = string,
  S extends StateTree = {},
  G /*extends GuardsTree*/ = {},
  C extends ComputedTree<S> = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}> {
  id: Id
  state?: () => S,
  guards?: G extends GuardsTree ? keyof G extends S ? G : _StoreStateWithGuards<keyof S & string, G> : unknown
  computed?: C & ThisType<UnwrapRef<S> & ComputedTree<S> & ActionsTree>,
  actions?: A & ThisType<UnwrapRef<S> & ComputedTree<S> & _StoreWithProperties<Id, S, G, C, A, E>>,
  expose?: E
}

export type Store<
  Id extends string = string,
  S extends StateTree = {},
  G /*extends GuardsTree*/ = {},
  C /*extends ComputedTree<S>*/ = {},
  A /*extends ActionsTree*/ = {},
  E /*extends ExposesTree*/ = {},
  > = _StoreWithProperties<Id, S, G, C, A, E>
  & State<S>
  & Computed<C>
  & Actions<A>

export type ExposedStore<SS> = SS extends Store<string, infer S, GuardsTree, infer C, infer A, infer E>
  ? keyof E extends never ? Record<keyof A | keyof S | keyof C, any> : Record<keyof E, any>
  : any

export interface StoreDefinition<
  Id extends string = string,
  S extends StateTree = {},
  G /*extends GuardsTree*/ = {},
  C /*extends ComputedTree<S>*/ = ComputedTree<S>,
  A /*extends ActionsTree*/ = ActionsTree,
  E /*extends ExposesTree*/ = ExposesTree> {
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
export type NervuePlugin = UnwrapNestedRefs<Nervue> & Plugin

