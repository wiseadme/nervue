import { createNervue } from '../../src/index'
import { useUserStore } from '../user-store'

export const store = createNervue()

store.add(useUserStore)
