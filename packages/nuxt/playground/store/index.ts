// @ts-ignore
export const useUserStore = defineNervueStore({
  id: 'USER',

  state: () => ({
    name: ''
  }),

  computed: {
    fullName: store => store.name + ' Krasava'
  },

  actions: {
    async setName(name){
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')

      const post: any = await response.json()

      console.log(post.title)

      this.$patch({ name: post.title })
    }
  }
})
