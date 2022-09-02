import { isRef } from 'vue';
export const mapActions = (useStore) => {
    const store = useStore();
    const map = {};
    for (const key of Object.keys(store)) {
        if (typeof store[key] === 'function') {
            map[key] = store[key];
        }
    }
    return map;
};
export const mapState = (useStore) => {
    const store = useStore();
    const map = {};
    for (const key of Object.keys(store)) {
        if (isRef(store[key])) {
            map[key] = store[key];
        }
    }
    return map;
};
//# sourceMappingURL=mapHelpers.js.map