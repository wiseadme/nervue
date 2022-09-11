import { ref, toRefs, reactive } from 'vue'
import { $patch } from './patch'
import {
  $subscribe,
  getExistsSubscribers,
  trigger
} from './subscriptions'

import type {
  ActionsTree,
  GuardsTree,
  StateTree,
  StoreDefinition,
  StoreOptions,
  Store,
  _StoreWithProperties,
  _StoreWithGuards, Guards,
} from './types'

/**
 * @param options - store definition object
 */
export const defineStore = <
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(
  options: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A> => {

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
  ))

  /**
   * wrapping the actions to call
   * subscribers
   */
  actions && Object.keys(actions).forEach(key => {
    (_store as any)[key] = function (...args){
      let result, subs

      if ((_store[key] as any).hasSubs) {
        subs = getExistsSubscribers(id, key)
      }

      subs.before && trigger(subs.before)

      try {
        result = actions[key].call(_store, ...args)
      } catch (err) {
        trigger(subs.onError, err)
      }

      subs.after && trigger(subs.after, result)

      return result
    }
  })

  const useStore = () => _store as Store<Id, S, G, A>

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
