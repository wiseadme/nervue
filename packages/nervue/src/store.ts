import {
  ref,
  reactive,
  toRefs,
  toRaw,
  markRaw,
  getCurrentInstance,
  onUnmounted,
  computed,
  UnwrapRef
} from 'vue-demi'
import { getRoot } from './createNervue'
import { logWarning, logError, typeOf } from './helpers'
// Types
import {
  ActionsTree,
  GuardsTree,
  StateTree,
  StoreDefinition,
  StoreOptions,
  Store,
  Method,
  ExposesTree,
  GuardMethod,
  ComputedTree,
  SubscribeOptions,
  Unsubscribe,
  ExistingSubscribers,
  _StoreWithProperties,
} from './types'

/***
 * @param target - state of store
 * @param patch - updates to merge
 */
function merge(target, patch){
  if (typeOf(target) === 'Map') {
    patch.forEach((it, key) => target.set(key, it))
  }

  for (const key in patch) {
    if (
      typeOf(patch[key]) === 'Object'
      && patch.hasOwnProperty(key)
    ) {
      target[key] = merge(target[key], patch[key])
    } else {
      target[key] = patch[key]
    }
  }

  return target
}

/**
 * @param {object} options - store definition object
 * @returns {Store} store instance
 */
export function defineStore<Id extends string,
  S extends StateTree = {},
  G extends GuardsTree = {},
  C extends ComputedTree = {},
  A extends ActionsTree = {},
  E extends ExposesTree = {}
