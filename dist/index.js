// Vue API
import { reactive, inject } from 'vue';
import { definesMap } from './defines-map';
import { storesMap } from './stores-map';
let isInstalled = false;
const defineState = (id, genState) => {
    definesMap.set(`${id}-state`, reactive(genState()));
    return definesMap.get(`${id}-state`);
};
const defineActions = (id, actions) => {
    definesMap.set(`${id}-actions`, actions);
    return definesMap.get(`${id}-actions`);
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
    const useStore = () => ({ state, ...actions });
    useStore.id = id;
    return useStore;
};
export const createVueZone = () => ({
    install: (app) => {
        if (isInstalled)
            return;
        isInstalled = true;
        app.provide('$vz', storesMap);
    },
    add(useStore) {
        const store = useStore();
        Object.keys(store).forEach(key => {
            if (typeof store[key] === 'function') {
                store[key] = store[key].bind(store);
            }
        });
        storesMap[useStore.id] = store;
    }
});
export const useVueZone = (id) => {
    const globalStore = inject('$vz', {});
    return id ? globalStore[id] : globalStore;
};
export const mapActions = (id) => {
    const actions = definesMap.get(`${id}-actions`);
    Object.keys(actions).forEach(key => {
        actions[key] = actions[key].bind(storesMap[id]);
    });
    return actions;
};
export const mapState = (id) => definesMap.get(`${id}-state`);
//# sourceMappingURL=index.js.map