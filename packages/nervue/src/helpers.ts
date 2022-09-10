import { reactive, toRefs } from 'vue'

export const convertToRefs = (stateDefiningObject) => {
  return toRefs(reactive(stateDefiningObject))
}

export const logWarning = (...args: string[]) => {
  console.warn(`[nervue]:`, ...args)
}

export const logError = (...args: string[]) => {
  console.error(`[nervue]:`, ...args)
}
