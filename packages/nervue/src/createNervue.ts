import {
  App,
  UnwrapNestedRefs,
  reactive,
  isVue2,
  Vue2,
} from 'vue-demi'
import {
  ComputedTree,
  ExposesTree,
  NervuePlugin,
  StateTree,
  Store
} from './types'
import { logWarning } from './helpers'
import { root, ROOT_SYMBOL, Root } from './root'

export function createNervue(): NervuePlugin{
  return {
    install: (app: App) => {
      if (root.value.isInstalled) {
        return
      }

      root.value.isInstalled = true

      if (isVue2) {
        Vue2.prototype.$nervue = getRoot()
      } else {
        app.provide(ROOT_SYMBOL, root)
      }
    },

    add: (useStore) => {
      root.value._stores[useStore.$id] = useStore() as Store
    }
  }
}

export function getRoot(): UnwrapNestedRefs<Root>{
  return reactive(root.value)
}

export function useNervue<
  Id extends string,
  S extends StateTree = {},
  G /*extends GuardsTree<S>*/ = {},
  C extends ComputedTree<S> = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}
>(id?: Id): Store<Id, S, G, C, A, E> | unknown
export function useNervue(id?: string): Store | Record<string, Store> | void{
  const storeKey = id?.toString() || id

  if (id && !root.value._stores[id]) {
    return logWarning(`"${ String(storeKey) }" store doesn't exist in the root object`)
  }

  return id ?
    root.value._stores[id] as Store :
    root.value._stores as Record<string, Store>
}
