// @ts-ignore
import { defineStore } from '../src'

describe('Guards', () => {
  const useStore = defineStore({
    id: 'GUARDS',

    state: () => ({
      name: null,
      age: null
    }),

    guards: {
      age: [
        val => ({ next: val > 18 })
      ]
    },

    actions: {
      setAge(val){
        this.age = val
      }
    }
  })

  test('test skipping the mutation with warning', () => {
    const stub = jest.spyOn(console, 'warn')
    useStore().setAge(15)

    expect(useStore().age).toEqual(null)
    expect(stub).toHaveBeenCalledWith(
      '[nervue]:',
      '{guards}: 15 is invalid value for the',
      '\"age\" of the \"GUARDS\" store state'
    )
  })

  test('test mutation the state', () => {
    useStore().setAge(21)
    expect(useStore().age).toEqual(21)
  })

  test('test the data updating for mutation', () => {
    useStore().$guards.age.push((val) => ({
      next: true,
      value: val * 2
    }))

    useStore().setAge(21)
    expect(useStore().age).toEqual(42)
  })

  test('test updated data for the next guard', () => {
    const stub = jest.fn((...args) => ({ next: true, value: args }))

    useStore().$guards.age.push(stub)
    useStore().setAge(21)

    expect(stub).toBeCalledWith(42)
  })
})
