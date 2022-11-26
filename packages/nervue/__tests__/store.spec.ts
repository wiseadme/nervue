import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { defineStore } from '../src'
import 'regenerator-runtime/runtime'

const useStore = defineStore({
  id: 'USER',
  state: () => ({ name: 'Alex', secondName: 'Winski' }),
  guards: {
    name: [
      val => ({ next: val.length > 3 })
    ]
  },
  computed: {
    fullName: store => `${ store.name } ${ store.secondName }`
  },
  actions: {
    setName(name){
      this.$patch({ name })
    }
  }
})

const createCmp = (store) => defineComponent({
  setup(){
    return () => h('div', {
      class: 'container'
    }, store.name)
  }
})

describe('defineStore', () => {
  let mountFunction, Component, store

  beforeEach(() => {
    mountFunction = (options = {}) => mount(Component, { ...options })
  })

  test('should test the store definition', async () => {
    store = useStore()

    expect(store.$id).toEqual('USER')
    expect(store.$patch).toBeTruthy()
    expect(store.$subscribe).toBeTruthy()
    expect(store.$state).toBeTruthy()
    expect(store.$state.name).toBeTruthy()
    expect(store.name).toBe('Alex')
    expect(store.name).toEqual(store.$state.name)
    expect(store.setName).toBeTruthy()
    expect(store._guards).toBeTruthy()
    expect(store._computed.length).toEqual(1)
    expect(store._computed).toContain('fullName')
  })

  test('should test reactivity in component', async () => {
    store = useStore()
    Component = createCmp(store)
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
