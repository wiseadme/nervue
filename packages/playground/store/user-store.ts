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
      val => ({ next: !!val })
    ],
  },

  computed: {
    fullName: (state) => state.name + ' Sivkov',
    /***
     * Returns full name with user age
     * @returns {(age) => string}
     */
    fullNameAndAge(){
      return (age) => this.fullName + ` ${ age }`
    }
  },

  actions: {
    async setName(name: string): Promise<any>{
      this.$patch({ name })
      await new Promise(res => setTimeout(res, 2000))
      return name
    },

    setAge(age){
      this.$patch({ age })
    }
  },

  expose: {
    name: true,
    fullName: true,
    setName: true,
    setAge: true
  },
})

const store = useUserStore()

store.$subscribe({
  name: 'setAge',
  before(){
    console.log('set age')
  }
})
