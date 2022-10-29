// @ts-ignore
import { useGuardsMockStore } from './mocks/guards-store.mock'

describe('Guards', () => {
  let store

  beforeEach(() => {
    store = useGuardsMockStore()
  })

  test('skip the mutation with warning', () => {
    const stub = jest.spyOn(console, 'warn')
    store.setAge(15)

    expect(store.userAge).toEqual(null)
    expect(stub).toHaveBeenCalledWith(
      '[nervue]:',
      '{guards}: 15 is invalid value for the',
      '\"userAge\" of the \"GUARDS\" store state'
    )
  })

  test('mutate the state', () => {
    store.setAge(21)
    expect(store.userAge).toEqual(21)
  })

  test('update the data for mutation', () => {
    store.$guards.userAge.push((val) => ({
      next: true,
      value: val * 2
    }))

    store.setAge(21)
    expect(store.userAge).toEqual(42)
  })

  test('updated data for the next guard', () => {
    const stub = jest.fn((...args) => ({ next: true, value: args }))

    store.$guards.userAge.push(stub)
    store.setAge(21)

    expect(stub).toBeCalledWith(42)
  })
})
