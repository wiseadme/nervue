// @ts-ignore
import { defineStore } from '../src'
import 'regenerator-runtime/runtime'

describe('Subscribers', () => {
  const useStore = defineStore({
    id: 'SUBSCRIPTIONS',

    state: () => ({
      user: null
    }),

    actions: {
      setUser(user){
        this.user = user
        return user
      },
      setUserProfession(profession){
        if (profession !== 'programmer') {
          throw `${ profession } is not accessible`
        }

        this.user.profession = profession
      },
      setUserAsync(user){
        return new Promise(resolve => {
          setTimeout(() => {
            this.$patch({ user })
            resolve(user)
          }, 1000)
        })
      }
    }
  })

  const user: any = {
    name: 'Alex',
    age: 17
  }

  let stubBefore, stubAfter, onErrorStub, spyStub

  beforeEach(() => {
    stubBefore = jest.fn((user) => {
      user.isAdult = user.age < 18 ? 'false' : 'true'
    })
    stubAfter = jest.fn((result) => {
      console.log('after', JSON.stringify(result))
    })
    onErrorStub = jest.fn((error) => {
      console.log(error)
    })
    spyStub = jest.spyOn(console, 'log')
  })

  test('test before', async () => {
    const unsubscribe = useStore().$subscribe({
      name: 'setUser',
      before: stubBefore,
    })

    useStore().setUser(user)

    expect(stubBefore).toBeCalledTimes(1)
    expect(stubBefore).toBeCalledWith(user)
    expect(user.isAdult).toEqual('false')

    await unsubscribe()
  })

  test('test after', async () => {
    const unsubscribe = useStore().$subscribe({
      name: 'setUser',
      after: stubAfter,
    })

    useStore().setUser(user)

    expect(stubAfter).toBeCalledTimes(1)
    expect(stubAfter).toBeCalledWith(user)
    expect(spyStub).toBeCalledWith('after', JSON.stringify(user))

    await unsubscribe()
  })

  test('test onError', async () => {
    const profession = 'designer'

    const unsubscribe = useStore().$subscribe({
      name: 'setUserProfession',
      onError: onErrorStub,
    })

    try {
      useStore().setUserProfession(profession)
    } catch (err) {
      expect(onErrorStub).toBeCalledTimes(1)
      expect(onErrorStub).toBeCalledWith(`${ profession } is not accessible`)
      expect(spyStub).toBeCalledWith(`${ profession } is not accessible`)
    }

    await unsubscribe()
  })

  test('test before and after together', async () => {
    const unsubscribe = useStore().$subscribe({
      name: 'setUserAsync',
      before: stubBefore,
      after: stubAfter,
    })

    useStore().setUserAsync(user)

    expect(stubAfter).toBeCalledTimes(0)
    expect(stubBefore).toBeCalledTimes(1)

    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(stubAfter).toBeCalledTimes(1)

    await unsubscribe()
  })
})
