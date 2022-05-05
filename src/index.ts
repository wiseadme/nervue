// Vue API
import { reactive } from 'vue'
// Types
import { Store, StoreOptions } from './types'

const storeHashMap = new Map()

export const defineState = <S = {}>(id: string, genState: () => S): S => {
  const state = reactive(genState() as any)

  storeHashMap.set(`${ id }-state`, state)

  return state
}

export const defineActions = <A = {}>(id: string, actions: A): A => {
  const state = storeHashMap.get(`${ id }-state`)

  const context = state ? { state, ...actions } : actions

  Object.keys(actions).forEach((fn) => {
    actions[fn] = actions[fn].bind(context)
  })

  storeHashMap.set(`${ id }-actions`, actions)

  return actions
}

export const defineStore = <S = {}, A = {}>(id: string, options?: StoreOptions<S, A>): () => Store<S, A> => {
  let state, actions

  if (!options) {
    state = storeHashMap.get(`${ id }-state`)
    actions = storeHashMap.get(`${ id }-actions`)
  } else {
    state = defineState(id, options.state)
    actions = defineActions(id, options.actions)
  }

  return () => ({ state, ...actions })
}
