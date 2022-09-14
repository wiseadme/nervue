import { computed } from 'vue'
import { getRoot } from './createNervue'
import { ExposesTree } from './types'

export function $expose<E extends ExposesTree>(exposes: E){
  if (this._exposed[this.$id]) return

  const root = getRoot()

  root._exposed[this.$id] = {}

  for (const key in exposes) {
    if (this.hasOwnProperty(key) && exposes[key]) {
      if (typeof this[key] === 'function') {
        root._exposed[this.$id][key] = (...args) => {
          this[key].call(this, ...args)
        }
      } else {
        root._exposed[this.$id][key] = computed(() => this[key])
      }
    }
  }
}
