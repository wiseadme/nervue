import { App, UnwrapNestedRefs, reactive } from 'vue-demi'
import { ActionsTree, GuardsTree, StateTree, Store } from './types'
import { logWarning } from './helpers'
import { root, ROOT_SYMBOL, Root } from './root'

export function createNervue(){
  return {
    install: (app: App) => {
      if (root.value.isInstalled) {
        return
      }

      root.value.isInstalled = true
      app.provide(ROOT_SYMBOL, root)
    },

    add: (useStore) => {
      root.value._stores[useStore.$id] = useStore()
    }
  }
}

export function getRoot (): UnwrapNestedRefs<Root> {
  return reactive(root.value)
}

export function useNervue<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(id?: Id): Store<Id, S, G, A> | Record<string, Store<Id, S, G, A>> | void{
  const storeKey = id?.toString() || id

  if (id && !root.value._stores[id]) {
    return logWarning(`"${ String(storeKey) }" store doesn't exist in the root object`)
  }

  return id ?
    root.value._stores[id] as Store<Id, S, G, A> :
    root.value._stores as Record<string, Store<Id, S, G, A>>
}
