import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { defineStore } from '../src'
import 'regenerator-runtime/runtime'

const useStore = defineStore({
  id: 'USER',
  state: () => ({ name: 'Alex' }),
  actions: {
    setName(name){
      this.$patch({ name })
    }
  }
})

const store = useStore()

const TestComponent = defineComponent({
  setup(){
    return () => h('div', {
      class: 'container'
    }, store.name)
  }
})

describe('defineStore', () => {

  const mountFunction = (options = {}) => mount(TestComponent, { ...options })

  test('should test the store definition', async () => {
    const wrapper = mountFunction()

    store.setName('John')
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(store.name).toEqual('John')
    expect(wrapper.find('.container').text()).toEqual('John')

    store.setName('Viktor')
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(store.name).toEqual('Viktor')
    expect(wrapper.find('.container').text()).toEqual('Viktor')
  })
})
