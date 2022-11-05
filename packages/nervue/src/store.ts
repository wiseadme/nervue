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
import { logWarning, logError, typeOf } from './helpers'
// Types
import {
  StateTree,
  ExposesTree,
  ComputedTree,
  StoreDefinition,
  StoreOptions,
  Store,
  Method,
  SubscribeOptions,
  Unsubscribe,
  ExistingSubscribers,
  _StoreWithProperties,
} from './types'

/***
 * @param target - state of store
 * @param patch - object to merge
 */
function merge(target, patch){
  if (typeOf(target) === 'map') {
    patch.forEach((it, key) => target.set(key, it))
  }

  for (const key in patch) {
    if (
      typeOf(patch[key]) === 'object'
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
 * @param {StoreOptions} options - store definition options object
 * @returns {StoreDefinition} useStore function
 */
export function defineStore<Id extends string,
  S extends StateTree = {},
  G /*extends GuardsTree*/ = {},
  C extends ComputedTree<S> = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}>(
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

  const { assign } = Object

  /***
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

    function stateGetter(target, prop, receiver){
      return Reflect.get(target, prop, receiver)
    }

    type GuardReturnType = { next: boolean, value?: any }

    function stateSetter(target, prop, value, receiver){
      let result = { next: false, value } as GuardReturnType

      const { stringify } = JSON

      if (guards[prop]) {
        /**
         * check guards map type
         */
        if (Array.isArray(guards[prop])) {

          for (const fn of guards[prop]!) {
            const ret = fn(result.value)

            result.next = ret.next
            value = ret.value || value
            result.value = value

            if (!result.next) {
              logWarning(
                `{guards}: ${ stringify(value) } is invalid value for the`,
                `${ stringify(prop) } of the ${ stringify(storeId) } store state`
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


    return new Proxy(state, {
      get: stateGetter,
      set: stateSetter
    })
  }

  const subscriptionsBefore: Record<string, Method[]> = {}
  const subscriptionsAfter: Record<string, Method[]> = {}
  const subscriptionsOnError: Record<string, Method[]> = {}

  /**
   * @param {object} options - options for subscribing
   * @returns {Unsubscribe} - unsubscribe function
   */
  function $subscribe(options: SubscribeOptions<A>): Unsubscribe{
    const { name, before, after, onError } = options

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
   * @param name {string} - name of action
   * @returns {object} object of existing subscribers
   */
  function getSubscribers(name: string): ExistingSubscribers{
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
    store: Store<Id, S, G, C, A, E>,
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

  const initialState = state?.() || {}
  const guardedState = guards ? wrapState(id, initialState as S, guards as G) : null
  const stateRef = ref(guardedState || initialState)

  /**
   * defining store properties
   */
  const _storeProperties = {} as _StoreWithProperties<Id, S, G, C, A, E>

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
    configurable: false,
    value: Object.keys($computed! || {})
  })

  Object.defineProperty(_storeProperties, '_expose', {
    value: Object.keys(expose || {}).map(key => key),
    writable: true,
    configurable: true
  })

  /***
   * this property will be redefined if
   * the store is added to the root
   */
  Object.defineProperty(_storeProperties, '$exposed', {
    value: {},
    writable: true,
    configurable: true
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
      // @ts-ignore
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

  const useStore = () => store

  useStore.$id = store.$id

  return useStore as StoreDefinition<Id, S, G, C, A, E>
}
