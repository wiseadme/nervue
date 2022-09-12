export function $patch(mutator) {
    const mutatorType = typeof mutator;
    if (mutatorType === 'function') {
        mutator(this.$state);
    }
    else if (mutatorType === 'object') {
    }
}
//# sourceMappingURL=patch.js.map