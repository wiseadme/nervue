import { App, UnwrapNestedRefs, reactive, toRefs } from 'vue'
import { ActionsTree, GuardsTree, StateTree, Store } from './types'
import { logWarning } from './helpers'
import { root, NERVUE_ROOT_SYMBOL, Root } from './root'


export const createNervue = () => ({
  install: (app: App) => {
    if (root.value.isInstalled) return

    root.value.isInstalled = true

    app.provide(NERVUE_ROOT_SYMBOL, root)
  },

  add: (useStore) => {
    root.value._stores[useStore.$id] = useStore()
  }
})

export const getRoot = (): UnwrapNestedRefs<Root> => reactive(toRefs(root.value))

export function useNervue<
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(id?: Id): Store<Id, S, G, A> | Record<string, Store<Id, S, G, A>> | void{
  const storeKey = id?.toString() || id

  if (id && !root.value._stores[id]) {
    return logWarning(`"${ String(storeKey) }" id doesn't exists in the root store`)
  }

  return id ?
    root.value._stores[id] as Store<Id, S, G, A> :
    root.value._stores as Record<string, Store<Id, S, G, A>>
}
