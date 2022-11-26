import {
  App,
  Plugin,
  Vue2,
  isVue3,
} from 'vue-demi'
import { logWarning } from './helpers'
import { Nervue, nervueSymbol } from './root'

let root: Nervue | null = null

export function useNervue(): Nervue{
  if (!root) {
    root = new Nervue()
  }

  return root
}

function genVue3Install(): Plugin{
  const nervue = useNervue() as Nervue
  const { install } = nervue

  return function (app: App){
    if (!app) {
      return
    }

    install.call(nervue)

    nervue._a = app

    app.config.globalProperties.$nervue = useNervue()
    app.provide(nervueSymbol, useNervue())
  }
}

function genVue2Install(): Plugin{
  const nervue = useNervue()
  const { install } = nervue

  return function (Vue: typeof Vue2){
    if (nervue.installed) {
      return
    }
    install.call(nervue)
    // Vue.prototype.$nervue = useNervue()

    Vue.mixin({
      beforeCreate(){
        const options = this.$options

        if (options.nervue) {
          this.$nervue = options.nervue

          nervue._a = this
        }
      }
    })
  }
}

type NervuePlugin = Nervue & Plugin

export function createNervue(): NervuePlugin{
  if (isVue3) {
    useNervue().constructor.prototype.install = genVue3Install()
  } else {
    useNervue().constructor.prototype.install = genVue2Install()
  }

  return useNervue()!
}

export function useStore(id: string){
  const nervue = useNervue()!

  if (!nervue.installed) {
    return logWarning('[nervue]: You should to create Nervue instance')
  }

  if (!nervue?._s[id!]) {
    logWarning(`"${ id }" store doesn't exist in the root object`)
  } else {
    return nervue._s[id]()
  }
}
