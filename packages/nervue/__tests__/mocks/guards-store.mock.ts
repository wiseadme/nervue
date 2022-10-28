import { defineStore } from '../../src'

export const useGuardsMockStore = defineStore({
  id: 'GUARDS',

  state: () => ({
    userName: null,
    userAge: null
  }),

  guards: {
    userAge: [
      val => ({
        next: val > 18
      })
    ]
  },

  actions: {
    setAge(val){
      this.userAge = val
    }
  }
})
