import { App, UnwrapNestedRefs, reactive } from 'vue-demi'
import { Store } from './types'
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

export function useNervue(id?: string): Store | Record<string, Store> | void{
  const storeKey = id?.toString() || id

  if (id && !root.value._stores[id]) {
    return logWarning(`"${ String(storeKey) }" store doesn't exist in the root object`)
  }

  return id ?
    root.value._stores[id] as Store :
    root.value._stores as Record<string, Store>
}
