import { ActionsTree, Method, StateTree, StoreDefinition } from './types'
// import { definesMap } from './definers'
// import { wrapToProxy } from './helpers'

/**
 * @param useStore
 * @param mapOrKeys
 */
export const mapActions = <
  Id extends string,
  S extends StateTree,
  A extends ActionsTree>
(
  useStore: StoreDefinition<Id, S, A>,
  mapOrKeys?: [ keyof A ] | { [p: string]: keyof A }
): ActionsTree => {
  const store = useStore()
  const map = {}

  if (mapOrKeys) {
    console.log(mapOrKeys)
  }

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
export const mapState = <
  Id extends string,
  S extends StateTree,
  A extends ActionsTree>
(
  useStore: StoreDefinition<Id, S, A>,
  mapOrKeys?: [ keyof S ] | { [key: string]: Method | keyof S }
): StateTree => {
  const stateMap: Record<string, any> = {}

  if (mapOrKeys) {
    /**
     * if map is just a simple array with
     * keys of the state of store
     */
    if (Array.isArray(mapOrKeys)) {
      (mapOrKeys as [ keyof S ]).forEach((key) => {
        stateMap[key as string] = function (){
          return useStore()[key]
        }
      })
    } else {
      /**
       * if map of keys is the functions map
       * or simple keys map
       */
      Object.keys(mapOrKeys).forEach((key) => {
        stateMap[key] = function (){
          const store = useStore()
          if (typeof mapOrKeys[key] === 'function') {
            return (mapOrKeys[key] as Method).call(this, store)
          }

          return store[mapOrKeys[key] as keyof S]
        }
      })
    }
  } else {
    const store = useStore()
    /**
     * if map of keys doesn't exists
     * should return map of all state properties
     * without any action functions from the store
     */
    Object.keys(store).forEach((key) => {
      if (typeof store[key] !== 'function') {
        stateMap[key] = function (){
          return store[key]
        }
      }
    })
  }

  return stateMap
}
