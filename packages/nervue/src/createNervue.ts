import { App, UnwrapNestedRefs } from 'vue'
import { ActionsTree, GuardsTree, StateTree, Store } from './types'
import { logWarning } from './helpers'

export const NERVUE_ROOT_SYMBOL = Symbol.for('nervue')

export interface Root {
  _stores: Record<string, Store>,
  _shares: Record<string, Record<string, any>>
  isInstalled: boolean
}

const root = {} as UnwrapNestedRefs<Root>

root._stores = {} as Root['_stores']
root._shares = {} as Root['_shares']

export const createNervue = () => ({
  install: (app: App) => {
    if (root.isInstalled) return

    root.isInstalled = true

    app.provide(NERVUE_ROOT_SYMBOL, root)
  },

  add: (useStore) => {
    root._stores[useStore.$id] = useStore()
  }
})

export const getRoot = (): Root => root

export function useNervue <
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(id?: Id): Store<Id, S, G, A> | Record<string, Store<Id, S, G, A>> | void{
  const storeKey = id?.toString() || id

  if (id && !root._stores[id]) {
    return logWarning(`"${ String(storeKey) }" id doesn't exists in the root store`)
  }

  return id ?
    root._stores[id] as Store<Id, S, G, A> :
    root._stores as Record<string, Store<Id, S, G, A>>
}
