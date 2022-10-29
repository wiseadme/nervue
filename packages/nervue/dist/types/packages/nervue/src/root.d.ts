import { ComputedRef } from 'vue-demi';
import { Method, Store } from './types';
export declare const ROOT_SYMBOL: unique symbol;
export interface Root {
    isInstalled: boolean;
    _stores: Record<string, Store>;
    _exposed: Record<string, Record<string, ComputedRef | Method>>;
}
export declare const root: import("vue-demi").Ref<{
    isInstalled: boolean;
    _stores: Record<string, Store>;
    _exposed: Record<string, Record<string, ComputedRef | Method>>;
}>;
