import { createNervue, defineStore } from '../src'

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
    profession: true,
    setUser: true
  }
})

const useEmployerStore = defineStore({
  id: 'EMPLOYER',
  state: () => ({
    workers: []
  }),
  actions: {
    setWorkers(workers){
      this.$patch(state => {
        state.workers = workers
      })
    }
  },
  expose: {
    setWorkers: true
  }
})

store.installed = true
store.set(useUserStore)
store.set(useEmployerStore)

describe('Expose', () => {
  test('test user store exposed props', () => {
    const employerStore = useEmployerStore()

    employerStore.$exposed!.USER.setUser({
      name: 'Alex',
      age: 42,
      profession: 'Programmer'
    })

    expect(useUserStore().name).toEqual('Alex')
    expect(useUserStore().age).toEqual(42)
    expect(useUserStore().profession).toEqual('Programmer')

    expect(employerStore.$exposed!.USER.name).toEqual('Alex')
    expect(employerStore.$exposed!.USER.profession).toEqual('Programmer')
    expect(employerStore.$exposed!.EMPLOYER).toEqual(undefined)
  })

  test('test employer store exposed props', () => {

  })
})
