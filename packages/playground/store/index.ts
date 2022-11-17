import { ref } from 'vue'
import { createNervue } from '../../nervue/src'

export const store = createNervue()

store.use(({ store }) => {
  if (store.$id) {
    console.log(store)
  }
  store.brother = ref('Brother')
})
