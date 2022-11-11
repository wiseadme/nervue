import { ComputedRef, computed } from 'vue-demi'
import { Method } from './types'

export const nervueSymbol = Symbol.for('nervue')

export interface Root {
  installed: boolean;
  stores: Record<string, any>
  _p: Method[]

  set(useStore): void

  unset(id: string): void

  use(Method): void

  install(): void
}

export class Nervue implements Root {
  public installed: boolean = false
  public stores: Record<string, any> = {}
  public _p: Method[] = []

  set(useStore){
    if (this.stores[useStore.$id]) {
      return
    }
    const store = useStore()

    if (store._expose.length) {
      const { $id, _expose } = store

      if (this.stores[$id]) {
        return
      }

      /*TODO - need define compatible type for the exposed values*/
      this.stores[$id] = {}

      for (const key of _expose) {
        if (typeof store[key] === 'function') {
          (this.stores[$id][key] as Method) = function (){
            store[key](...arguments)
          }
        } else {
          (this.stores[$id][key] as ComputedRef) = computed(() => store[key])
        }
      }
    }

    Object.defineProperty(store, '$exposed', {
      get: () => Object.keys(this.stores).reduce((exp, key) => {
        if (key !== store.$id) {
          exp[key] = this.stores[key]
        }

        return exp
      }, {})
    })
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
