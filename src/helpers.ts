import { reactive, toRefs } from 'vue'

export const convertToRefs = stateDefiningObject => {
  return toRefs(reactive(stateDefiningObject))
}

export const logWarning = (msg: string) => {
  console.warn(`[nervue]:`, msg)
}

export const logError = (msg: string) => {
  console.error(`[nervue]:`, msg)
}
