import { App } from 'vue'
import { root } from './root'
import { ActionsTree, GuardsTree, StateTree, Store, StoreId } from './types'
import { logWarning } from './helpers'

export const createNervue = () => ({
  install: (app: App) => {
    if ((createNervue as any).isInstalled) return
    (createNervue as any).isInstalled = true

    app.provide('$n', root)
  },

  add: (useStore) => {
    root.set(useStore.$id, useStore())
  }
})

export const useNervue = <
  Id extends StoreId = string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
  >(id?: Id): Store<Id, S, G, A> | Map<StoreId, Store<Id, S, G, A>> | void => {
  const storeKey = id?.toString() || id

  console.log(storeKey, root)

  if (id && !root.has(id)) {
    return logWarning(`"${ String(storeKey) }" id doesn't exists in the root store`)
  }

  return id ?
    root.get(id) as Store<Id, S, G, A> :
    root as Map<StoreId, Store<Id, S, G, A>>
}
