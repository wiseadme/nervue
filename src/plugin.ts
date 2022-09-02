import { isRef, toRefs } from 'vue'
import { ActionsTree, StateTree, StoreDefinition, StoreOptions } from '@/types'
import { defineState, defineActions } from './definers'

const storeToRefs = ({ id, state, actions }) => {
  return { $id: id, ...toRefs(state), ...actions }
}

const storeToProxy = (store) => {
  return new Proxy(store, {
    get: (obj, prop) => {
      if (!obj[prop]) return null

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
}

export const defineStore = <Id extends string, S extends StateTree = {}, A extends ActionsTree = {}>
(id: Id, options: StoreOptions<S, A>): StoreDefinition<Id, S, A> => {

  const { state } = defineState(id, options.state)
  const { actions } = defineActions(id, options.actions)

  const store = storeToRefs({ id, state, actions })
  const proxy = storeToProxy(store)

  Object.keys(actions).forEach(key => {
    store[key] = (...args) => actions[key].call(proxy, ...args)
  })

  const useStore = () => proxy

  useStore.$id = id

  return useStore
}
