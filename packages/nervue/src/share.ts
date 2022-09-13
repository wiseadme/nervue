import { watch, reactive } from 'vue'
import { getRoot } from './createNervue'

export function $share(sharedOptions){
  if (this._shares[this.$id]) return

  const id = this.$id

  const _root = getRoot()

  if (!_root!._shares[id]) {
    _root!._shares[id] = {}
  }

  const shared = reactive(sharedOptions)

  watch(this.$state, (to) => {
    Object.keys(to).forEach(k => {
      if (shared[k]) shared[k] = to[k]
    })
  }, { deep: true, immediate: true })

  _root!._shares[id] = new Proxy(shared, {
    get: (target, prop) => Reflect.get(target, prop),
    set: () => true
  })
}
