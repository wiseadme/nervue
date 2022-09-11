import { isRef } from 'vue'
import { logWarning } from './helpers'

export const proxify = (store) => new Proxy(store, {
  get: (obj, prop) => {
    if (!Reflect.has(obj, prop)) return null

    if (isRef(obj[prop])) {
      return Reflect.get(obj[prop], 'value')
    }

    return Reflect.get(obj, prop)
  },
  /***
   * here we intercept each mutation
   * and check it with guards
   */
  set: (obj, prop, value) => {
    const { $guards } = store

    let isGuarded = true

    if ($guards[prop]) {
      /**
       * check if guards key value is the array
       * of validator functions
       */
      if (Array.isArray($guards[prop])) {
        isGuarded = $guards[prop].every(fn => fn(value))
      } else {
        logWarning(
          `{guards}: wrong type of guards in the ${ store.$id } store.`,
          `Guards should be an array of functions.`
        )
      }
    }

    if (!isGuarded) {
      logWarning(
        `{guards}: The value "${ value }" is not valid for mutation`,
        `of state property "${ prop as string }" in the "${ store.$id.toString?.() }" store`
      )
    }

    if (isGuarded) {
      return Reflect.set(obj[prop], 'value', value)
    }

    return true
  }
})

