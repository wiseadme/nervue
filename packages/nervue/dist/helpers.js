// import { reactive, toRefs } from 'vue'
// export const convertToRefs = (stateDefinitionObject) => {
//   return toRefs(reactive(stateDefinitionObject))
// }
export const logWarning = (...args) => {
    console.warn(`[nervue]:`, ...args);
};
export const logError = (...args) => {
    console.error(`[nervue]:`, ...args);
};
//# sourceMappingURL=helpers.js.map