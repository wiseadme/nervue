import { ref, ComputedRef } from 'vue-demi'
import { Method, Store } from './types'

export const ROOT_SYMBOL = Symbol.for('nervue')

export interface Root{
  isInstalled: boolean
  _stores: Record<string, Store>,
  _exposed: Record<string, Record<string, ComputedRef | Method>>
}

export const root = ref<Root>({
  isInstalled: false,
  _stores: {},
  _exposed: {}
})
