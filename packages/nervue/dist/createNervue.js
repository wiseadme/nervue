import { reactive } from 'vue';
import { logWarning } from './helpers';
import { root, NERVUE_ROOT_SYMBOL } from './root';
export const createNervue = () => ({
    install: (app) => {
        if (root.value.isInstalled) {
            return;
        }
        root.value.isInstalled = true;
        app.provide(NERVUE_ROOT_SYMBOL, root);
    },
    add: (useStore) => {
        root.value._stores[useStore.$id] = useStore();
    }
});
export const getRoot = () => reactive(root.value);
export function useNervue(id) {
    const storeKey = id?.toString() || id;
    if (id && !root.value._stores[id]) {
        return logWarning(`"${String(storeKey)}" id doesn't exists in the root store`);
    }
    return id ?
        root.value._stores[id] :
        root.value._stores;
}
//# sourceMappingURL=createNervue.js.map