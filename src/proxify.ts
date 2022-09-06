import { isReactive, isRef } from 'vue'
import { logWarning } from './helpers'

export const proxify = (store) => {
  return new Proxy(store, {
    get: (obj, prop) => {
      if (!obj[prop]) return null

      if (isRef(obj[prop]) || isReactive(obj[prop])) {
        return Reflect.get(obj[prop], 'value')
      }

      return Reflect.get(obj, prop)
    },
    /***
     * here we intercept every mutation
     * of state and check it before we
     * change the reactive state.
     */
    set: (obj, prop, value) => {
      const { $guards } = store

      let isGuarded = true

      if ($guards && $guards[prop]) {
        /**
         * check if guards key value is the array
         * of validator functions
         */
        if (Array.isArray($guards[prop])) {
          isGuarded = $guards[prop].some(fn => !fn(value))
        } else {
          isGuarded = $guards[prop](value)
        }
      }

      if (!isGuarded) {
        logWarning(
          `{guards}: The value "${ value }" is not valid for mutation of "${ prop as string }"`
        )
      }

      if (isGuarded) {
        return Reflect.set(obj[prop], 'value', value)
      }

      return true
    }
  })
}
