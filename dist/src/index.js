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
    const store = ({ state, ...actions });
    Object.keys(actions).forEach((key) => {
        store[key] = store[key].bind(store);
    });
    const useStore = () => store;
    useStore.$id = id;
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
        storesMap[useStore.$id] = useStore();
    }
});
export const useVueZone = (id) => {
    const globalStore = inject('$vz', {});
    return id ? globalStore[id] : globalStore;
};
// export const mapActions = (useStore): ActionsTree => {
//   const store = useStore()
//   const actions = {}
//
//   for (const key of Object.keys(store)) {
//     if (typeof store[key] === 'function') {
//       actions[key] = store[key]
//     }
//   }
//
//   return actions
// }
//
// export const mapState = <S = {}>(id: string): S => definesMap.get(`${ id }-state`)
//# sourceMappingURL=index.js.map