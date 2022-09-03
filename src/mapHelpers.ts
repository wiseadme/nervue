import { ActionsTree, StateTree } from './types'
import { definesMap } from './definers'
import { wrapToProxy } from './helpers'

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
 * @param mapOrKeys
 */
export const mapState = (useStore, mapOrKeys): StateTree => {
  const state = definesMap.get(`${ useStore.$id }-state`)
  const stateMap = {}

  if (Array.isArray(mapOrKeys)) {
    mapOrKeys.reduce((map, key) => {
      map[key] = state[key]

      return map
    }, stateMap)
  } else {
    Object.keys(mapOrKeys).reduce((map, key) => {
      map[key] = mapOrKeys[key](state)

      return map
    }, stateMap)
  }

  return wrapToProxy(stateMap)
}
