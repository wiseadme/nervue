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
    age: true,
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
    workers: true,
    setWorkers: true
  }
})

store.installed = true

describe('Expose', () => {
  test('test user store exposed props', () => {
    const employerStore = useEmployerStore()

    employerStore.$exposed.USER.setUser({
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
    const userStore = useUserStore()

    userStore.$exposed.EMPLOYER.setWorkers([
      {
        name: 'Tom',
        age: '28',
        profession: 'frontend developer'
      }
    ])

    expect(useEmployerStore().workers.length).toEqual(1)
    expect((useEmployerStore().workers[0] as any).name).toEqual('Tom')
    expect(useUserStore().$exposed.EMPLOYER.workers[0].name).toEqual('Tom')
    expect(useUserStore().$exposed!.USER).toEqual(undefined)
  })
})
