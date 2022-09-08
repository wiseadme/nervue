import { ActionsTree, GuardsTree, Method, StateTree, StoreDefinition } from './types'

/**
 * @param useStore
 * @param mapOrKeys
 */
export const mapActions = <
  Id extends string,
  S extends StateTree,
  G extends GuardsTree<S>,
  A extends ActionsTree
>(
  useStore: StoreDefinition<Id, S, G, A>,
  mapOrKeys?: [ keyof A ] | { [p: string]: keyof A }
): ActionsTree => {
  const store = useStore()
  const map: Record<string, Method> = {}

  if (mapOrKeys) {
    /**
     * if the map is just a simple array with
     * keys of the actions of store
     */
    if (Array.isArray(mapOrKeys)) {
      mapOrKeys.forEach(key => {
        map[key as string] = store[key]
      })
      /**
       * or it just simple keys map
       * with custom namings
       */
    } else {
      Object.keys(mapOrKeys).forEach(key => {
        map[key] = store[mapOrKeys[key]]
      })
    }

  } else {
    for (const key of Object.keys(store)) {
      if (typeof store[key] === 'function') {
        map[key] = store[key]
      }
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
  G extends GuardsTree<S>,
  A extends ActionsTree
>(
  useStore: StoreDefinition<Id, S, G, A>,
  mapOrKeys?: [ keyof S ] | { [key: string]: Method | keyof S }
): StateTree => {
  const map: Record<string, any> = {}

  if (mapOrKeys) {
    /**
     * if the map is just a simple array with
     * keys of the state of store
     */
    if (Array.isArray(mapOrKeys)) {
      (mapOrKeys as [ keyof S ]).forEach((key) => {
        map[key as string] = function (){
          return useStore()[key]
        }
      })
    } else {
      /**
       * if map of keys is the functions map
       * or simple keys map
       */
      Object.keys(mapOrKeys).forEach((key) => {
        map[key] = function (){
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
        map[key] = function (){
          return store[key]
        }
      }
    })
  }

  return map
}
