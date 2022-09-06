import { root } from './root';
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
    return id ? root[id] : root;
};
//# sourceMappingURL=createNervue.js.map