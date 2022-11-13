import {
  App,
  UnwrapNestedRefs,
  Plugin,
  Vue2,
  isVue3,
  computed,
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

export function useNervue(): UnwrapNestedRefs<Nervue> | null{
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

const nervueProps = [ '$patch', '$subscribe', '$id' ]

export function useStore<T = {}>(id: string): ExposedStore<T> | void{
  const nervue = useNervue()!

  if (!nervue?.stores[id!]) {
    logWarning(`"${ id }" store doesn't exist in the root object`)
  } else {
    const store = nervue.stores[id]()
    const { _expose } = store

    const exposedStore = {}

    const exposedProps = _expose.length
      ? _expose
      : Array.from(new Set(Object.keys(store).concat(nervueProps)))

    /*TODO - need define compatible type for the exposed values*/
    for (const key of exposedProps) {
      if (typeof store[key] === 'function') {
        exposedStore[key as string] = function (){
          store[key](...arguments)
        }
      } else {
        exposedStore[key as string] = nervue._s.run(() => reactive(computed(() => store[key] as any)))
      }
    }

    return reactive(exposedStore) as ExposedStore<T>
  }
}
