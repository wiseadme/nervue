import {
  ActionsTree,
  GuardsTree,
  StateTree,
  StoreDefinition,
  StoreOptions,
  _StoreWithProperties,
  _StoreWithGuards,
} from './types'
import { convertToRefs } from './helpers'
import { proxify } from './proxify'
import { $patch } from './patch'

/***
 * @param options
 */
export const defineStore = <
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}>(
  { id, state, actions, guards }: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A> => {
  const { assign, defineProperties } = Object
  /**
   * Defining store properties
   */
  const stateRefs = state ? convertToRefs(state()): {}

  const _storeProperties = defineProperties({}, {
    $id: { writable: false, configurable: false, value: id },
    $guards: { writable: false, configurable: false, value: guards || {} },
    $patch: { value: $patch },
  }) as _StoreWithProperties<Id> & _StoreWithGuards<S, G>

  /**
   * Defining store state and actions
   * and fusion with store properties
   */

  const _store = assign(_storeProperties, stateRefs, actions)

  // _store.$state = {}

  Object.defineProperty(_store, '$state', {
    get: () => storeProxy.$state,
    set: (state) => {
      Object.keys(state).forEach(key => storeProxy[key] = state[key])
    }
  })

  /**
   * Wrapping the store into proxy to access
   * to the state properties via "this".
   */
  const storeProxy = proxify(_store)

  actions && Object.keys(actions).forEach(key => {
    (_store as any)[key] = function () {
      return actions[key].call(storeProxy, ...arguments)
    }
  })

  const useStore = () => storeProxy

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
