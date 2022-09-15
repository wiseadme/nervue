import { defineStore } from '../nervue/src'

export const UserStoreId = 'USER'

export const useUserStore = defineStore({
  id: UserStoreId,

  state: () => ({
    name: '',
    age: 35,
    org: {}
  }),

  guards: {
    name: [
      val => ({ next: val.length > 10 })
    ],
    age: [
      val =>
        ({ next: !!val })
    ],
  },

  expose: {
    name: true,
    setName: true
  },

  actions: {
    async setName(name: string): Promise<any>{
      this.name = name
      await new Promise(res => setTimeout(res, 2000))
      return name
    },

    setAge(age){
      this.age = age
    }
  },
})

// const store = useUserStore()
