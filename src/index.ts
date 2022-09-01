// Vue API
import { reactive, inject, App } from 'vue'
import { definesMap } from './defines-map'
import { storesMap } from './stores-map'
// Types
import { Store, StoreOptions } from './types'

let isInstalled: boolean = false

export const defineState = <S = {}>(id: string, genState: () => S): S => {
  definesMap.set(`${ id }-state`, reactive(genState() as any))

  return definesMap.get(`${ id }-state`)
}

export const defineActions = <A = {}>(id: string, actions: A): A => {
  definesMap.set(`${ id }-actions`, actions)

  return definesMap.get(`${ id }-actions`)
}

export const defineStore = <S = {}, A = {}>(id: string, options?: StoreOptions<S, A>): () => Store<S, A> => {
  let state, actions, store

  if (!options) {
    state = definesMap.get(`${ id }-state`)
    actions = definesMap.get(`${ id }-actions`)
  } else {
    state = defineState(id, options.state)
    actions = defineActions(id, options.actions)
  }

  store = { state, ...actions }

  Object.keys(store).forEach(key => {
    if (typeof store[key] === 'function') {
      store[key] = store[key].bind(store)
    }
  })

  storesMap[id] = store

  return () => store
}

export const createVueZone = () => ({
  install: (app: App) => {
    if (isInstalled) return

    isInstalled = true

    app.provide('$vz', storesMap)
  }
})

export const useVueZone = (id?: string) => {
  const globalStore = inject('$vz', {})

  return id ? globalStore[id] : globalStore
}
