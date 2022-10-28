// @ts-ignore
import { useGuardsMockStore } from './mocks/guards-store.mock'

describe('Guards', () => {
  let store

  beforeEach(() => {
    store = useGuardsMockStore()
  })

  test('it should check and protect the state from mutation', () => {
    const stub = jest.spyOn(console, 'warn')
    store.setAge(15)

    expect(store.userAge).toEqual(null)
    expect(stub).toHaveBeenCalledWith(
      '[nervue]:',
      '{guards}: The value \"15\" is not valid for mutation the value',
      'of state property "userAge" in the "GUARDS" store'
    )
  })

  test('it should check and mutate the state', () => {
    store.setAge(21)

    expect(store.userAge).toEqual(21)
  })

  test('it should update data for mutation the state', () => {
    store.$guards.userAge.push((val) => ({
      next: true,
      value: val * 2
    }))

    store.setAge(21)

    expect(store.userAge).toEqual(42)
  })

  test('it should test guarding step by step', () => {
    const stub = jest.fn((...args) => ({ next: true, value: args }))

    store.$guards.userAge.push(stub)
    store.setAge(21)

    expect(stub).toBeCalledWith(42)
  })
})
