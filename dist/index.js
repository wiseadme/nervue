// Vue API
import { reactive, toRefs, inject, ref } from 'vue';
const definesMap = new Map();
const storesMap = {};
const isInstalled = ref(false);
export const defineState = (id, genState) => {
    const state = reactive(genState());
    definesMap.set(`${id}-state`, state);
    return state;
};
export const defineActions = (id, actions) => {
    const state = definesMap.get(`${id}-state`);
    const context = state ? { state, ...actions } : actions;
    Object.keys(actions).forEach((fn) => {
        actions[fn] = actions[fn].bind(context);
    });
    definesMap.set(`${id}-actions`, actions);
    return actions;
};
export const defineStore = (id, options) => {
    let state, actions;
    if (!options) {
        state = definesMap.get(`${id}-state`);
        actions = definesMap.get(`${id}-actions`);
    }
    else {
        state = defineState(id, options.state);
        actions = defineActions(id, options.actions);
    }
    storesMap[id] = { ...toRefs(state), ...actions };
    return () => storesMap[id];
};
export const createVueZone = () => ({
    install: (app) => {
        if (isInstalled.value) return;
        isInstalled.value = true;
        app.provide('$vz', storesMap);
    }
});
export const useVueZone = () => inject('$vz', null);
//# sourceMappingURL=index.js.map
