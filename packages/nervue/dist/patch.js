function mergeObjects(target, newState) {
    if (target.toString().includes('Map')) {
        newState.forEach((it, key) => target.set(key, it));
    }
    if (target.toString().includes('Object')) {
        Object.keys(newState).forEach((key) => {
            target[key] = newState[key];
        });
    }
}
export function $patch(mutator) {
    if (typeof mutator === 'function') {
        mutator(this.$state);
    }
    else if (typeof mutator === 'object') {
        mergeObjects(this.$state, mutator);
    }
}
//# sourceMappingURL=patch.js.map