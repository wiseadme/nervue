import { defineComponent, h } from 'vue'
import { useVueZone } from './createVueZone'
import { Store } from './types'

type Maybe<S> = S | null

export const VueZoneComponent = defineComponent({
  name: 'VueZoneComponent',
  props: {
    store: {
      type: [ String, Function ],
      required: true
    }
  },
  setup(props, { slots }){
    let _store: Maybe<Store> = null

    if (typeof props.store === 'string') {
      _store = useVueZone(props.store) as Store
    } else {
      _store = props.store()
    }

    return () => h('div', {
      class: 'vue-zone-component'
    }, {
      default: () => slots.default?.({..._store})
    })
  }
})
