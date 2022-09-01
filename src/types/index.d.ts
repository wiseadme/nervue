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

export declare type Store<S extends StateTree = {}, A = {}> = {
  state: UnwrapRef<S>
} & {
  [key in keyof A]: A[key]
}

export declare function defineState<S = {}>(key: string, genState: StateDefinition<S>): S

export declare function defineActions<A = {}>(key: string, actions: ActionsDefinition<A>): A

export declare function defineStore<S = {}, A = {}>(key: string, options?: StoreOptions<S, A>): () => Store<S, A>

export declare function createVueZone(): Plugin

export declare function useVueZone(id?: string): Store | any
