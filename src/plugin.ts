import { ActionsTree, StateTree, Store, StoreDefinition, StoreOptions } from './types'
import { defineState, defineActions } from './definers'
import { wrapIntoProxy } from './helpers'

/***
 * @param id
 * @param options
 */
export const defineStore = <
  Id extends string,
  S extends StateTree = {},
  A extends ActionsTree = {}
  >(options: StoreOptions<Id, S, A>): StoreDefinition<Id, S, A> => {

  const state = defineState(options.id, options.state!)
  const actions = defineActions(options.id, options.actions)
  const $id = options.id

  const _store = { $id, ...state, ...actions } as Store

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
