import { createZikkurat } from '../../src/index'
import { useUserStore } from '../user-store'

export const store = createZikkurat()

store.add(useUserStore)
