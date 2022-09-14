import { ref, ComputedRef } from 'vue'
import { Method, Store } from './types'

export const NERVUE_ROOT_SYMBOL = Symbol.for('nervue')

export interface Root {
  _stores: Record<string, Store>,
  _exposed: Record<string, Record<string, ComputedRef | Method>>
  isInstalled: boolean
}

export const root = ref<Root>({
  isInstalled: false,
  _stores: {},
  _exposed: {}
})
