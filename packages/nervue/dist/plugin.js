import { convertToRefs } from './helpers';
import { proxify } from './proxify';
/***
 * @param options
 */
export const defineStore = ({ id, state, actions, guards }) => {
    const { assign, defineProperties } = Object;
    /**
     * Defining store properties
     */
    const _storeProperties = defineProperties({}, {
        $id: { value: id, writable: false, configurable: false },
        $guards: { value: guards, writable: true, configurable: true }
    });
    /**
     * Defining store state and actions
     * and fusion with store properties
     */
    const _store = assign(_storeProperties, {
        ...convertToRefs(state?.() || {}),
    }, actions);
    /**
     * Wrapping the store into proxy to access
     * to the state properties via "this".
     * Will also serve to develop further
     * "guard" and "share" functionality.
     */
    const storeProxy = proxify(_store);
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