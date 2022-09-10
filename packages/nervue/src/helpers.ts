import { reactive, toRefs } from 'vue'

export const convertToRefs = (stateDefinitionObject) => {
  return toRefs(reactive(stateDefinitionObject))
}

export const logWarning = (...args: string[]) => {
  console.warn(`[nervue]:`, ...args)
}

export const logError = (...args: string[]) => {
  console.error(`[nervue]:`, ...args)
}
