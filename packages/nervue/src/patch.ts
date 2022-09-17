import { UnwrapRef } from 'vue'
import { StateTree } from './types'

const mergeObjects = (target, newState) => {
  Object.keys(target).forEach((key) => {
    target[key] = newState[key]
  })
}

export function $patch<S = StateTree>(
  mutator: (state: UnwrapRef<S>) => void
){
  const mutatorType = typeof mutator

  if (mutatorType === 'function') {
    mutator(this.$state)
  } else if (mutatorType === 'object') {
    mergeObjects(this.$state, mutator)
  }
}
