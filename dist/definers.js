import { reactive } from 'vue';
export const definesMap = new Map();
export const defineState = (id, genState) => {
    definesMap.set(`${id}-state`, reactive(genState()));
    return definesMap.get(`${id}-state`);
};
export const defineActions = (id, actions) => {
    definesMap.set(`${id}-actions`, actions);
    return definesMap.get(`${id}-actions`);
};
//# sourceMappingURL=definers.js.map