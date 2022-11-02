// @ts-ignore
import { defineStore } from '../../nervue/dist/nervue.mjs'

export const PRODUCT = 'PRODUCT'

type ProductActions = {
  fetchItems(): Promise<void>
}

const actions: ProductActions = {
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

export const useProductStore = defineStore({
  id: 'PRODUCT',

  state: () => ({
    items: null
  }),

  guards: {
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
  },

  computed: {
    visibleItems: (state) => state.items.filter(it => it.isVisible)
  },

  actions,

  expose: {
    items: true
  }
})
