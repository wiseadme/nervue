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
    name:[ val => val.length > 10],
    age: [val => !!val],
  },

  actions: {
    async setName(name: string): Promise<void>{
      this.name = name

      console.log(this)
    },

    setAge(age) {
      this.age = age
    }
  },
})

// const store = useUserStore()
