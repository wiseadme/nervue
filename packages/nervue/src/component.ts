import { defineComponent, h } from 'vue'
import { useNervue } from './createNervue'
import { Store } from './types'

export const VNervue = defineComponent({
  name: 'VNervue',
  props: {
    store: {
      type: [ String, Function ],
      required: true
    }
  },
  setup(props, { slots }){
    let _store = {}

    if (typeof props.store === 'string') {
      _store = useNervue(props.store) as Store
    }

    if (typeof props.store === 'function') {
      _store = props.store()
    }

    return () => h('div', {
      class: 'v-nervue'
    }, {
      default: () => slots.default?.({..._store})
    })
  }
})
