import { ComputedRef, computed } from 'vue-demi'
import { Store, Method } from './types'

export const nervueSymbol = Symbol.for('nervue')

/*TODO - need define compatible type for the exposed values*/
export interface Root {
  installed: boolean;
  stores: Record<string, Store>
  exposed: Record<string, any>

  set(useStore): void

  unset(id: string): void

  setExposes(store): void

  install(): void
}

export class Nervue implements Root {
  public installed: boolean = false
  public stores: Record<string, Store> = {}
  public exposed: Record<string, any> = {}

  set(useStore){
    if (this.exposed[useStore.$id] || this.stores[useStore.$id]) {
      return
    }
    const store = useStore()

    if (store._expose) {
      this.setExposes(store)
    } else {
      this.stores[store.$id] = store
    }

    Object.defineProperty(store, '$exposed', {
      get: () => Object.keys(this.exposed).reduce((exp, key) => {
        if (key !== store.$id) {
          exp[key] = this.exposed[key]
        }

        return exp
      }, {})
    })
  }

  unset(id){
    if (this.exposed[id]) {
      delete this.exposed[id]
    } else {
      delete this.stores[id]
    }
  }

  setExposes(store){
    const { $id, _expose } = store

    if (this.exposed[$id]) {
      return
    }

    this.exposed[$id] = {}

    for (const key of _expose) {
      if (typeof store[key] === 'function') {
        (this.exposed[$id][key] as Method) = function (){
          store[key](...arguments)
        }
      } else {
        (this.exposed[$id][key] as ComputedRef) = computed(() => store[key])
      }
    }
  }

  install(){
    if (this.installed) {
      return
    }

    this.installed = true
  }
}
