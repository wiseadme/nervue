import { App } from 'vue-demi';
import { ComputedRef } from 'vue';
import { Plugin as Plugin_2 } from 'vue-demi';
import { UnwrapNestedRefs } from 'vue-demi';
import { UnwrapRef } from 'vue-demi';

export declare type Actions<A> = {
    readonly [k in keyof A]: A[k] extends (...args: infer P) => infer R ? (...args: P) => R : never;
};

export declare type ActionsTree = Record<string, Method>;

export declare type Computed<C> = {
    readonly [k in keyof C]: C[k] extends (state: any) => infer R ? UnwrapNestedRefs<ComputedRef<R>> : never;
};

export declare type ComputedTree<S extends StateTree> = Record<string, ((state: UnwrapRef<S>) => any) | (() => any)>;

export declare function createNervue(): NervuePlugin_2;

/**
 * @param {StoreOptions} options - store definition options object
 * @returns {StoreDefinition} useStore function
 */
export declare function defineStore<Id extends string, S extends StateTree = {}, G = {}, C extends ComputedTree<S> = {}, A = {}, E extends ExposesTree = {}>(options: StoreOptions<Id, S, G, C, A, E>): StoreDefinition<Id, S, G, C, A, E>;

export declare type ExistingSubscribers = {
    beforeList: ((...args: any) => any)[];
    afterList: ((res: any) => any)[];
    onErrorList: ((error: unknown) => unknown)[];
};

export declare type ExposesTree = Record<string, boolean>;

declare type GuardMethod = (...val: any[]) => {
    next: boolean;
    value?: any;
};

export declare type GuardsTree = Record<string, GuardMethod[]>;

/**
 * @param useStore - store composition
 * @param keys - array of action keys
 */
export declare function mapActions<Id extends string, S extends StateTree, G extends GuardsTree, C extends ComputedTree<S>, A, E extends ExposesTree, Keys extends keyof A>(useStore: StoreDefinition<Id, S, G, C, A, E>, keys: Keys[]): ActionsTree;

/**
 * @param useStore - store composition
 * @param keysMap - action keys map
 */
export declare function mapActions<Id extends string, S extends StateTree, G extends GuardsTree, C extends ComputedTree<S>, A, E extends ExposesTree, KeyMapper extends Record<string, keyof A>>(useStore: StoreDefinition<Id, S, G, C, A, E>, keysMap: KeyMapper): ActionsTree;

/**
 * @param useStore - store composition
 * @param keys - array of state or computed keys
 */
export declare function mapState<Id extends string, S extends StateTree, G extends GuardsTree, C extends ComputedTree<S>, A, E extends ExposesTree, Keys extends keyof S | keyof C>(useStore: StoreDefinition<Id, S, G, C, A, E>, keys: Keys[]): StateTree;

/**
 * @param useStore - store composition
 * @param keysMap - map of state or computed keys
 */
export declare function mapState<Id extends string, S extends StateTree, G extends GuardsTree, C extends ComputedTree<S>, A, E extends ExposesTree, KeyMapper extends Record<string, (keyof S | C) | ((state: S) => any)>>(useStore: StoreDefinition<Id, S, G, C, A, E>, keysMap: KeyMapper): StateTree;

declare type Method = (...args: any[]) => any;

export declare const NervuePlugin: Plugin_2;

declare type NervuePlugin_2 = {
    add<Id extends string, S extends StateTree = {}, G = {}, C extends ComputedTree<S> = {}, A = {}, E extends ExposesTree = {}>(useStore: StoreDefinition<Id, S, G, C, A, E>): void;
    install(app: App): void;
} & Plugin_2;

export declare const nervueSymbol: unique symbol;

declare interface Root {
    isInstalled: boolean;
    _stores: Record<string, Store>;
    _exposed: Record<string, /*Method | ComputedRef*/ any>;
}

export declare type State<S> = {
    [k in keyof S]: S[k];
};

export declare type _StateGuards<G extends GuardsTree, K extends string> = Pick<G, K>;

export declare type StateTree = Record<string | number | symbol, any>;

export declare type Store<Id extends string = string, S extends StateTree = {}, G = GuardsTree, C = {}, A = {}, E extends ExposesTree = {}> = UnwrapNestedRefs<_StoreWithProperties<Id, S, G, C, A, E> & State<S> & Computed<C> & Actions<A>>;

export declare interface StoreDefinition<Id extends string, S extends StateTree = {}, G = {}, C = ComputedTree<S>, A = ActionsTree, E extends ExposesTree = {}> {
    (): Store<Id, S, G, C, A, E>;
    $id: Id;
}

export declare interface StoreOptions<Id extends string = string, S extends StateTree = {}, G = {}, C extends ComputedTree<S> = {}, A = {}, E extends ExposesTree = {}> {
    id: Id;
    state?: () => S;
    guards?: G extends GuardsTree ? keyof G extends S ? G : _StoreStateWithGuards<keyof S & string, G> : unknown;
    computed?: C;
    actions?: A;
    expose?: {
        [k in keyof Partial<S & A & C>]: E[k & string] & boolean;
    };
}

declare type _StoreStateWithGuards<K extends string, G> = G extends GuardsTree ? keyof G extends K ? G : _StateGuards<G, K> : unknown;

export declare type _StoreWithProperties<Id, S, G, C, A, E> = {
    $id: Id;
    $patch: (mutator: ((state: UnwrapRef<S>) => void) | Partial<UnwrapRef<S>>) => void;
    $subscribe: (subscribeOptions: SubscribeOptions<A>) => Unsubscribe;
    $state: S;
    $expose: (exposes: E) => void;
    $guards: G;
    $computed: [keyof C];
    _exposed: Record<Id extends string ? Id : string, Root['_exposed']>;
};

export declare type SubscribeOptions<A> = {
    name: keyof A & string;
    detached?: boolean;
    before?(...args: any[]): any;
    after?(...result: any[]): any;
    onError?(error: any): any;
};

export declare type Unsubscribe = () => Promise<boolean>;

export declare function useNervue<Id extends string, S extends StateTree = {}, G = {}, C extends ComputedTree<S> = {}, A = {}, E extends ExposesTree = {}>(id?: Id): Store<Id, S, G, C, A, E> | unknown;

export { }
