import { ref } from 'vue'
import { createNervue } from '../../nervue/src'

export const store = createNervue()

store.use(({ store }) => {
  store.brother = ref('Brother')
})
