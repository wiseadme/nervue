import { App, UnwrapNestedRefs } from 'vue-demi';
import { ActionsTree, GuardsTree, StateTree, Store } from './types';
import { Root } from './root';
export declare function createNervue(): {
    install: (app: App) => void;
    add: (useStore: any) => void;
};
export declare function getRoot(): UnwrapNestedRefs<Root>;
export declare function useNervue<Id extends string, S extends StateTree = {}, G extends GuardsTree<S> = {}, A extends ActionsTree = {}>(id?: Id): Store<Id, S, G, A> | Record<string, Store<Id, S, G, A>> | void;
