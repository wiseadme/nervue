import {
  ref,
  reactive,
  toRefs,
  computed,
  effectScope,
  toRaw,
  markRaw,
  onUnmounted,
  getCurrentInstance,
  UnwrapRef,
  UnwrapNestedRefs,
} from 'vue-demi'
// Helpers
import { logWarning, merge } from './helpers'
// Types
import {
  StateTree,
  ComputedTree,
  StoreDefinition,
  StoreOptions,
  Store,
  Method,
  SubscribeOptions,
  Unsubscribe,
  PluginContext,
  SubscribersLists,
  _StoreWithProperties,
} from './types'

import { useNervue } from './createNervue'

function setupStore<
  Id extends string,
  S extends StateTree = {},
  G /*extends GuardsTree*/ = {},
  C extends ComputedTree<S> = {},
  A /*extends ActionsTree*/ = {},
>(
  options: StoreOptions<Id, S, G, C, A>
){
  const {
    id,
    state,
    actions,
    guards,
    computed: $computed
  } = options

  const { assign } = Object

  /**
   * @param {string} storeId - store id
   * @param {object} state - state to wrap
   * @param {object} guards - guards to protect the state
   * @returns {proxy} wrapped state
   */
  function wrapState(
    storeId: Id,
    state: S,
    guards: G
  ){

    function get(target, prop, receiver){
      return Reflect.get(target, prop, receiver)
    }

    type GuardReturnType = { next: boolean, value?: any }

    function set(target, prop, value, receiver){
      let result = { next: false, value } as GuardReturnType

      const { stringify } = JSON

      if (guards[prop]) {

        for (const fn of guards[prop]!) {
          const ret = fn(result.value)

          result.next = ret.next
          value = ret.value || value
          result.value = value

          if (__DEV__ && !result.next) {
            logWarning(
              `{guards}: ${ stringify(value) } is invalid value for the`,
              `${ stringify(prop) } of the ${ stringify(storeId) } store state`
            )

            break
          }
        }
      }

      if (result.next) {
        return Reflect.set(target, prop, result.value, receiver)
      }

      return true
    }

    return new Proxy(state, { get, set })
  }

  const subscriptionsBefore: Record<string, Method[]> = {}
  const subscriptionsAfter: Record<string, Method[]> = {}
  const subscriptionsOnError: Record<string, Method[]> = {}

  /**
   * @param {object} options - options for subscribing
   * @returns {Unsubscribe} - unsubscribe function
   */
  function $subscribe(options: SubscribeOptions<A>): Unsubscribe{
    const { name, detached, before, after, onError } = options

    if (before && !subscriptionsBefore[name]) {
      subscriptionsBefore[name] = []
    }

    if (after && !subscriptionsAfter[name]) {
      subscriptionsAfter[name] = []
    }

    if (onError && !subscriptionsOnError[name]) {
      subscriptionsOnError[name] = []
    }

    let bInd, aInd, oInd

    before && (bInd = subscriptionsBefore[name].push(before) - 1)
    after && (aInd = subscriptionsAfter[name].push(after) - 1)
    onError && (oInd = subscriptionsOnError[name].push(onError) - 1)

    function unsubscribe(): Promise<boolean>{
      return new Promise((resolve) => {
        subscriptionsBefore[name]?.splice(bInd, 1)
        subscriptionsAfter[name]?.splice(aInd, 1)
        subscriptionsOnError[name]?.splice(oInd, 1)

        resolve(true)
      })
    }

    if (!detached && getCurrentInstance()) {
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
   * @param name {string} - name of action
   * @returns {object} object of existing subscribers
   */
  function getSubscribers(name: string): SubscribersLists{
    return {
      beforeList: subscriptionsBefore[name],
      afterList: subscriptionsAfter[name],
      onErrorList: subscriptionsOnError[name]
    }
  }

  /***
   * @param {object} store - current store instance
   * @param {string} name - name of action
   * @param {function} action - action to wrap
   * @returns {function} a wrapped action to handle subscriptions
   */
  function wrapAction(
    store: UnwrapNestedRefs<Store<Id, S, G, C, A>>,
    name: string,
    action: Method
  ){
    return function (){
      const {
        beforeList,
        afterList,
        onErrorList
      } = getSubscribers(name)

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

  function $patch(mutator: Record<keyof S, any>): void
  function $patch(mutator: (state: UnwrapRef<S>) => void): void
  function $patch(mutator: any){
    if (typeof mutator === 'function') {
      mutator(this.$state)
    } else if (typeof mutator === 'object') {
      merge(this.$state, mutator)
    }
  }

  const initialState = state?.() || {}
  const guardedState = guards ? wrapState(id, initialState as S, guards as G) : null
  const stateRef = ref(guardedState || initialState) as UnwrapRef<S>

  /**
   * defining store properties
   */
  const _storeProperties = {} as _StoreWithProperties<Id, S, G, C, A>

  _storeProperties.$id = id
  _storeProperties.$patch = $patch
  _storeProperties.$subscribe = $subscribe

  Object.defineProperty(_storeProperties, '$state', {
    get: () => toRaw(stateRef.value),
    set: (val) => {
      $patch(val)
    }
  })

  Object.defineProperty(_storeProperties, '_guards', {
    writable: false,
    configurable: true,
    value: guards || {}
  })

  Object.defineProperty(_storeProperties, '_computed', {
    writable: false,
    configurable: true,
    value: Object.keys($computed! || {})
  })

  const store = reactive(assign(
    _storeProperties,
    toRefs(stateRef.value),
    actions,
    Object.keys($computed || {}).reduce((mods, key) => {
      // @ts-ignore
      mods[key] = markRaw(computed(() => $computed![key].call(store, store)))
      return mods
    }, {})
  )) as UnwrapNestedRefs<Store<Id, S, G, C, A>>

  if (actions) {
    Object.keys(actions).forEach(name => {
      const action = store[name];
      (store as any)[name] = wrapAction(store, name, action)
    })
  }

  return store
}

/**
 * @param {StoreOptions} options - store definition options object
 * @returns {StoreDefinition} useStore function
 */
export function defineStore<
  Id extends string,
  S extends StateTree = {},
  G /*extends GuardsTree*/ = {},
  C extends ComputedTree<S> = {},
  A /*extends ActionsTree*/ = {},
>(
  options: StoreOptions<Id, S, G, C, A>
): StoreDefinition<Id, S, G, C, A>{

  const { assign } = Object

  const nervue = useNervue()

  /**
   * create the store and wrapping
   * into reactive for unwrapping the refs
   */
  const store = nervue._e.run(() => {
    const scope = effectScope()
    /**
     * effects scope for the created store
     */
    return scope.run(() => setupStore(options))
  }) as UnwrapNestedRefs<Store<Id, S, G, C, A>>
  /**
   * wrapping the actions to handle subscribers
   */

  const useStore = () => store

  const plugins = {}

  /**
   * install plugins
   */
  nervue?._p.forEach(pl => assign(plugins, (pl({ store, options } as PluginContext) || {})))

  assign(store, plugins)

  useStore.$id = store.$id
  /**
   * set useStore to the root object
   */
  nervue.set(useStore)

  return useStore as StoreDefinition<Id, S, G, C, A>
}
