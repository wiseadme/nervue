import { root } from './root';
import { logWarning } from './helpers';
export const createNervue = () => ({
    install: (app) => {
        if (createNervue.isInstalled)
            return;
        createNervue.isInstalled = true;
        app.provide('$n', root);
    },
    add: (useStore) => {
        root[useStore.$id] = useStore();
    }
});
export const useNervue = (id) => {
    if (!root[id]) {
        return logWarning(`"${id}" id doesn't exists in the root store`);
    }
    return id ? root[id] : root;
};
//# sourceMappingURL=createNervue.js.map