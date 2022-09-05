import { wrapIntoProxy, convertToRefs } from './helpers';
/***
 * @param options
 */
export const defineStore = ({ id, state, actions }) => {
    const _store = {
        $id: id,
        ...convertToRefs(state?.() || {}),
        ...actions
    };
    /**
     * Wrapping the store into proxy to access
     * to the state properties via "this".
     * Will also serve to develop further
     * "guard" and "share" functionality.
     */
    const storeProxy = wrapIntoProxy(_store);
    actions && Object.keys(actions).forEach(key => {
        _store[key] = function () {
            return actions[key].call(storeProxy, ...arguments);
        };
    });
    const useStore = () => storeProxy;
    useStore.$id = _store.$id;
    return useStore;
};
//# sourceMappingURL=plugin.js.map