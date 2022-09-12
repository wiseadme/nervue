import { ref, toRefs, reactive, UnwrapNestedRefs } from 'vue'
import { $patch } from './patch'
import {
  $subscribe,
  getAllSubscribers,
  triggerSubs
} from './subscriptions'

import type {
  ActionsTree,
  GuardsTree,
  StateTree,
  StoreDefinition,
  StoreOptions,
  Store,
  Guards,
  _StoreWithProperties,
  _StoreWithGuards, Method,
} from './types'

/***
 * @param store
 * @param name
 * @param action
 */

function wrapAction(
  store: UnwrapNestedRefs<Store>,
  name: string,
  action: Method
) {
  return (...args) => {
    const {
      beforeList,
      afterList,
      onErrorList
    } = getAllSubscribers(store.$id, name)

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
 */
export function defineStore<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(
  options: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A> {

  const { id, state, actions, guards } = options

  const stateRef = ref(state?.() || {})

  const { assign } = Object

  /**
   * defining store properties
   */
  const _storeProperties = {} as _StoreWithProperties<Id> & _StoreWithGuards<S, G>

  _storeProperties.$id = id
  _storeProperties.$guards = (guards || {}) as Guards<G, S>
  _storeProperties.$patch = $patch
  _storeProperties.$subscribe = $subscribe

  Object.defineProperty(_storeProperties, '$state', {
    get: () => stateRef.value,
    set: (val) => stateRef.value = val
  })

  /**
   * create the store and wrapping
   * into reactive for unwrapping the refs
   * and for getting access to state refs
   * without "value"
   */
  const _store = reactive(assign(
    _storeProperties,
    toRefs(stateRef.value),
    actions
  )) as UnwrapNestedRefs<Store>

  /**
   * wrapping the actions to handle subscribers
   */
  actions && Object.keys(actions).forEach(name => {
    (_store as any)[name] = wrapAction(_store, name, _store[name])
  })

  const useStore = () => _store as Store<Id, S, G, A>

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
