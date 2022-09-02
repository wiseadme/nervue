import { reactive } from 'vue'
import { ActionsTree, StateTree } from './types'

export const definesMap: Map<symbol, any> = new Map()

export const defineState = <S = {}>(id: string, genState: () => S): { state: StateTree, symbol: symbol } => {
  const symbol = Symbol(`${ id }-state`)

  definesMap.set(symbol, reactive(genState() as any))

  return { state: definesMap.get(symbol), symbol }
}

export const defineActions = <A = {}>(id: string, actions: A): { actions: ActionsTree, symbol: symbol } => {
  const symbol = Symbol(`${ id }-actions`)

  definesMap.set(symbol, actions)

  return { actions: definesMap.get(symbol), symbol }
}
