import { createVueZone } from '../../src/index'
import { useUserStore } from '../user-store'

export const store = createVueZone()

store.add(useUserStore)
