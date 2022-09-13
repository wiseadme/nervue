import { ref, Ref } from 'vue'
import { Store } from './types'

export const NERVUE_ROOT_SYMBOL = Symbol.for('nervue')

export interface Root {
  _stores: Record<string, Store>,
  _exposed: Record<string, Record<string, any>>
  isInstalled: boolean
}

export const root = ref({}) as Ref<Root>

root.value._stores = {} as Root['_stores']
root.value._exposed = {} as Root['_exposed']
