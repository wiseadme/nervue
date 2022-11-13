export function logWarning (...args: string[]) {
  console.warn(`[nervue]:`, ...args)
}

export function logError (...args: string[]) {
  console.error(`[nervue]:`, ...args)
}

export function typeOf(arg) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}

/***
 * @param target - state of store
 * @param patch - object to merge
 */
export function merge(target, patch){
  if (typeOf(target) === 'map') {
    patch.forEach((it, key) => target.set(key, it))
  }

  for (const key in patch) {
    if (
      typeOf(patch[key]) === 'object'
      && patch.hasOwnProperty(key)
    ) {
      target[key] = merge(target[key], patch[key])
    } else {
      target[key] = patch[key]
    }
  }

  return target
}
