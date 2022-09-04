// import { definesMap } from './definers'
// import { wrapToProxy } from './helpers'
/**
 * @param useStore
 * @param mapOrKeys
 */
export const mapActions = (useStore, mapOrKeys) => {
    const store = useStore();
    const map = {};
    if (mapOrKeys) {
        console.log(mapOrKeys);
    }
    for (const key of Object.keys(store)) {
        if (typeof store[key] === 'function') {
            map[key] = store[key];
        }
    }
    return map;
};
/**
 * @param useStore
 * @param mapOrKeys
 */
export const mapState = (useStore, mapOrKeys) => {
    const stateMap = {};
    if (mapOrKeys) {
        /**
         * if map is just simple array with
         * keys of store state
         */
        if (Array.isArray(mapOrKeys)) {
            mapOrKeys.forEach((key) => {
                stateMap[key] = function () {
                    return useStore()[key];
                };
            });
        }
        else {
            /**
             * if map of keys is the functions map
             */
            Object.keys(mapOrKeys).forEach((key) => {
                stateMap[key] = function () {
                    const store = useStore();
                    if (typeof mapOrKeys[key] === 'function') {
                        return mapOrKeys[key].call(this, store);
                    }
                };
            });
        }
    }
    else {
        const store = useStore();
        /**
         * if map of keys doesn't exists
         * should return map of all state properties
         * without any action functions from store
         */
        Object.keys(store).forEach((key) => {
            if (typeof store[key] !== 'function') {
                stateMap[key] = function () {
                    return store[key];
                };
            }
        });
    }
    return stateMap;
};
//# sourceMappingURL=mapHelpers.js.map