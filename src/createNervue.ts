import { App } from 'vue'
import { root } from './root'
import { Store } from './types'
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

export const useNervue = (id?: string): Store | Record<string, Store> | void => {
  if (!root[id!]) {
    return logWarning(`"${ id }" id doesn't exists in the root store`)
  }

  return id ? root[id] : root
}
