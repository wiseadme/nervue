import { computed, reactive } from 'vue'
import { getRoot } from './createNervue'

export function $expose(exposedOptions){
  const root = getRoot()

  if (root._exposed[this.$id]) return

  root._exposed[this.$id] = {}

  Object.keys(exposedOptions).forEach(key => {
    root._exposed[this.$id][key] = computed(() => this[key])
  })

  console.log(root, 'root', exposedOptions)
}
