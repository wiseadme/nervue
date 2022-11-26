import { effectScope, EffectScope, App } from 'vue-demi'
import { StorePlugin } from './types'

export const nervueSymbol = Symbol.for('nervue')

export class Nervue {
  public installed: boolean = false
  public _s: Record<string, any> = {}
  public _p: StorePlugin[] = []
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

  use(plugin: StorePlugin){
    this._p.push(plugin)
  }

  install(){
    if (this.installed) {
      return
    }

    if (Nervue.sets.length) {
      Nervue.sets.forEach(s => this._s[s.$id] = s)
      Nervue.sets = []
    }

    this.installed = true
  }
}
