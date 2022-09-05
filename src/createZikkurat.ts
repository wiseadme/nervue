import { App } from 'vue'
import { root } from './root'
import { Store } from './types'

export const createZikkurat = () => ({
  install: (app: App) => {
    if ((createZikkurat as any).isInstalled) return
    (createZikkurat as any).isInstalled = true

    app.provide('$Z', root)
  },

  add: (useStore) => {
    root[useStore.$id] = useStore()
  }
})

export const useZikkurat = (id?: string): Store | Record<string, Store> => {
  return id ? root[id] : root
}
