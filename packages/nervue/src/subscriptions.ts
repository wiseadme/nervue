export const subscriptionsBefore = {}
export const subscriptionsAfter = {}
export const onErrorSubscriptions = {}
export const onSuccessSubscriptions = {}

export type SubscribeOptions = {
  storeId: string
  name: string
  before?(...args: any[]): any
  after?(result: any[]): any
  onError?(error: any): any
}

export type ExistsSubscribers = {
  before: SubscribeOptions['before'][]
  after: SubscribeOptions['after'][]
  onError: SubscribeOptions['onError'][]
}

export type Unsubscribe = () => Promise<boolean>

/**
 * @param options
 * @return unsubscribe function
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

  before && subscriptionsBefore[subId].push(before)
  after && subscriptionsAfter[subId].push(after)
  onError && onErrorSubscriptions[subId].push(onError)

  this[name].hasSubs = true

  return () => {
    return new Promise((resolve) => {
      delete subscriptionsBefore[subId]
      delete subscriptionsAfter[subId]
      delete onErrorSubscriptions[subId]
      delete onSuccessSubscriptions[subId]

      resolve(true)
    })
  }
}

export function getExistsSubscribers(
  storeId: string,
  name: string
): ExistsSubscribers{
  return {
    before: subscriptionsBefore[`${ storeId }/${ name }`],
    after: subscriptionsAfter[`${ storeId }/${ name }`],
    onError: onErrorSubscriptions[`${ storeId }/${ name }`]
  }
}

export const trigger = (subscribers, ...args: any[]) => {
  subscribers.slice().forEach(fn => fn(...args))
}
