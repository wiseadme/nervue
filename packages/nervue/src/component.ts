import { defineComponent, h } from 'vue'
import { useNervue } from './createNervue'
import { Store } from './types'

type Maybe<S> = S | null

export const VNervue = defineComponent({
  name: 'VNervue',
  props: {
    store: {
      type: [ String, Function ],
      required: true
    }
  },
  setup(props, { slots }){
    let _store: Maybe<Store> = null

    if (typeof props.store === 'string') {
      _store = useNervue(props.store) as Store
    } else {
      _store = props.store()
    }

    return () => h('div', {
      class: 'v-nervue'
    }, {
      default: () => slots.default?.({..._store})
    })
  }
})
