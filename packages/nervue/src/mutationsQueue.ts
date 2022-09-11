import { StateTree } from './types'

type Mutator = (patchToApply: StateTree) => void

export const mutationsQueue = [] as Mutator[]

export const addMutationToQueue = (mutator) => {
  mutationsQueue.push(mutator)

  return () =>  {

  }
}