>(
  options: StoreOptions<Id, S, G, C, A, E>
): StoreDefinition<Id, S, G, C, A, E>{
  const {
    id,
    state,
    actions,
    guards,
    expose,
    computed: $computed
  } = options

  const _root = getRoot()

  const { assign } = Object

  /***
   * @param {string} storeId - store id
   * @param {object} state - state map
   * @param {object} guards - guards map
   * @returns {proxy} proxy with guarded state
   */
  function addStateGuards<
    S extends StateTree,
    G extends GuardsTree
  >(
    storeId: Id,
    state: S,
    guards: G
  ){
    return new Proxy(state, {
      get(target, prop, receiver){
        return Reflect.get(target, prop, receiver)
      },
      set(target, prop, value, receiver){
        let result = { next: true, value } as ReturnType<GuardMethod>

        const { stringify } = JSON

        if (guards[prop as string]) {
          /**
           * check guards map type
           */
          if (Array.isArray(guards[prop as string])) {

            for (const fn of guards[prop as string]!) {
              const ret = fn(result.value)

              result.next = ret.next
              value = ret.value || value
              result.value = value

              if (!result.next) {
                logWarning(
                  `{guards}: ${ stringify(value) } is invalid value for the`,
                  `${ stringify(prop) as string } of the ${ stringify(storeId) } store state`
                )

                break
              }
            }
          } else {
            logError(
              `{guards}: wrong type of guards map in the "${ storeId }" store.`,
              `Guards should be an array of functions.`
            )
          }
        }

        if (result.next) {
          return Reflect.set(target, prop, result.value, receiver)
        }

        return true
      }
    })
  }

  const subscriptionsBefore = {}
  const subscriptionsAfter = {}
  const onErrorSubscriptions = {}

  /**
   * @param {object} options - options for subscribing
   * @returns {Unsubscribe} - unsubscribe function
   */
  function $subscribe(options: SubscribeOptions<A>): Unsubscribe{
    const { name, before, after, onError } = options
    const subId = `${ this.$id }/${ name as string }`

    if (before && !subscriptionsBefore[subId]) {
      subscriptionsBefore[subId] = []
    }

    if (after && !subscriptionsAfter[subId]) {
      subscriptionsAfter[subId] = []
    }

    if (onError && !onErrorSubscriptions[subId]) {
      onErrorSubscriptions[subId] = []
    }

    let bInd, aInd, oInd

    before && (bInd = subscriptionsBefore[subId].push(before) - 1)
    after && (aInd = subscriptionsAfter[subId].push(after) - 1)
    onError && (oInd = onErrorSubscriptions[subId].push(onError) - 1)

    function unsubscribe(): Promise<boolean>{
      return new Promise((resolve) => {
        subscriptionsBefore[subId]?.splice(bInd, 1)
        subscriptionsAfter[subId]?.splice(aInd, 1)
        onErrorSubscriptions[subId]?.splice(oInd, 1)

        resolve(true)
      })
    }

    if (options.detached && getCurrentInstance()) {
      onUnmounted(unsubscribe)
    }

    return unsubscribe
  }

  /***
   * @param {array} subscribers - array of subscribers
   * @param {array} args - arguments for subscriber callback function
   */
  function triggerSubs(subscribers, ...args: any[]){
    subscribers.slice().forEach(fn => fn(...args))
  }

  /***
   * @param storeId - store id
   * @param name - name of action
   * @returns {object} object of existing subscribers
   */
  function getSubscribers(storeId: string, name: string): ExistingSubscribers{
    return {
      beforeList: subscriptionsBefore[`${ storeId }/${ name }`],
      afterList: subscriptionsAfter[`${ storeId }/${ name }`],
      onErrorList: onErrorSubscriptions[`${ storeId }/${ name }`]
    }
  }

  /***
   * @param {object} store - current store instance
   * @param {string} name - name of action
   * @param {function} action - action to wrap
   * @returns {function} a wrapped action to handle subscriptions
   */
  function wrapAction(
    store: Store<Id, S, G, C, A, E>,
    name: string,
    action: Method
  ){
    return function (){
      const {
        beforeList,
        afterList,
        onErrorList
      } = getSubscribers(store.$id, name)

      const args = Array.from(arguments)

      if (beforeList) {
        triggerSubs(beforeList, ...args)
      }

      let result

      try {
        result = action.call(store, ...args)
      } catch (error) {
        if (onErrorList) {
          triggerSubs(onErrorList, error)
        }

        throw error
      }

      if (result instanceof Promise) {
        return result
          .then(res => {
            if (afterList) {
              triggerSubs(afterList, res)
            }

            return res
          })
          .catch(error => {
            if (onErrorList) {
              triggerSubs(onErrorList, error)
            }

            return Promise.reject(error)
          })
      }

      if (afterList) {
        triggerSubs(afterList, result)
      }

      return result
    }
  }

  /***
   * @param {(state: UnwrapRef<S>) => (void | Partial<UnwrapRef<S>>)} mutator
   */
  function $patch(mutator: (state: UnwrapRef<S>) => void | Partial<UnwrapRef<S>>){
    if (typeof mutator === 'function') {
      mutator(this.$state)
    } else if (typeof mutator === 'object') {
      merge(this.$state, mutator)
    }
  }

  /***
   * @param {E} exposes
   */
  function $expose(exposes: E){
    if (this._exposed[this.$id]) {
      return
    }

    const root = getRoot()
    root._exposed[this.$id] = {}

    for (const key in exposes) {
      if (this.hasOwnProperty(key) && exposes[key]) {
        if (typeof this[key] === 'function') {
          root._exposed[this.$id][key] = (...args) => {
            this[key].call(this, ...args)
          }
        } else {
          root._exposed[this.$id][key] = computed(() => this[key])
        }
      }
    }
  }

  const initialState = state?.() || {}
  const guardedState = guards ? addStateGuards<S, G>(id, initialState as S, guards) : null
  const stateRef = ref(guardedState || initialState)

  /**
   * defining store properties
   */
  const _storeProperties = {} as _StoreWithProperties<Id, S, G, C, A, E>

  _storeProperties.$id = id
  _storeProperties.$patch = $patch
  _storeProperties.$expose = $expose
  _storeProperties.$subscribe = $subscribe

  Object.defineProperty(_storeProperties, '$state', {
    get: () => toRaw(stateRef.value),
    set: (val) => {
      $patch(val)
    }
  })

  Object.defineProperty(_storeProperties, '$guards', {
    writable: false,
    configurable: true,
    value: guards || {}
  })

  Object.defineProperty(_storeProperties, '$computed', {
    writable: false,
    configurable: false,
    value: Object.keys($computed! || {})
  })

  Object.defineProperty(_storeProperties, '_exposed', {
    value: _root._exposed,
    writable: false,
    configurable: false
  })

  /**
   * create the store and wrapping
   * into reactive for unwrapping the refs
   */
  const store = reactive(assign(
    _storeProperties,
    toRefs(stateRef.value) as any,
    actions,
    Object.keys($computed || {}).reduce((mods, key) => {
      mods[key] = markRaw(computed(() => $computed![key].call(store, store.$state)))
      return mods
    }, {})
  )) as Store<Id, S, G, C, A, E>
  /**
   * wrapping the actions to handle subscribers
   */
  if (actions) {
    Object.keys(actions).forEach(name => {
      const action = store[name];
      (store as any)[name] = wrapAction(store, name, action)
    })
  }

  if (expose) {
    $expose.call(store, expose)
  }

  const useStore = () => store

  useStore.$id = store.$id

  return useStore
}
