import { ActionsTree, GuardsTree, StateTree, Store } from './types'

export const root: Record<string, Store<string, StateTree, GuardsTree, ActionsTree>> = {}
