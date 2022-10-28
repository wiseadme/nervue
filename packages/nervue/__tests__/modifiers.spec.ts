// @ts-ignore
import { useModifiersStore } from './mocks/modifiers-store.mock'

describe('Modifiers', () => {
  let store

  beforeEach(() => {
    store = useModifiersStore()
  })

  test('it should get full name', () => {
    store.setName('Antonio')
    store.setFamilyName('Handel')

    expect(store.fullName).toEqual('Antonio Handel')
  })
})
