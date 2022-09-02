import { App } from 'vue';
import { ActionsTree, StateTree, Store, StoreDefinition, StoreOptions } from './types';
export declare const defineStore: <Id extends string, S extends StateTree = {}, A extends ActionsTree = {}>(id: Id, options?: StoreOptions<S, A> | undefined) => StoreDefinition<Id, S, A>;
export declare const createVueZone: () => {
    install: (app: App) => void;
    add(useStore: any): void;
};
export declare const useVueZone: (id?: string | undefined) => Store | Record<string, Store>;
