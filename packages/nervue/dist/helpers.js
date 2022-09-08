import { reactive, toRefs } from 'vue';
export const convertToRefs = stateDefiningObject => {
    return toRefs(reactive(stateDefiningObject));
};
export const logWarning = (msg) => {
    console.warn(`[nervue]:`, msg);
};
export const logError = (msg) => {
    console.error(`[nervue]:`, msg);
};
//# sourceMappingURL=helpers.js.map