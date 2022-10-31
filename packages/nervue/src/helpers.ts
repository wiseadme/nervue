export function logWarning (...args: string[]) {
  console.warn(`[nervue]:`, ...args)
}

export function logError (...args: string[]) {
  console.error(`[nervue]:`, ...args)
}

export function typeOf(arg) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}
