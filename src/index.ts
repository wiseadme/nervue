// Vue API
import { inject, reactive, toRefs, isRef, App } from 'vue'
import { definesMap } from './defines-map'
import { storesMap } from './stores-map'
// Types
import { ActionsTree, StateTree, Store, StoreDefinition, StoreOptions } from './types'

const defineState = <S = {}>(id: string, genState: () => S): S => {
  definesMap.set(`${ id }-state`, reactive(genState() as any))

  return definesMap.get(`${ id }-state`)
}

const defineActions = <A = {}>(id: string, actions: A): A => {
  definesMap.set(`${ id }-actions`, actions)

  return definesMap.get(`${ id }-actions`)
}

export const defineStore = <
  Id extends string,
  S extends StateTree = {},
  A extends ActionsTree = {}
  >(id: Id, options?: StoreOptions<S, A>): StoreDefinition<Id, S, A> => {
  let state, actions

  if (!options) {
    state = definesMap.get(`${ id }-state`)
    actions = definesMap.get(`${ id }-actions`)
  } else {
    state = defineState(id, options.state)
    actions = defineActions(id, options.actions)
  }

  const store = { ...toRefs(state), ...actions }

  const proxy = new Proxy(store, {
    get: (obj, prop) => {
      if (isRef(obj[prop])) {
        return Reflect.get(obj[prop], 'value')
      } else {
        return Reflect.get(obj, prop)
      }
    },
    set: (obj, prop, value) => {
      Reflect.set(obj[prop], 'value', value)

      return true
    }
  })

  Object.keys(actions).forEach(key => {
    store[key] = (...args) => actions[key].call(proxy, ...args)
  })

  const useStore = () => proxy

  useStore.$id = id

  return useStore
}

export const createVueZone = () => ({
  install: (app: App) => {
    if ((createVueZone as any).isInstalled) return
    (createVueZone as any).isInstalled = true

    app.provide('$vz', storesMap)
  },

  add: (useStore) => {
    storesMap[useStore.$id] = useStore()
  }
})

export const useVueZone = (id?: string): Store | Record<string, Store> => {
  const globalStore = inject('$vz', {})

  return id ? globalStore[id] : globalStore
}

// export const mapActions = (useStore): ActionsTree => {
//   const store = useStore()
//   const actions = {}
//
//   for (const key of Object.keys(store)) {
//     if (typeof store[key] === 'function') {
//       actions[key] = store[key]
//     }
//   }
//
//   return actions
// }
//
// export const mapState = <S = {}>(id: string): S => definesMap.get(`${ id }-state`)
