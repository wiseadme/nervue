import { createNervue, defineStore, useStore } from '../src'

const store = createNervue()

const useUserStore = defineStore({
  id: 'USER',
  state: () => ({
    name: '',
    age: '',
    profession: ''
  }),
  actions: {
    setUser({ name, age, profession }){
      this.$patch({ name, age, profession })
    }
  },
  expose: {
    name: true,
    age: true,
    setUser: true
  }
})

store.installed = true

describe('Expose', () => {
  test('test store exposed props', () => {
    const userStore = useStore('USER')

    userStore.setUser({
      name: 'Alex',
      age: 42,
      profession: 'Programmer'
    })

    expect(useUserStore().name).toEqual('Alex')
    expect(useUserStore()._expose).toEqual(['name', 'age', 'setUser'])
    expect(userStore.name).toEqual('Alex')
  })
})
