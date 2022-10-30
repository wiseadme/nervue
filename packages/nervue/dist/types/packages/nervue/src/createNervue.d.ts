import { App, UnwrapNestedRefs } from 'vue-demi';
import { Store } from './types';
import { Root } from './root';
export declare function createNervue(): {
    install: (app: App) => void;
    add: (useStore: any) => void;
};
export declare function getRoot(): UnwrapNestedRefs<Root>;
export declare function useNervue<Id extends string>(id?: Id): Store | Record<string, Store> | void;
