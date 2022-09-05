import { root } from './root';
export const createZikkurat = () => ({
    install: (app) => {
        if (createZikkurat.isInstalled)
            return;
        createZikkurat.isInstalled = true;
        app.provide('$Z', root);
    },
    add: (useStore) => {
        root[useStore.$id] = useStore();
    }
});
export const useZikkurat = (id) => {
    return id ? root[id] : root;
};
//# sourceMappingURL=createZikkurat.js.map