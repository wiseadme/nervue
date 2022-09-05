/**
 * @param useStore
 * @param mapOrKeys
 */
export const mapActions = (useStore, mapOrKeys) => {
    const store = useStore();
    const map = {};
    if (mapOrKeys) {
        /**
         * if the map is just a simple array with
         * keys of the actions of store
         */
        if (Array.isArray(mapOrKeys)) {
            mapOrKeys.forEach(key => {
                map[key] = store[key];
            });
            /**
             * or it just simple keys map
             * with custom namings
             */
        }
        else {
            Object.keys(mapOrKeys).forEach(key => {
                map[key] = store[mapOrKeys[key]];
            });
        }
    }
    else {
        for (const key of Object.keys(store)) {
            if (typeof store[key] === 'function') {
                map[key] = store[key];
            }
        }
    }
    return map;
};
/**
 * @param useStore
 * @param mapOrKeys
 */
export const mapState = (useStore, mapOrKeys) => {
    const map = {};
    if (mapOrKeys) {
        /**
         * if the map is just a simple array with
         * keys of the state of store
         */
        if (Array.isArray(mapOrKeys)) {
            mapOrKeys.forEach((key) => {
                map[key] = function () {
                    return useStore()[key];
                };
            });
        }
        else {
            /**
             * if map of keys is the functions map
             * or simple keys map
             */
            Object.keys(mapOrKeys).forEach((key) => {
                map[key] = function () {
                    const store = useStore();
                    if (typeof mapOrKeys[key] === 'function') {
                        return mapOrKeys[key].call(this, store);
                    }
                    return store[mapOrKeys[key]];
                };
            });
        }
    }
    else {
        const store = useStore();
        /**
         * if map of keys doesn't exists
         * should return map of all state properties
         * without any action functions from the store
         */
        Object.keys(store).forEach((key) => {
            if (typeof store[key] !== 'function') {
                map[key] = function () {
                    return store[key];
                };
            }
        });
    }
    return map;
};
//# sourceMappingURL=mapHelpers.js.map