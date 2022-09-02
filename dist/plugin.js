import { isRef, toRefs } from 'vue';
import { definesMap, defineState, defineActions } from './definers';
const storeToRefs = ({ id, state, actions }) => {
    const store = { $id: id, ...toRefs(state), ...actions };
    return new Proxy(store, {
        get: (obj, prop) => {
            if (!obj[prop])
                return null;
            if (isRef(obj[prop])) {
                return Reflect.get(obj[prop], 'value');
            }
            else {
                return Reflect.get(obj, prop);
            }
        },
        set: (obj, prop, value) => {
            Reflect.set(obj[prop], 'value', value);
            return true;
        }
    });
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
    const { store, proxy } = storeToRefs({ id, state, actions });
    Object.keys(actions).forEach(key => {
        store[key] = (...args) => actions[key].call(proxy, ...args);
    });
    const useStore = () => proxy;
    useStore.$id = id;
    return useStore;
};
//# sourceMappingURL=plugin.js.map