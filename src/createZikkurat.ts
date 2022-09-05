import { App } from 'vue'
import { rootStore } from './rootStore'
import { Store } from './types'

export const createZikkurat = () => ({
  install: (app: App) => {
    if ((createZikkurat as any).isInstalled) return
    (createZikkurat as any).isInstalled = true

    app.provide('$z', rootStore)
  },

  add: (useStore) => {
    rootStore[useStore.$id] = useStore()
  }
})

export const useZikkurat = (id?: string): Store | Record<string, Store> => {
  return id ? rootStore[id] : rootStore
}
