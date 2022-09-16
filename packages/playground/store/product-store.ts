import { defineStore } from '../../nervue/src'

export const PRODUCT = 'PRODUCT'

const state = () => ({
  items: null
})

const guards = {
  items: [
    val => ({
      value: val.filter(it => it.visible),
      next: true
    }),
    val => {
      const found = val.find(it => it.title === 'DJI Mavic 3')

      return {
        value: found,
        next: !!found
      }
    }
  ]
}

const actions = {
  async fetchItems(){
    setTimeout(() => {
      this.items = [
        { title: 'DJI mini 3 Pro', visible: false },
        { title: 'DJI air 2s', visible: true },
        { title: 'DJI Mavic 3', visible: true },
      ]
    })
  }
}

const expose = {
  items: true
}

export const useProductStore = defineStore({
  id: PRODUCT,
  state,
  guards,
  expose,
  actions
})
