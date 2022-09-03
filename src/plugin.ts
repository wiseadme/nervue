import { ActionsTree, StateTree, StoreDefinition, StoreOptions } from './types'
import { defineState, defineActions } from './definers'
import { wrapToProxy } from './helpers'

/***
 * @param id
 * @param options
 */
export const defineStore = <Id extends string, S extends StateTree = {}, A extends ActionsTree = {}>
(id: Id, { state, actions }: StoreOptions<S, A>): StoreDefinition<Id, S, A> => {

  const store = {
    $id: id,
    ...defineState(id, state),
    ...defineActions(id, actions)
  }

  const storeProxy = wrapToProxy(store)

  Object.keys(actions).forEach(key => {
    store[key] = (...args) => actions[key].call(storeProxy, ...args)
  })

  const useStore = () => storeProxy

  useStore.$id = id

  return useStore as StoreDefinition<Id, S, A>
}
