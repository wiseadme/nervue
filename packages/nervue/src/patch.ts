import { UnwrapRef } from 'vue'
import { StateTree } from './types'

export function $patch<S = StateTree>(
  mutator: (state: UnwrapRef<S>) => void
){
  const mutatorType = typeof mutator

  if (mutatorType === 'function') {
    mutator(this.$state)
  } else if (mutatorType === 'object') {

  }
}
