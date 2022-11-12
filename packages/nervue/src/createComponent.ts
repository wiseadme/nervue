import {
  h,
  defineComponent,
  DefineComponent,
} from 'vue-demi'

export function createComponent(useStore): DefineComponent {
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
