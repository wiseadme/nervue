import { defineStore } from '../src'

const state = () => ({
  name: '',
  age: ''
})

const actions = {
  async setName(name: string): Promise<void> {
    console.log(this)
    this.state.name = name
  }
}

export const useUserStore = defineStore<string, {}, {}>('user', {
  state,
  actions
})
