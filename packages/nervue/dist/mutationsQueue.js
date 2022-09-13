export const mutationsQueue = [];
export const addMutationToQueue = (mutator) => {
    mutationsQueue.push(mutator);
    return () => {
    };
};
//# sourceMappingURL=mutationsQueue.js.map