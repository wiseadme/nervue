// @ts-ignore
export const useUserStore = defineNervueStore({
  id: 'USER',
  state: () => ({
    name: 'Alexandr'
  }),

  computed: {
    fullName: store => store.name + ' Krasava'
  },

  actions: {
    setName(name){
      this.$patch({ name })
    }
  }
})
