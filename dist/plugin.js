import { defineState, defineActions } from './definers';
import { wrapToProxy } from './helpers';
/***
 * @param id
 * @param options
 */
export const defineStore = ({ id, state, actions }) => {
    const store = {
        $id: id,
        ...(state && defineState(id, state)),
        ...(actions && defineActions(id, actions))
    };
    const storeProxy = wrapToProxy(store);
    actions && Object.keys(actions).forEach(key => {
        store[key] = (...args) => actions[key].call(storeProxy, ...args);
    });
    const useStore = () => storeProxy;
    useStore.$id = id;
    return useStore;
};
//# sourceMappingURL=plugin.js.map