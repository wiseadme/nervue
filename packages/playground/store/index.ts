import { createNervue } from '../../nervue/src'
import { useUserStore } from './user-store'

export const store = createNervue()

store.add(useUserStore)
