import { ref, toRefs, Ref, effectScope, UnwrapRef } from 'vue'
import { createStoreProxyWrapper } from './createProxy'


import {
  ActionsTree,
  GuardsTree,
  StateTree,
  StoreDefinition,
  StoreOptions,
  Store,
  _StoreWithProperties,
  _StoreWithGuards, Guards,
} from './types'

function $patch<S = StateTree>(
  mutator: (state: UnwrapRef<S>) => void
){
  const mutatorType = typeof mutator

  if (mutatorType === 'function') {
    mutator(this.$state)
  } else if (mutatorType === 'object') {

  }
}

/***
 * @param options
 */
export const defineStore = <Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}>(
  { id, state, actions, guards }: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A> => {

  const scope = effectScope(true)

  const stateRef = scope.run<Ref<Record<string, StateTree>>>(() => {
      return ref<Record<string, any>>(state!())
    }
  )!

  const { assign } = Object

  /**
   * defining store properties
   */
  const _storeProperties = {} as _StoreWithProperties<Id> & _StoreWithGuards<S, G>

  _storeProperties.$id = id

  _storeProperties.$guards = (guards || {}) as Guards<G, S>

  _storeProperties.$patch = $patch

  Object.defineProperty(_storeProperties, '$state', {
    get: () => stateRef.value,
    set: (val) => stateRef.value = val
  })

  /**
   * Defining store state and actions
   * and fusion with store properties
   */

  const _store = assign(_storeProperties, toRefs(stateRef.value), actions)

  const proxyStore = createStoreProxyWrapper(_store)

   /**
   * Wrapping the store into proxy to access
   * to the state properties via "this".
   */

  actions && Object.keys(actions).forEach(key => {
    (_store as any)[key] = function (){
      return actions[key].call(proxyStore, ...arguments)
    }
  })

  const useStore = () => _store as Store<Id>

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
