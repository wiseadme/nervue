import {
  App,
  Plugin,
  Vue2,
  isVue3,
  computed,
  reactive,
} from 'vue-demi'
import {
  ExposedStore,
} from './types'
import { logWarning } from './helpers'
import { Nervue, nervueSymbol } from './root'

let root: Nervue | null = null

export function useNervue(): Nervue{
  if (!root) {
    root = new Nervue()
  }

  return root
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

type NervuePlugin = Nervue & Plugin

export function createNervue(): NervuePlugin{
  if (isVue3) {
    useNervue().constructor.prototype.install = vue3Install()
  } else {
    useNervue().constructor.prototype.install = vue2Install()
  }

  return useNervue()!
}

const nervueProps = [ '$patch', '$subscribe', '$id' ]

export function useStore<T = {}>(id: string): ExposedStore<T> | void{
  const nervue = useNervue()!

  if (!nervue.installed) {
    logWarning('[nervue]: You should to create Nervue')
  } else {
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
          exposedStore[key as string] = computed(() => store[key] as any)
        }
      }

      return reactive(exposedStore) as ExposedStore<T>
    }
  }
}
