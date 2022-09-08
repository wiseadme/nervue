import {
  ActionsTree,
  GuardsTree,
  StateTree,
  Store,
  StoreDefinition,
  StoreOptions,
  _StoreWithProperties,
  _StoreWithGuards,
} from './types'
import { convertToRefs } from './helpers'
import { proxify } from './proxify'

/***
 * @param options
 */
export const defineStore = <
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(
  { id, state, actions, guards }: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A> => {
  const { assign, defineProperties } = Object
  /**
   * Defining store properties
   */
  const _storeProperties = defineProperties({}, {
    $id: { value: id, writable: false, configurable: false },
    $guards: { value: guards || {}, writable: true, configurable: true }
  }) as _StoreWithProperties<Id> & _StoreWithGuards<S, G>
  /**
   * Defining store state and actions
   * and fusion with store properties
   */
  const _store = assign(_storeProperties, {
    ...convertToRefs(state?.() || {}),
  }, actions) as Store
  /**
   * Wrapping the store into proxy to access
   * to the state properties via "this".
   * Will also serve to develop further
   * "guard" and "share" functionality.
   */
  const storeProxy = proxify(_store) as Store<Id, S, G, A>

  actions && Object.keys(actions).forEach(key => {
    _store[key] = function() {
      return actions[key].call(storeProxy, ...arguments)
    }
  })

  const useStore = () => storeProxy

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
