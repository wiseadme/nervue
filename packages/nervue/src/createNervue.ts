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
  NervuePlugin,
} from './types'
import { logWarning } from './helpers'
import { Nervue, nervueSymbol, Root } from './root'

const root = ref<Root | null>(null)

export function getRoot(): UnwrapNestedRefs<UnwrapRef<Root>> | null{
  return unref(root) ? reactive(unref(root)!) : unref(root)
}

function vue3Install(): Plugin{
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

export function createNervue(): NervuePlugin{
  if (!getRoot()) {
    root.value = new Nervue()
  }

  if (isVue3) {
    getRoot()!.constructor.prototype.install = vue3Install()
  } else {
    getRoot()!.constructor.prototype.install = vue2Install()
  }

  return getRoot()!
}

export function useNervue(id?: string): Record<string, any>{
  const nervue = getRoot()

  if (!id) {
    return nervue!
  }

  if (!nervue?.stores[id]) {
    logWarning(`"${ id }" store doesn't exist in the root object`)
  }

  return nervue?.stores[id] as any
}
