import { defineStore } from '../src'

const state = () => ({
  name: '',
  age: '',
  org: {}
})

const actions = {
  async setName(name: string): Promise<void>{
    this.name = name
    console.log(this)
  }
}

export const useUserStore = defineStore({
  id: 'user',
  state,
  actions
})
