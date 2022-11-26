import { createApp, h } from 'vue-demi'
import { defineStore, createNervue } from '../src'

describe('createNervue', () => {
  const nervue = createNervue()

  nervue.use(({ store }) => {
    store.secondName = 'Winski'
  })

  const useStore = defineStore({
    id: 'USER',
    state: () => ({
      name: 'Alex',
      age: 32
    }),
    actions: {
      setAge(val){
        this.age = val
      }
    }
  })

  test('should test nervue initialization', () => {
    expect(nervue.install).toBeTruthy()

    expect(nervue.installed).toBe(false)
    expect(nervue._s).toBeTruthy()
    expect(nervue._p.length).toBe(1)
    expect((nervue._e as any).scopes.length).toBe(1)

    nervue.install(createApp(h('div')))

    expect(nervue._s.USER).toBeTruthy()
    expect(useStore()).toEqual(nervue._s.USER())
    expect(nervue.installed).toBe(true)
  })

  test('should test nervue plugins', () => {
    const store = useStore()

    expect((store as any).secondName).toEqual('Winski')
  })
})
