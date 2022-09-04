import { defineStore } from '../src'

const state = () => ({
  name: '',
  age: 25,
  org: {}
})

const actions = {
  async setName(name: string): Promise<void>{
    this.name = name
  },

  setAge(age) {
    this.age = age
  }
}

export const useUserStore = defineStore({
  id: 'user',
  state,
  actions
})
