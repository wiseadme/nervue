import { createStoreProxyWrapper, createStateProxyWrapper } from './createProxy'
import { $patch } from './patch'
import { convertToRefs } from './helpers'
import {
  ActionsTree,
  GuardsTree,
  StateTree,
  StoreId,
  StoreDefinition,
  StoreOptions,
  _StoreWithProperties,
  _StoreWithGuards,
} from './types'

/***
 * @param options
 */
export const defineStore = <
  Id extends StoreId,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(
  { id, state, actions, guards }: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A> => {
  let proxyStoreState, stateRefs

  const { assign, defineProperties } = Object
  /**
   * converting state props into refs
   * and wrapping into Proxy
   */
  if (state) {
    stateRefs = convertToRefs(state())
    proxyStoreState = createStateProxyWrapper(stateRefs)
  }
  /**
   * defining store properties
   */
  const _storeProperties = defineProperties({}, {
    $id: { writable: false, configurable: false, value: id },
    $state: { writable: false, configurable: false, value: proxyStoreState },
    $guards: { writable: false, configurable: false, value: guards || {} },
    $patch: { value: $patch }
  }) as _StoreWithProperties<Id> & _StoreWithGuards<S, G>

  /**
   * Defining store state and actions
   * and fusion with store properties
   */

  const _store = assign(_storeProperties, stateRefs, actions)

  /**
   * Wrapping the store into proxy to access
   * to the state properties via "this".
   */
  const storeProxy = createStoreProxyWrapper(_store)

  actions && Object.keys(actions).forEach(key => {
    (_store as any)[key] = function (){
      return actions[key].call(storeProxy, ...arguments)
    }
  })

  const useStore = () => storeProxy

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
