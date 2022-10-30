import { defineStore } from '../src'

describe('Computed', () => {
  const useStore = defineStore({
    id: 'COMPUTED',

    state: () => ({
      name: 'Alex',
      familyName: 'Douglas',
      age: 42
    }),

    computed: {
      fullName: (state) => `${ state.name } ${ state.familyName }`,
      fullNameAndAge() {
        return this.fullName + ` ${this.age} years old`
      },
      userWithAge(): (years: number) => string{
        return (years) => this.fullName + ` ${ years } years old`
      }
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

  test('test computed full name', () => {
    useStore().setName('Antonio')
    useStore().setFamilyName('Handel')

    expect(useStore().fullName).toEqual('Antonio Handel')
  })

  test('test of access to computed through "this"', () => {
    expect(useStore().fullNameAndAge).toEqual('Antonio Handel 42 years old')
  })

  test('test computed func with argument', () => {
    expect(useStore().userWithAge(35)).toEqual('Antonio Handel 35 years old')
  })
})
