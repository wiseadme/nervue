import { effectScope, EffectScope, App } from 'vue-demi'
import { NervuePlugin } from './types'

export const nervueSymbol = Symbol.for('nervue')

export class Nervue {
  public installed: boolean = false
  public _s: Record<string, any> = {}
  public _p: NervuePlugin[] = []
  public _e: EffectScope = effectScope()
  public _a: App = {} as App

  static sets = [] as any[]

  set(useStore){
    if (this.installed) {
      this._s[useStore.$id] = useStore
    } else {
      Nervue.sets.push(useStore)
    }
  }

  unset(id){
    if (this._s[id]) {
      delete this._s[id]
    }
  }

  use(plugin: NervuePlugin){
    this._p.push(plugin)
  }

  install(app = {} as App){
    if (this.installed) {
      return
    }

    if (Nervue.sets.length) {
      Nervue.sets.forEach(s => this._s[s.$id] = s)
      Nervue.sets = []
    }

    if (app) {
      this._a = app
    }

    this.installed = true
  }
}
