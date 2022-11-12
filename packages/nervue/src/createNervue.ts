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
  ExposedStore,
  NervuePlugin,
} from './types'
import { logWarning } from './helpers'
import { Nervue, nervueSymbol } from './root'

const root = ref<Nervue | null>(null)

export function useNervue(): UnwrapNestedRefs<UnwrapRef<Nervue>> | null{
  return unref(root) ? reactive(unref(root)!) : unref(root)
}

function vue3Install(): Plugin{
  const nervue = useNervue() as Nervue
  const { install } = nervue

  return function (app: App){
    install.call(nervue)

    app.config.globalProperties.$nervue = useNervue()
    app.provide(nervueSymbol, useNervue())
  }
}

function vue2Install(): Plugin{
  const nervue = useNervue() as Nervue
  const { install } = nervue

  return function (Vue: typeof Vue2){
    if (nervue!.installed) {
      return
    }

    install.call(nervue)
    Vue.prototype.$nervue = useNervue()
  }
}

export function createNervue(): NervuePlugin{
  if (!useNervue()) {
    root.value = new Nervue()
  }

  if (isVue3) {
    useNervue()!.constructor.prototype.install = vue3Install()
  } else {
    useNervue()!.constructor.prototype.install = vue2Install()
  }

  return useNervue()!
}

export function useStore<T = {}>(id: string): ExposedStore<T>{
  const nervue = useNervue()!

  if (!nervue?.stores[id!]) {
    logWarning(`"${ id }" store doesn't exist in the root object`)
  }

  return nervue?.stores[id!] as ExposedStore<T>
}
