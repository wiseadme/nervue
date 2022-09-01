// Vue API
import { reactive, toRefs, inject, ref, App } from 'vue'
// Types
import { Store, StoreOptions } from './types'

const definesMap: Map<string, any> = new Map()
const storesMap = {}
const isInstalled = ref(false)

export const defineState = <S = {}>(id: string, genState: () => S): S => {
  const state = reactive(genState() as any)

  definesMap.set(`${ id }-state`, state)

  return state
}

export const defineActions = <A = {}>(id: string, actions: A): A => {
  const state = definesMap.get(`${ id }-state`)

  const context = state ? { state, ...actions } : actions

  Object.keys(actions).forEach((fn) => {
    actions[fn] = actions[fn].bind(context)
  })

  definesMap.set(`${ id }-actions`, actions)

  return actions
}

export const defineStore = <S = {}, A = {}>(id: string, options?: StoreOptions<S, A>): () => Store<S, A> => {
  let state, actions

  if (!options) {
    state = definesMap.get(`${ id }-state`)
    actions = definesMap.get(`${ id }-actions`)
  } else {
    state = defineState(id, options.state)
    actions = defineActions(id, options.actions)
  }

  storesMap[id] = { ...toRefs(state), ...actions }

  return () => storesMap[id]
}

export const createVueZone = () => ({
  install: (app: App) => {
    if (isInstalled.value) return

    isInstalled.value = true

    app.provide('$vz', storesMap)
  }
})

export const useVueZone = () => inject('$vz', null)
