import { ActionsTree, GuardsTree, StateTree, StoreDefinition, StoreOptions, ExposesTree, ComputedTree } from './types';
/**
 * @param {string} storeId - store id
 * @param {object} state - state map
 * @param {object} guards - guards map
 * @returns {proxy} proxy with guarded state
 */
export declare function addStateGuards<S extends StateTree, G extends GuardsTree<S>>(storeId: string, state: S, guards: G): S;
/**
 * @param {object} options - store definition object
 * @returns {Store} store instance
 */
export declare function defineStore<Id extends string, S extends StateTree = {}, G extends GuardsTree<S> = {}, C extends ComputedTree = {}, A extends ActionsTree = {}, E extends ExposesTree = ExposesTree>(options: StoreOptions<Id, S, G, C, A, E>): StoreDefinition<Id, S, G, C, A>;
