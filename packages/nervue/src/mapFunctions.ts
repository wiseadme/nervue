import type {
  Store,
  ActionsTree,
  GuardsTree,
  StateTree,
  ComputedTree,
  Method,
  StoreDefinition,
} from './types'

/**
 * @param useStore - store composition
 * @param keys - array of action keys
 */
export function mapActions<
  Id extends string,
  S extends StateTree,
  G extends GuardsTree,
  C extends ComputedTree<S>,
  A /*extends ActionsTree*/,
  Keys extends keyof A>
(
  useStore: StoreDefinition<Id, S, G, C, A>,
  keys: Keys[]
): ActionsTree

/**
 * @param useStore - store composition
 * @param keysMap - action keys map
 */
export function mapActions<
  Id extends string,
  S extends StateTree,
  G extends GuardsTree,
  C extends ComputedTree<S>,
  A /*extends ActionsTree*/,
  KeyMapper extends Record<string, keyof A>>(
  useStore: StoreDefinition<Id, S, G, C, A>,
  keysMap: KeyMapper
): ActionsTree

/**
 * @param useStore - store composition
 * @param mapOrKeys - action keys map or array
 */
export function mapActions<
  Id extends string,
  S extends StateTree,
  G extends GuardsTree,
  C extends ComputedTree<S>,
  A /*extends ActionsTree*/,
 >(
  useStore: StoreDefinition<Id, S, G, C, A>,
  mapOrKeys: any
): ActionsTree {
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
 * @param useStore - store composition
 * @param keys - array of state or computed keys
 */
export function mapState<
  Id extends string,
  S extends StateTree,
  G extends GuardsTree,
  C extends ComputedTree<S>,
  A,
  Keys extends keyof S | keyof C
  >(
  useStore: StoreDefinition<Id, S, G, C, A>,
  keys: Keys[]
): StateTree

/**
 * @param useStore - store composition
 * @param keysMap - map of state or computed keys
 */
export function mapState<
  Id extends string,
  S extends StateTree,
  G extends GuardsTree,
  C extends ComputedTree<S>,
  A,
  KeyMapper extends Record<string, (keyof S | keyof C) | ((store: Store<Id, S, G, C, A>) => any)>
  >(
  useStore: StoreDefinition<Id, S, G, C, A>,
  keysMap: KeyMapper
): StateTree

/**
 * @param useStore - store composition
 * @param mapOrKeys - map or array of state or computed keys
 */
export function mapState<
  Id extends string,
  S extends StateTree,
  G extends GuardsTree,
  C extends ComputedTree<S>,
  A extends ActionsTree,
>(
  useStore: StoreDefinition<Id, S, G, C, A>,
  mapOrKeys?: any
): StateTree{
  const map: Record<string, any> = {}

  if (mapOrKeys) {
    /**
     * if the map is just a simple array with
     * keys of the state of store
     */
    if (Array.isArray(mapOrKeys)) {
      (mapOrKeys as [ keyof S | keyof C ]).forEach((key) => {
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
     * if map of keys doesn't exist
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
