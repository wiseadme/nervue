import { ref, reactive, toRefs, toRaw, markRaw, getCurrentInstance, onUnmounted, computed, } from 'vue-demi';
import { getRoot } from './createNervue';
import { logWarning, logError } from './helpers';
/***
 * @param target
 * @param newState
 */
function mergeState(target, newState) {
    if (target.toString().includes('Map')) {
        newState.forEach((it, key) => target.set(key, it));
    }
    if (target.toString().includes('Object')) {
        Object.keys(newState).forEach((key) => {
            target[key] = newState[key];
        });
    }
}
/**
 * @param {object} options - store definition object
 * @returns {Store} store instance
 */
export function defineStore(options) {
    const { id, state, actions, guards, expose, computed: $computed } = options;
    const _root = getRoot();
    const { assign } = Object;
    /**
     * @param {string} storeId - store id
     * @param {object} state - state map
     * @param {object} guards - guards map
     * @returns {proxy} proxy with guarded state
     */
    function addStateGuards(storeId, state, guards) {
        return new Proxy(state, {
            get(target, prop, receiver) {
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let result = { next: true, value };
                const { stringify } = JSON;
                if (guards[prop]) {
                    /**
                     * check guards map type
                     */
                    if (Array.isArray(guards[prop])) {
                        for (const fn of guards[prop]) {
                            const ret = fn(result.value);
                            result.next = ret.next;
                            value = ret.value || value;
                            result.value = value;
                            if (!result.next) {
                                logWarning(`{guards}: ${stringify(value)} is invalid value for the`, `${stringify(prop)} of the ${stringify(storeId)} store state`);
                                break;
                            }
                        }
                    }
                    else {
                        logError(`{guards}: wrong type of guards map in the "${storeId}" store.`, `Guards should be an array of functions.`);
                    }
                }
                if (result.next) {
                    return Reflect.set(target, prop, result.value, receiver);
                }
                return true;
            }
        });
    }
    const subscriptionsBefore = {};
    const subscriptionsAfter = {};
    const onErrorSubscriptions = {};
    /**
     * @param {object} options - options for subscribing
     * @returns {Unsubscribe} - unsubscribe function
     */
    function $subscribe(options) {
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
        function unsubscribe() {
            return new Promise((resolve) => {
                subscriptionsBefore[subId]?.splice(bInd, 1);
                subscriptionsAfter[subId]?.splice(aInd, 1);
                onErrorSubscriptions[subId]?.splice(oInd, 1);
                resolve(true);
            });
        }
        if (options.detached && getCurrentInstance()) {
            onUnmounted(unsubscribe);
        }
        return unsubscribe;
    }
    /***
     * @param {array} subscribers - array of subscribers
     * @param {array} args - arguments for subscriber callback function
     */
    function triggerSubs(subscribers, ...args) {
        subscribers.slice().forEach(fn => fn(...args));
    }
    /***
     * @param {string} storeId
     * @param {string} name
     * @return {ExistingSubscribers}
     */
    function getSubscribers(storeId, name) {
        return {
            beforeList: subscriptionsBefore[`${storeId}/${name}`],
            afterList: subscriptionsAfter[`${storeId}/${name}`],
            onErrorList: onErrorSubscriptions[`${storeId}/${name}`]
        };
    }
    /***
     * @param {object} store - current store instance
     * @param {string} name - name of action
     * @param {function} action - action to wrap
     * @returns {function} a wrapped action to handle subscriptions
     */
    function wrapAction(store, name, action) {
        return function () {
            const { beforeList, afterList, onErrorList } = getSubscribers(store.$id, name);
            const args = Array.from(arguments);
            if (beforeList) {
                triggerSubs(beforeList, ...args);
            }
            let result;
            try {
                result = action.call(store, ...args);
            }
            catch (error) {
                if (onErrorList) {
                    triggerSubs(onErrorList, error);
                }
                throw error;
            }
            if (result instanceof Promise) {
                return result
                    .then(res => {
                    if (afterList) {
                        triggerSubs(afterList, res);
                    }
                    return res;
                })
                    .catch(error => {
                    if (onErrorList) {
                        triggerSubs(onErrorList, error);
                    }
                    return Promise.reject(error);
                });
            }
            if (afterList) {
                triggerSubs(afterList, result);
            }
            return result;
        };
    }
    /***
     * @param {(state: UnwrapRef<S>) => (void | Partial<UnwrapRef<S>>)} mutator
     */
    function $patch(mutator) {
        if (typeof mutator === 'function') {
            mutator(this.$state);
        }
        else if (typeof mutator === 'object') {
            mergeState(this.$state, mutator);
        }
    }
    /***
     * @param {E} exposes
     */
    function $expose(exposes) {
        if (this._exposed[this.$id]) {
            return;
        }
        const root = getRoot();
        root._exposed[this.$id] = {};
        for (const key in exposes) {
            if (this.hasOwnProperty(key) && exposes[key]) {
                if (typeof this[key] === 'function') {
                    root._exposed[this.$id][key] = (...args) => {
                        this[key].call(this, ...args);
                    };
                }
                else {
                    root._exposed[this.$id][key] = computed(() => this[key]);
                }
            }
        }
    }
    const initialState = state?.() || {};
    const guardedState = guards ? addStateGuards(id, initialState, guards) : null;
    const stateRef = ref(guardedState || initialState);
    /**
     * defining store properties
     */
    const _storeProperties = {};
    _storeProperties.$id = id;
    _storeProperties.$patch = $patch;
    _storeProperties.$subscribe = $subscribe;
    _storeProperties.$expose = $expose;
    Object.defineProperty(_storeProperties, '$state', {
        get: () => toRaw(stateRef.value),
        set: (val) => {
            $patch(val);
        }
    });
    Object.defineProperty(_storeProperties, '$guards', {
        writable: false,
        configurable: true,
        value: guards || {}
    });
    Object.defineProperty(_storeProperties, '$computed', {
        writable: false,
        configurable: false,
        value: Object.keys($computed || {})
    });
    Object.defineProperty(_storeProperties, '_exposed', {
        value: _root._exposed,
        writable: false,
        configurable: false
    });
    /**
     * create the store and wrapping
     * into reactive for unwrapping the refs
     */
    const store = reactive(assign(_storeProperties, toRefs(stateRef.value), actions, Object.keys($computed || {}).reduce((mods, key) => {
        mods[key] = markRaw(computed(() => $computed[key].call(store, store.$state)));
        return mods;
    }, {})));
    /**
     * wrapping the actions to handle subscribers
     */
    if (actions) {
        Object.keys(actions).forEach(name => {
            const action = store[name];
            store[name] = wrapAction(store, name, action);
        });
    }
    if (expose) {
        $expose.call(store, expose);
    }
    const useStore = () => store;
    useStore.$id = store.$id;
    return useStore;
}
//# sourceMappingURL=store.js.map