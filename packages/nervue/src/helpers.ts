export function logWarning (...args: string[]) {
  console.warn(`[nervue]:`, ...args)
}

export function logError (...args: string[]) {
  console.error(`[nervue]:`, ...args)
}
