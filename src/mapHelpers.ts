import { ActionsTree, StateTree } from './types'

export const mapActions = (useStore): ActionsTree => {
  const store = useStore()
  const map = {}

  for (const key of Object.keys(store)) {
    if (typeof store[key] === 'function') {
      map[key] = (...args) => store[key].call(store, ...args)
    }
  }

  return map
}

export const mapState = (useStore): StateTree => {
  const store = useStore()
  const map = {}

  for (const key of Object.keys(store)) {
    if (typeof store[key] !== 'function') {
      map[key] = useStore()[key]
    }
  }

  return map
}
