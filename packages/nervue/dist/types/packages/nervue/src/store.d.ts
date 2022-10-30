import { ActionsTree, GuardsTree, StateTree, StoreDefinition, StoreOptions, ExposesTree, ComputedTree } from './types';
/**
 * @param {object} options - store definition object
 * @returns {Store} store instance
 */
export declare function defineStore<Id extends string, S extends StateTree = {}, G extends GuardsTree = {}, C extends ComputedTree = {}, A extends ActionsTree = {}, E extends ExposesTree = {}>(options: StoreOptions<Id, S, G, C, A, E>): StoreDefinition<Id, S, G, C, A, E>;
