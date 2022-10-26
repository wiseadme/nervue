import { onUnmounted, getCurrentInstance } from 'vue';
export const subscriptionsBefore = {};
export const subscriptionsAfter = {};
export const onErrorSubscriptions = {};
/**
 * @param {object} options - options for subscribing
 * @returns {Unsubscribe} - unsubscribe function
 */
export function $subscribe(options) {
    const { name, before, after, onError } = options;
    const subId = `${this.$id}/${name}`;
    if (before && !subscriptionsBefore[subId]) {
        subscriptionsBefore[subId] = [];
    }
    if (after && !subscriptionsAfter[subId]) {
        subscriptionsAfter[subId] = [];
    }
    if (onError && !onErrorSubscriptions[subId]) {
        onErrorSubscriptions[subId] = [];
    }
    let bInd, aInd, oInd;
    before && (bInd = subscriptionsBefore[subId].push(before) - 1);
    after && (aInd = subscriptionsAfter[subId].push(after) - 1);
    onError && (oInd = onErrorSubscriptions[subId].push(onError) - 1);
    const unsubscribe = () => {
        return new Promise((resolve) => {
            subscriptionsBefore[subId].splice(bInd, 1);
            subscriptionsAfter[subId].splice(aInd, 1);
            onErrorSubscriptions[subId].splice(oInd, 1);
            resolve(true);
        });
    };
    if (options.detached && getCurrentInstance()) {
        onUnmounted(unsubscribe);
    }
    return unsubscribe;
}
/***
 * @param {array} subscribers - array of subscribers
 * @param {array} args - arguments for subscriber callback function
 */
export function triggerSubs(subscribers, ...args) {
    subscribers.slice().forEach(fn => fn(...args));
}
/***
 * @param {string} storeId
 * @param {string} name
 * @return {ExistingSubscribers}
 */
export function getSubscribers(storeId, name) {
    return {
        beforeList: subscriptionsBefore[`${storeId}/${name}`],
        afterList: subscriptionsAfter[`${storeId}/${name}`],
        onErrorList: onErrorSubscriptions[`${storeId}/${name}`]
    };
}
//# sourceMappingURL=subscriptions.js.map