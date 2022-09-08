import { defineStore } from '../nervue/src'

export const PRODUCT = 'PRODUCT'

const state = () => ({
  items: null
})

const actions = {
  async fetchItems(){
    console.log(this)
    setTimeout(() => {
      this.items = [ 'look' ]
    })
  }
}

export const useProductStore = defineStore({
  id: PRODUCT,
  state,
  actions
})
