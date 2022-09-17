import { ref, toRefs, reactive, toRaw, markRaw, computed, UnwrapNestedRefs } from 'vue'
import { getRoot } from './createNervue'
import { $patch } from './patch'
import { $expose } from './expose'
import {
  $subscribe,
  getSubscribers,
  triggerSubs
} from './subscriptions'
import { logWarning } from './helpers'
// Types
import type {
  ActionsTree,
  GuardsTree,
  StateTree,
  StoreDefinition,
  StoreOptions,
  Store,
  Method,
  _StoreWithProperties, ExposesTree, GuardMethod, ModifiersTree,
} from './types'

/**
 * @param {string} storeId - store id
 * @param {object} state - state map
 * @param {object} guards - guards map
 * @returns {proxy} proxy with guarded state
 */
export function addStateGuards<
  S extends StateTree,
  G extends GuardsTree<S>
>(storeId: string, state: S, guards: G){
  return new Proxy(state, {
    get: (target, prop, receiver) => {
      return Reflect.get(target, prop, receiver)
    },
    set: (target, prop, value, receiver) => {
      let result = { next: true, value } as ReturnType<GuardMethod>

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
                `{guards}: The value "${ value }" is not valid for mutation the value`,
                `of state property "${ prop as string }" in the "${ storeId }" store`
              )

              break
            }
          }
        } else {
          logWarning(
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

/***
 * @param {object} store - current store instance
 * @param {string} name - name of action
 * @param {function} action - action to wrap
 * @returns {function} a wrapped action to handle subscriptions
 */
function wrapAction(
  store: UnwrapNestedRefs<Store>,
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

    if (beforeList) triggerSubs(beforeList)

    let result

    try {
      result = action.call(store, ...args)
    } catch (error) {
      if (onErrorList) triggerSubs(onErrorList, error)
      throw error
    }

    if (result instanceof Promise) {
      return result
        .then(res => {
          if (afterList) triggerSubs(afterList, res)
          return res
        })
        .catch(error => {
          if (onErrorList) triggerSubs(onErrorList, error)
          return Promise.reject(error)
        })
    }

    if (afterList) triggerSubs(afterList, result)

    return result
  }
}

/**
 * @param {object} options - store definition object
 * @returns {Store} store instance
 */
export function defineStore<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  M extends ModifiersTree = {},
  A extends ActionsTree = {},
  E extends ExposesTree = ExposesTree
>(
  options: StoreOptions<Id, S, G, M, A, E>
): StoreDefinition<Id, S, G, M, A>{
  const { id, state, actions, modifiers, guards, expose } = options
  const _root = getRoot()

  let initialState = state?.() || {}

  const guardedState = guards ? addStateGuards<S, G>(id, initialState as S, guards) : null
  const stateRef = ref(guardedState || initialState)

  const { assign } = Object
  /**
   * defining store properties
   */
  const _storeProperties = {} as _StoreWithProperties<Id, S, G, E>

  _storeProperties.$id = id
  _storeProperties.$patch = $patch
  _storeProperties.$subscribe = $subscribe
  _storeProperties.$expose = $expose

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

  Object.defineProperty(_storeProperties, '$modifiers', {
    writable: false,
    configurable: false,
    value: Object.keys(modifiers! || {})
  })

  Object.defineProperty(_storeProperties, '_exposed', {
    value: _root._exposed,
    writable: false,
    configurable: false
  })

  /**
   * create the store and wrapping
   * into reactive for unwrapping the refs
   * and for getting access to state refs
   * without "value"
   */
  const store = reactive(assign(
    _storeProperties,
    toRefs(stateRef.value),
    actions,
    Object.keys(modifiers || {}).reduce((mods, key) => {
      mods[key] = markRaw(computed(() => modifiers![key].call(store)))
      return mods
    }, {})
  )) as UnwrapNestedRefs<Store>
  /**
   * wrapping the actions to handle subscribers
   */
  actions && Object.keys(actions).forEach(name => {
    const action = store[name]
    store[name] = wrapAction(store, name, action)
  })

  if (expose) {
    $expose.call(store, expose)
  }

  const useStore = () => store

  useStore.$id = store.$id

  return useStore as StoreDefinition<Id, S, G, M, A>
}
