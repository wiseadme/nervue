import { App } from 'vue'
import { root } from './root'
import { ActionsTree, GuardsTree, StateTree, Store } from './types'
import { logWarning } from './helpers'

export const createNervue = () => ({
  install: (app: App) => {
    if ((createNervue as any).isInstalled) return
    (createNervue as any).isInstalled = true

    app.provide('$n', root)
  },

  add: (useStore) => {
    root[useStore.$id] = useStore()
  }
})

export const useNervue = <
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
  >(id?: Id): Store<Id, S, G, A> | Record<string, Store<Id, S, G, A>> | void => {
  const storeKey = id?.toString() || id

  if (id && !root[id]) {
    return logWarning(`"${ String(storeKey) }" id doesn't exists in the root store`)
  }

  return id ?
    root[id] as Store<Id, S, G, A> :
    root as Record<string, Store<Id, S, G, A>>
}
