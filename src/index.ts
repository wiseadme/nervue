// Vue API
import { reactive, inject, App } from 'vue'
import { definesMap } from './defines-map'
import { storesMap } from './stores-map'
// Types
import { Store, StoreOptions } from './types'

let isInstalled: boolean = false

const defineState = <S = {}>(id: string, genState: () => S): S => {
  definesMap.set(`${ id }-state`, reactive(genState() as any))

  return definesMap.get(`${ id }-state`)
}

const defineActions = <A = {}>(id: string, actions: A): A => {
  definesMap.set(`${ id }-actions`, actions)

  return definesMap.get(`${ id }-actions`)
}

export const defineStore = <K extends string, S = {}, A = {}>(id: K, options?: StoreOptions<S, A>): () => Store<S, A> => {
  let state, actions

  if (!options) {
    state = definesMap.get(`${ id }-state`)
    actions = definesMap.get(`${ id }-actions`)
  } else {
    state = defineState(id, options.state)
    actions = defineActions(id, options.actions)
  }

  const useStore = () => ({ state, ...actions })
  useStore.id = id

  return useStore
}

export const createVueZone = () => ({
  install: (app: App) => {
    if (isInstalled) return

    isInstalled = true

    app.provide('$vz', storesMap)
  },

  add(useStore){
    const store = useStore()

    Object.keys(store).forEach(key => {
      if (typeof store[key] === 'function') {
        store[key] = store[key].bind(store)
      }
    })

    storesMap[useStore.id] = store
  }
})

export const useVueZone = (id?: string): Store | Record<string, Store> => {
  const globalStore = inject('$vz', {})

  return id ? globalStore[id] : globalStore
}

export const mapActions = <A = {}>(id: string): A => {
  const actions = definesMap.get(`${ id }-actions`)

  Object.keys(actions).forEach(key => {
    actions[key] = actions[key].bind(storesMap[id])
  })

  return actions
}

export const mapState = <S = {}>(id: string): S => definesMap.get(`${ id }-state`)
