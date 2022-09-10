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
        this.state.name = name
      }
    }
  })

  const mountFunction = (options = {}) => mount(TestComponent, { ...options })

  it('should test the store definition', async () => {
    const useStore = defineStore({ id, state, actions })

    const { name, setName } = useStore()

    const wrapper = mountFunction({ props: { value: null } })

    setName('John')

    await wrapper.setProps({ value: name })

    expect(name).toEqual('John')
    expect(wrapper.find('.container').text()).toEqual('John')

    setName('Viktor')
    await wrapper.setProps({ value: name })

    expect(name).toEqual('Viktor')
    expect(wrapper.find('.container').text()).toEqual('Viktor')
  })
})
