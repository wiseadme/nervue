import { ActionsTree, GuardsTree, StateTree, Method, StoreDefinition, ComputedTree } from './types';
/**
 * @param useStore - store composition
 * @param mapOrKeys - object of actions properties
 */
export declare function mapActions<Id extends string, S extends StateTree, G extends GuardsTree<S>, C extends ComputedTree, A extends ActionsTree>(useStore: StoreDefinition<Id, S, G, C, A>, mapOrKeys?: [keyof A] | {
    [p: string]: keyof A;
}): ActionsTree;
/**
 * @param useStore - store composition
 * @param mapOrKeys - object of state properties
 */
export declare function mapState<Id extends string, S extends StateTree, G extends GuardsTree<S>, C extends ComputedTree, A extends ActionsTree>(useStore: StoreDefinition<Id, S, G, C, A>, mapOrKeys?: [keyof S | keyof C] | {
    [key: string]: Method | keyof S | keyof C;
}): StateTree;
