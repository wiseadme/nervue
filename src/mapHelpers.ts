import { ActionsTree, StateTree } from './types'
import { definesMap } from './definers'

/**
 * @param useStore
 */
export const mapActions = (useStore): ActionsTree => {
  const store = useStore()
  const map = {}

  for (const key of Object.keys(store)) {
    if (typeof store[key] === 'function') {
      map[key] = store[key]
    }
  }

  return map
}

/**
 * @param useStore
 */
export const mapState = (useStore): StateTree => {
  return definesMap.get(`${ useStore.$id }-state`)
}
