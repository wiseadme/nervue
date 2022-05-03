import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { defineActions, defineState, defineStore } from '../src/index'
import 'regenerator-runtime/runtime'

const TestComponent = defineComponent({
  props: {
    value: [ String, Number, Boolean ]
  },
  setup(props){
    return () => h('div', {
      class: 'container'
    }, props.value)
  }
})

describe('defineStore', () => {
  let state, actions

  const key = 'user'

  beforeEach(() => {
    state = () => ({ name: 'Alex' })

    actions = {
      setName(name){
        this.name = name
      }
    }
  })

  const mountFunction = (options = {}) => mount(TestComponent, { ...options })

  it('should test the store definition', async () => {
    const useStore = defineStore(key, { state, actions })

    const store = useStore() as any

    const wrapper = mountFunction({ props: { value: null } })

    store.setName('John')

    await wrapper.setProps({ value: store.state.name })

    expect(store.state.name).toEqual('John')
    expect(wrapper.find('.container').text()).toEqual('John')

    store.setName('Viktor')
    await wrapper.setProps({ value: store.state.name })

    expect(store.state.name).toEqual('Viktor')
    expect(wrapper.find('.container').text()).toEqual('Viktor')
  })

  it('should test separate definition of actions and state', async () => {
    const directState: any = defineState(key, state)
    const directActions = defineActions(key, actions)

    const wrapper = mountFunction({ props: { value: directState.name } })

    directActions.setName('Vladimir')

    await wrapper.setProps({ value: directState.name })

    expect(directState.name).toEqual('Vladimir')
    expect(wrapper.find('.container').text()).toEqual('Vladimir')
  })
})
