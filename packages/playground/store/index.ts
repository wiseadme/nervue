import { createNervue } from '../../nervue/dist/nervue.mjs'
import { useUserStore } from './user-store'

export const store = createNervue()

store.add(useUserStore)
