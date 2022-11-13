import { ComputedRef, computed } from 'vue-demi'
import { Method } from './types'

export const nervueSymbol = Symbol.for('nervue')

const nervueProps = [ '$patch', '$subscribe', '$id' ]

export class Nervue {
  public installed: boolean = false
  public stores: Record<string, any> = {}
  public _p: Method[] = []

  set(useStore){
    if (this.stores[useStore.$id]) {
      return
    }

    const store = useStore()
    const { $id, _expose } = store

    this.stores[$id] = {}

    const exposedProps = _expose.length ? _expose : Object.keys(store)

    /*TODO - need define compatible type for the exposed values*/
    for (const key of exposedProps) {
      if (nervueProps.includes(key as string)) {
        continue
      }

      if (typeof store[key] === 'function') {
        (this.stores[$id][key as string] as Method) = function (){
          store[key](...arguments)
        }
      } else {
        (this.stores[$id][key as string] as ComputedRef) = computed(() => store[key] as any)
      }
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

    this.installed = true
  }
}
