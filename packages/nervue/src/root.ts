import { App, isVue2, ComputedRef, computed } from 'vue-demi'
import { Store, Method } from './types'

export const nervueSymbol = Symbol.for('nervue')

/*TODO - need define compatible type for the exposed values*/
export interface Root {
  isInstalled: boolean;
  stores: Record<string, Store>
  exposed: Record<string, any>

  set(useStore): void

  unset(id: string): void

  setExposes(store): void

  install(app: App): void
}

export class Nervue implements Root {
  isInstalled: boolean = false
  stores: Record<string, Store> = {}
  exposed: Record<string, any> = {}

  set(useStore){
    const store = useStore()

    if (store._expose) {
      this.setExposes(store)
    } else {
      this.stores[store.$id] = store
    }

    Object.defineProperty(store, '$exposed', {
      value: this.exposed,
      writable: false,
      configurable: false,
      enumerable: false
    })
  }

  unset(id){
    delete this.stores[id]
  }

  setExposes(store){
    const { $id, _expose } = store

    if (this.exposed[$id]) {
      return
    }

    this.exposed[$id] = {}

    for (const key in _expose) {
      if (typeof store[key] === 'function') {
        (this.exposed[$id][key] as Method) = (...args) => {
          store[key](...args)
        }
      } else {
        (this.exposed[$id][key] as ComputedRef) = computed(() => store[key])
      }
    }
  }

  install(app: App){
    if (!this.isInstalled) {
      return
    }

    this.isInstalled = true

    if (!isVue2) {
      app.provide(nervueSymbol, this)
    }
  }
}
