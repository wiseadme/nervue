import { ActionsTree, StateTree, Store, StoreDefinition, StoreOptions } from './types'
import { wrapIntoProxy, convertToRefs } from './helpers'

/***
 * @param options
 */
export const defineStore = <
  Id extends string,
  S extends StateTree = {},
  A extends ActionsTree = {}
  >({ id, state, actions }: StoreOptions<Id, S, A>): StoreDefinition<Id, S, A> => {

  const _store = {
    $id: id as string,
    ...convertToRefs(state?.() || {}),
    ...actions
  } as Store

  /**
   * Wrapping the store into proxy to access
   * to the state properties via "this".
   * Will also serve to develop further
   * "guard" and "share" functionality.
   */
  const storeProxy = wrapIntoProxy(_store)

  actions && Object.keys(actions).forEach(key => {
    _store[key] = function() {
      return actions[key].call(storeProxy, ...arguments)
    }
  })

  const useStore = <
    Id extends string,
    S extends StateTree,
    A extends ActionsTree
    >() => storeProxy as Store<Id, S, A>

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, A>
}
