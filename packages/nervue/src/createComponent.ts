import {
  h,
  defineComponent,
  DefineComponent,
} from 'vue-demi'
import { StoreDefinition } from './types'

export function createComponent(useStore: StoreDefinition): DefineComponent {
  return defineComponent({
    name: (`use-${ useStore.$id }-store`).toLowerCase(),

    setup(_, { attrs, slots }) {
      return () => h('div', {
        class: 'v-nervue',
        ...attrs
      }, {
        default: () => slots.default?.({ ...useStore() })
      })
    }
  })

}
