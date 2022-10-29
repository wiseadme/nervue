// @ts-ignore
import { useComputedStore } from './mocks/computed-store.mock'

describe('Computed', () => {
  let store

  beforeEach(() => {
    store = useComputedStore()
  })

  test('it should get full name', () => {
    store.setName('Antonio')
    store.setFamilyName('Handel')

    expect(store.fullName).toEqual('Antonio Handel')
  })
})
