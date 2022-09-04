import { convertToRefs } from './helpers';
export const definesMap = new Map();
/**
 * @param id - the key to save the created state
 * @param genState - the function that creates the state
 */
export const defineState = (id, genState) => {
    definesMap.set(`${id}-state`, convertToRefs(genState()));
    return definesMap.get(`${id}-state`);
};
/**
 * @param id - the key to save the created actions
 * @param actions - defined actions object
 */
export const defineActions = (id, actions) => {
    definesMap.set(`${id}-actions`, actions);
    return definesMap.get(`${id}-actions`);
};
//# sourceMappingURL=definers.js.map