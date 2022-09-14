import { onUnmounted, getCurrentInstance } from 'vue'

export const subscriptionsBefore = {}
export const subscriptionsAfter = {}
export const onErrorSubscriptions = {}

export type SubscribeOptions = {
  storeId: string
  name: string
  detached?: boolean
  before?(...args: any[]): any
  after?(result: any[]): any
  onError?(error: any): any
}

export type ExistingSubscribers = {
  beforeList: ((...args: any) => any)[]
  afterList: ((res: any) => any)[]
  onErrorList: ((error: unknown) => unknown)[]
}

export type Unsubscribe = () => Promise<boolean>

/**
 * @param options
 * @returns unsubscribe function
 */
export function $subscribe(options: SubscribeOptions): Unsubscribe{
  const { name, storeId, before, after, onError } = options
  const subId = `${ storeId }/${ name }`

  if (before && !subscriptionsBefore[subId]) {
    subscriptionsBefore[subId] = []
  }

  if (after && !subscriptionsAfter[subId]) {
    subscriptionsAfter[subId] = []
  }

  if (onError && !onErrorSubscriptions[subId]) {
    onErrorSubscriptions[subId] = []
  }

  let bInd, aInd, oInd

  before && (bInd = subscriptionsBefore[subId].push(before) - 1)
  after && (aInd = subscriptionsAfter[subId].push(after) - 1)
  onError && (oInd = onErrorSubscriptions[subId].push(onError) - 1)

  const unsubscribe = (): Promise<boolean> => {
    return new Promise((resolve) => {
      subscriptionsBefore[subId].splice(bInd, 1)
      subscriptionsAfter[subId].splice(aInd, 1)
      onErrorSubscriptions[subId].splice(oInd, 1)

      resolve(true)
    })
  }

  if (options.detached && getCurrentInstance()) {
    onUnmounted(unsubscribe)
  }

  return unsubscribe
}

export function triggerSubs(subscribers, ...args: any[]){
  subscribers.slice().forEach(fn => fn(...args))
}

export function getSubscribers(storeId: string, name: string): ExistingSubscribers{
  return {
    beforeList: subscriptionsBefore[`${ storeId }/${ name }`],
    afterList: subscriptionsAfter[`${ storeId }/${ name }`],
    onErrorList: onErrorSubscriptions[`${ storeId }/${ name }`]
  }
}


