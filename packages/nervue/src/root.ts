import { ref } from 'vue-demi'
import { Store } from './types'

export const ROOT_SYMBOL = Symbol.for('nervue')

/*TODO - need define compatible type for the exposed values*/
export interface Root {
  isInstalled: boolean;
  _stores: Record<string, Store>;
  _exposed: Record<string, /*Method | ComputedRef*/ any>;
}


export const root = ref<Root>({
  isInstalled: false,
  _stores: {},
  _exposed: {}
})
