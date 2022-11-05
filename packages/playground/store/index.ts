import { createNervue } from '../../nervue/src'
import { useUserStore } from './user-store'
import { useProductStore } from './product-store'

export const store = createNervue()

store.set(useUserStore)
store.set(useProductStore)
