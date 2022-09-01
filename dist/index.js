// Vue API
import { reactive, inject } from 'vue';
import { definesMap } from './defines-map';
import { storesMap } from './stores-map';
let isInstalled = false;
export const defineState = (id, genState) => {
    definesMap.set(`${id}-state`, reactive(genState()));
    return definesMap.get(`${id}-state`);
};
export const defineActions = (id, actions) => {
    definesMap.set(`${id}-actions`, actions);
    return definesMap.get(`${id}-actions`);
};
export const defineStore = (id, options) => {
    let state, actions, store;
    if (!options) {
        state = definesMap.get(`${id}-state`);
        actions = definesMap.get(`${id}-actions`);
    }
    else {
        state = defineState(id, options.state);
        actions = defineActions(id, options.actions);
    }
    store = { state, ...actions };
    Object.keys(store).forEach(key => {
        if (typeof store[key] === 'function') {
            store[key] = store[key].bind(store);
        }
    });
    storesMap[id] = store;
    return () => store;
};
export const createVueZone = () => ({
    install: (app) => {
        if (isInstalled)
            return;
        isInstalled = true;
        app.provide('$vz', storesMap);
    }
});
export const useVueZone = (id) => {
    const globalStore = inject('$vz', {});
    return id ? globalStore[id] : globalStore;
};
//# sourceMappingURL=index.js.map