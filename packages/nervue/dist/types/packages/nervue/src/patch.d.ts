import { UnwrapRef } from 'vue-demi';
import { StateTree } from './types';
export declare function $patch<S = StateTree>(mutator: (state: UnwrapRef<S>) => void): void;
