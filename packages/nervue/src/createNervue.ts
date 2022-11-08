import {
  App,
  UnwrapNestedRefs,
  UnwrapRef,
  Plugin,
  Vue2,
  isVue3,
  reactive,
  ref,
  unref
} from 'vue-demi'
import {
  ComputedTree,
  ExposesTree,
  NervuePlugin,
  StateTree,
  Store
} from './types'
import { logWarning } from './helpers'
import { Nervue, nervueSymbol, Root } from './root'

const root = ref<Root | null>(null)

export function getRoot(): UnwrapNestedRefs<UnwrapRef<Root>> | null{
  return unref(root) ? reactive(unref(root)!) : unref(root)
}

export function createNervue(): NervuePlugin{
  if (!getRoot()) {
    root.value = new Nervue()
  }

  if (isVue3) {
    getRoot()!.constructor.prototype.install = vue3install()
  } else {
    getRoot()!.constructor.prototype.install = vue2Install()
  }

  return getRoot()!
}

function vue3install(): Plugin{
  const nervue = getRoot() as Root
  const { install } = nervue

  return function (app: App){
    install.call(nervue)

    app.config.globalProperties.$nervue = getRoot()
    app.provide(nervueSymbol, getRoot())
  }
}

function vue2Install(): Plugin{
  const nervue = getRoot() as Root
  const { install } = nervue

  return function (Vue: typeof Vue2){
    if (nervue!.installed) {
      return
    }

    install.call(nervue)
    Vue.prototype.$nervue = getRoot()
  }
}

export function useNervue<
  Id extends string,
  S extends StateTree = {},
  G /*extends GuardsTree<S>*/ = {},
  C extends ComputedTree<S> = {},
  A /*extends ActionsTree*/ = {},
  E extends ExposesTree = {}>(id?: Id): Store<Id, S, G, C, A, E> | unknown

export function useNervue(id?: string): Root | Store | void{
  const nervue = getRoot()

  if (!id) {
    return nervue!
  }

  if (!nervue?.stores[id] || nervue?.exposed[id]) {
    return logWarning(`"${ id }" store doesn't exist in the root object`)
  }

  return nervue.stores[id] || nervue.exposed[id]
}
