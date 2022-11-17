import { effectScope, EffectScope } from 'vue-demi'
import { Method } from './types'

export const nervueSymbol = Symbol.for('nervue')

export class Nervue {
  public installed: boolean = false
  public stores: Record<string, any> = {}
  public _p: Method[] = []
  public _s: EffectScope = effectScope()

  set(useStore){
    this.stores[useStore.$id] = useStore
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

    this.installed = true
  }
}
