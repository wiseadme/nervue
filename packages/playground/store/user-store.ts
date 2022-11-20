import { defineStore } from '../../nervue/src'

export const useUserStore = defineStore({
  id: 'USER',

  state: () => ({
    name: '',
    age: 35,
    org: {}
  }),

  guards: {
    name: [
      val => ({ next: val.length > 5 })
    ],
    age: [
      val => ({ next: val >= 18 })
    ],
  },

  computed: {
    fullName: (store) => store.name + ' Sivkov',
    /***
     * Returns full name with user age
     * @returns {(age) => string}
     */
    fullNameAndAge(){
      return (age) => this.fullName + ` ${ age } + ${ this.age }`
    }
  },

  actions: {
    async setName(name: string): Promise<any>{
      await new Promise(res => setTimeout(() => {
        this.$patch({ name })
        res(true)
      }, 2000))
      return name
    },

    setUser(user){
      this.$patch(state => {
        state.name = user.name
        state.age = user.age
        state.org = user.org
      })
    }
  },

  expose: {
    name: true,
    fullName: true,
    setName: true,
  },
})

const store = useUserStore()

store.$subscribe({
  name: 'setUser',
  detached: true,
  before(){
    console.log('set age')
  }
})
