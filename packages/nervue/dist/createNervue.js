import { reactive } from 'vue-demi';
import { logWarning } from './helpers';
import { root, ROOT_SYMBOL } from './root';
export function createNervue() {
    return {
        install: (app) => {
            if (root.value.isInstalled) {
                return;
            }
            root.value.isInstalled = true;
            app.provide(ROOT_SYMBOL, root);
        },
        add: (useStore) => {
            root.value._stores[useStore.$id] = useStore();
        }
    };
}
export function getRoot() {
    return reactive(root.value);
}
export function useNervue(id) {
    const storeKey = id?.toString() || id;
    if (id && !root.value._stores[id]) {
        return logWarning(`"${String(storeKey)}" store doesn't exist in the root object`);
    }
    return id ?
        root.value._stores[id] :
        root.value._stores;
}
//# sourceMappingURL=createNervue.js.map