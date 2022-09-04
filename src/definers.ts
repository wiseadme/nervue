import { ToRefs } from 'vue'
import { convertToRefs } from './helpers'

export const definesMap: Map<string, any> = new Map()
/**
 * @param id - the key to save the created state
 * @param genState - the function that creates the state
 */
export const defineState = <S = {}>(id: string, genState: () => S): ToRefs<S> => {
  definesMap.set(`${ id }-state`, convertToRefs(genState()))

  return definesMap.get(`${ id }-state`)
}
/**
 * @param id - the key to save the created actions
 * @param actions - defined actions object
 */
export const defineActions = <A = {}>(id: string, actions: A): A => {
  definesMap.set(`${ id }-actions`, actions)

  return definesMap.get(`${ id }-actions`)
}
