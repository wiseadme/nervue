import { ActionsTree, GuardsTree, StateTree, Store, StoreId } from './types'

export const root: Map<StoreId, Store<StoreId, StateTree, GuardsTree, ActionsTree>> = new Map()
