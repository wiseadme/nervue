import {
  UnwrapNestedRefs,
  reactive,
  unref,
  ref,
  UnwrapRef,
} from 'vue-demi'
import {
  ComputedTree,
  ExposesTree,
  NervuePlugin,
  StateTree,
  Store
} from './types'
import { logWarning } from './helpers'
import { Nervue, Root } from './root'

const root = ref<Root | null>(null)

export function createNervue(): NervuePlugin{
  if (!unref(root)) {
    root.value = new Nervue()
  }

  return getRoot()!
}

export function getRoot(): UnwrapNestedRefs<UnwrapRef<Root>> | null{
  if (unref(root)) {
    return reactive(root.value!)
  }

  return null
}

export function useNervue<Id extends string,
  S extends StateTree = {},
  G /*extends GuardsTree<S>*/ = {},
  C extends ComputedTree<S> = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}>(id?: Id): Store<Id, S, G, C, A, E> | unknown

export function useNervue(id?: string): Store | Record<string, Store> | void{

  if (id && !unref(root)?._stores[id]) {
    return logWarning(`"${ id }" store doesn't exist in the root object`)
  }

  return id ?
    unref(root)?._stores[id] as Store :
    unref(root)?._stores as Record<string, Store>
}
