import { App } from 'vue'
import { rootStore } from './rootStore'
import { Store } from '@/types'

export const createVueZone = () => ({
  install: (app: App) => {
    if ((createVueZone as any).isInstalled) return
    (createVueZone as any).isInstalled = true

    app.provide('$vz', rootStore)
  },

  add: (useStore) => {
    rootStore[useStore.$id] = useStore()
  }
})

export const useVueZone = (id?: string): Store | Record<string, Store> => {
  return id ? rootStore[id] : rootStore
}
