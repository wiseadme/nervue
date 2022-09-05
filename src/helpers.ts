import { reactive, toRefs, isRef, isReactive } from 'vue'

export const wrapIntoProxy = store => new Proxy(store, {
  get: (obj, prop) => {
    if (!obj[prop]) return null

    if (isRef(obj[prop]) || isReactive(obj[prop])) {
      return Reflect.get(obj[prop], 'value')
    }

    return Reflect.get(obj, prop)
  },
  set: (obj, prop, value) => {
    return Reflect.set(obj[prop], 'value', value)
  }
})

export const convertToRefs = stateDefiningObject => {
  return toRefs(reactive(stateDefiningObject))
}
