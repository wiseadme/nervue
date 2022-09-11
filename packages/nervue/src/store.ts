import { ref, toRefs } from 'vue'
import { proxify } from './proxify'
import { $patch } from './patch'
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

/**
 * @param options - store definition object
 */
export const defineStore = <
  Id extends string,
  S extends StateTree = {},
  G extends GuardsTree<S> = {},
  A extends ActionsTree = {}
>(
  options: StoreOptions<Id, S, G, A>
): StoreDefinition<Id, S, G, A> => {

  const { id, state, actions, guards } = options

  const stateRef = ref(state?.() || {})

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
   * here we create a store
   * and then
   */

  const _store = assign(
    _storeProperties,
    toRefs(stateRef.value),
    actions
  )

  /**
   * Wrapping in a proxy for
   * processing with guards and
   * for subscriptions.
   */

  const storeProxy = proxify(_store)

  /**
   * wrapping the actions to call them
   *
   */
  actions && Object.keys(actions).forEach(key => {
    (_store as any)[key] = function (){
      return actions[key].call(storeProxy, ...arguments)
    }
  })

  const useStore = () => storeProxy as Store<Id, S, G, A>

  useStore.$id = _store.$id

  return useStore as StoreDefinition<Id, S, G, A>
}
