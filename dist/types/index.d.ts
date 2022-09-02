import { UnwrapRef, Plugin } from 'vue'

export declare type Method = (...args: any[]) => any

export declare type StateTree = Record<string | number | symbol, any>
export declare type ActionsTree = Record<string, Method>

export declare type StateDefinition<S extends StateTree> = () => S
export declare type ActionsDefinition<A> = ActionsTree extends A ? A : {}

export declare type StoreOptions<S extends StateTree = () => ({}), A = {}> = {
  state: StateDefinition<S>
  actions: ActionsTree extends A ? A : {}
}

export declare type Store<S extends StateTree = {}, A = {}> = {
  state: UnwrapRef<S>
} & {
  [key in keyof A]: A[key]
}

export declare function defineStore<K extends string, S = {}, A = {}>(key: K, options?: StoreOptions<S, A>): () => Store<S, A>

export declare function createVueZone(): Plugin & { add(useStore: () => Store): void }

export declare function useVueZone(id?: string): Store | any

export declare function mapActions<A = {}>(id: string): A

export declare function mapState<S = {}>(id: string): S
