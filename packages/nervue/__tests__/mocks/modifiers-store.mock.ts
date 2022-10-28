// @ts-ignore
import { defineStore } from '../../src'

export const useModifiersStore = defineStore({
  id: 'MODIFIERS',
  state: () => ({
    name: 'Alex',
    familyName: 'Douglas'
  }),
  modifiers: {
    fullName: state => `${ state.name } ${ state.familyName }`
  },
  actions: {
    setName(name){
      this.name = name
    },

    setFamilyName(familyName){
      this.familyName = familyName
    }
  }
})
