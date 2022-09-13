import { ref, toRefs, reactive, UnwrapNestedRefs } from 'vue'
import { getRoot } from './createNervue'
import { $patch } from './patch'
import { $share } from './share'
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
  Guards,
  Method,
  _StoreWithProperties,
} from './types'

/**
 * @param storeId - store id
 * @param state - state map
 * @param guards - guards map
 * @returns proxy with guarded state
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
      let isGuarded = true

      if (guards[prop]) {
        /**
         * check guards map type
         */
        if (Array.isArray(guards[prop])) {
          isGuarded = guards[prop]!.every(fn => fn(value))
        } else {
          logWarning(
            `{guards}: wrong type of guards map in the "${ storeId }" store.`,
            `Guards should be an array of functions.`
          )
        }
      }

      if (!isGuarded) {
        logWarning(
          `{guards}: The value "${ value }" is not valid for mutation the value`,
          `of state property "${ prop as string }" in the "${ storeId }" store`
        )
      }

      if (isGuarded) {
        return Reflect.set(target, prop, value, receiver)
      }

      return true
    }
  })
}


/***
 * @param store - current store instance
 * @param name - name of action
 * @param action - action to wrap
 * @returns a wrapped action to handle subscriptions
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
 * @param options - store definition object
 * @returns store instance
 */
export function defineStore<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(
  options: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A>{
  const { id, state, actions, guards } = options

  let initialState = state?.() || {}

  const guardedState = guards ? addStateGuards<S, G>(id, initialState as S, guards) : null
  const stateRef = ref(guardedState || initialState)

  const { assign } = Object
  /**
   * defining store properties
   */
  const _storeProperties = {} as _StoreWithProperties<Id, S, G, A>

  _storeProperties.$id = id
  _storeProperties.$guards = (guards || {}) as Guards<G, S>
  _storeProperties.$patch = $patch
  _storeProperties.$subscribe = $subscribe
  _storeProperties.$share = $share
  _storeProperties._shares = {}

  Object.defineProperty(_storeProperties, '$state', {
    get: () => stateRef.value,
    set: (val) => stateRef.value = val
  })

  const _root = getRoot()

  Object.defineProperties(_storeProperties, {
    _r: { get: () => _root },
    _shares: { get: () => _root._shares }
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
    actions
  )) as UnwrapNestedRefs<Store>
  /**
   * wrapping the actions to handle subscribers
   */
  actions && Object.keys(actions).forEach(name => {
    const action = store[name]
    store[name] = wrapAction(store, name, action)
  })

  const useStore = () => store as Store<Id, S, G, A>

  useStore.$id = store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
