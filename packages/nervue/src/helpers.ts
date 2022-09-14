export const logWarning = (...args: string[]) => {
  console.warn(`[nervue]:`, ...args)
}

export const logError = (...args: string[]) => {
  console.error(`[nervue]:`, ...args)
}
