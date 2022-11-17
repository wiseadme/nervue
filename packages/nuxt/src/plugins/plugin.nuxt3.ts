import { createNervue } from 'nervue'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const nervue = createNervue()
  nuxtApp.vueApp.use(nervue)

  return {
    provide: {
      nervue,
    },
  }
})
