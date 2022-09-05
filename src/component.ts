import { defineComponent, h } from 'vue'
import { useZikkurat } from './createZikkurat'
import { Store } from './types'

type Maybe<S> = S | null

export const VZikkurat = defineComponent({
  name: 'VZikkurat',
  props: {
    store: {
      type: [ String, Function ],
      required: true
    }
  },
  setup(props, { slots }){
    let _store: Maybe<Store> = null

    if (typeof props.store === 'string') {
      _store = useZikkurat(props.store) as Store
    } else {
      _store = props.store()
    }

    return () => h('div', {
      class: 'v-zikkurat'
    }, {
      default: () => slots.default?.({..._store})
    })
  }
})
