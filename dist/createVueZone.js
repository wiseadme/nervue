import { rootStore } from './rootStore';
export const createVueZone = () => ({
    install: (app) => {
        if (createVueZone.isInstalled)
            return;
        createVueZone.isInstalled = true;
        app.provide('$vz', rootStore);
    },
    add: (useStore) => {
        rootStore[useStore.$id] = useStore();
    }
});
export const useVueZone = (id) => {
    return id ? rootStore[id] : rootStore;
};
//# sourceMappingURL=createZikkurat.js.map
