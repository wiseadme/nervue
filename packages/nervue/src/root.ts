import { effectScope, EffectScope } from 'vue-demi'
import { Method } from './types'

export const nervueSymbol = Symbol.for('nervue')

export class Nervue {
  public installed: boolean = false
  public stores: Record<string, any> = {}
  public _p: Method[] = []
  public _e: EffectScope = effectScope()

  static sets = [] as any[]

  set(useStore){
    if (this.installed) {
      this.stores[useStore.$id] = useStore
    } else {
      Nervue.sets.push(useStore)
    }
  }

  unset(id){
    if (this.stores[id]) {
      delete this.stores[id]
    }
  }

  use(plugin){
    this._p.push(plugin)
  }

  install(){
    if (this.installed) {
      return
    }

    if (Nervue.sets.length) {
      Nervue.sets.forEach(s => this.stores[s.$id] = s)
      Nervue.sets = []
    }

    this.installed = true
  }
}
