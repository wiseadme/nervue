import { reactive, toRefs, isRef } from 'vue';
export const wrapToProxy = store => new Proxy(store, {
    get: (obj, prop) => {
        if (!obj[prop])
            return null;
        return isRef(obj[prop]) ? Reflect.get(obj[prop], 'value') : Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
        Reflect.set(obj[prop], 'value', value);
        return true;
    }
});
export const convertToRefs = stateDefinerObject => {
    return toRefs(reactive(stateDefinerObject));
};
//# sourceMappingURL=helpers.js.map