import { ref } from 'vue'
import { createNervue } from '../../nervue/src'

export const store = createNervue()

store.use(({ store }) => {
  const brother = ref('Brother')

  store.brother = brother

  console.log(store.brother)
})
