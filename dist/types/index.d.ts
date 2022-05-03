import { UnwrapRef } from 'vue'

export declare type Method = (...args: any[]) => any
export declare type StateTree = Record<string | number | symbol, any>
export declare type ActionsTree = Record<string, Method>
export declare type StateDefinition<S extends StateTree> = () => S

export declare type StoreOptions<S extends StateTree = {}, A = {}> = {
  state: StateDefinition<S>
  actions: ActionsTree extends A ? A : {}
}

export declare type Store<S extends StateTree = {}, A = {}> = {
  state: UnwrapRef<S>
} & {
  [key in keyof A]: A[key]
}

export declare function defineState<S extends StateTree = {}>(key: string, genState: () => S): S

export declare function defineActions<A extends ActionsTree = {}>(key: string, actions: A): A

export declare function defineStore<S = {}, A = {}>(key: string, options?: StoreOptions<S, A>): () => Store<S, A>
