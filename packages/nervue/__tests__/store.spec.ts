import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { defineStore } from '../src'
import 'regenerator-runtime/runtime'

const TestComponent = defineComponent({
  props: {
    value: {
      type: [ String, Number, Boolean ],
      default: null
    }
  },
  setup(props) {
    return () => h('div', {
      class: 'container'
    }, props.value)
  }
})

describe('defineStore', () => {
  let state, actions

  const id = 'user'

  beforeEach(() => {
    state = () => ({ name: 'Alex' })

    actions = {
      setName(name) {
        this.name = name
      }
    }
  })

  const mountFunction = (options = {}) => mount(TestComponent, { ...options })

  test('should test the store definition', async () => {
    const useStore = defineStore({ id, state, actions })

    const store = useStore()

    const wrapper = mountFunction({ props: { value: null } })

    store.setName('John')

    await wrapper.setProps({ value: store.name })

    expect(store.name).toEqual('John')
    expect(wrapper.find('.container').text()).toEqual('John')

    store.setName('Viktor')
    await wrapper.setProps({ value: store.name })

    expect(store.name).toEqual('Viktor')
    expect(wrapper.find('.container').text()).toEqual('Viktor')
  })
})
