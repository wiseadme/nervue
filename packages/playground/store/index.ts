import { ref } from 'vue'
import { createNervue } from '../../nervue/src'

export const store = createNervue()

store.use(({ store, options }) => {
    if (!options.state?.().name) {
      options.state = () => {
        const state = options.state?.()
        state!.name = 'Ilham Aliev'

        return state!
      }
    }
  if (store.$id) {
    console.log(store)
  }
  store.brother = ref('Brother')
})
