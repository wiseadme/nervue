import { useNuxtApp } from '#imports'

export * from 'nervue'

export const useNervueStore = () => useNuxtApp().$nervue
