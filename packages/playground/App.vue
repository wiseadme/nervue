<script lang="ts">
  import { mapActions, mapState } from '../nervue/src'
  import { useUserStore } from './store/user-store'
  import { useProductStore } from './store/product-store'

  export default {
    name: 'App',
    data(){
      return {
        sharedName: ''
      }
    },

    computed: {
      ...mapState(useUserStore, {
        name: store => store.name,
        fullName: store => store.getUserFullName,
        company: 'org'
      }),
      ...mapState(useProductStore, {
        items: store => store.items
      })
    },

    created(){
      this.note = useUserStore()

      this.note.$patch(state => {
        state.name = 'Randevounier'
      })

      this.note._exposed.USER.setName('gandsdklfjghsldfkjghsldkfjghsi')
    },

    mounted(){
      setTimeout(() => this.setName('Alex'), 2000)
      const userStore = useUserStore()

      // userStore.$patch(state => {
      //   state.name = 'Randevounier'
      // })

      this.note.$patch({
        name: 'Sjg;sdflkgjs;dflkg'
      })

      this.note.$guards.name.push(() => {
        return { next: true }
      })

      this.note.age = 45

      const unsubscribe = userStore.$subscribe({
        name: 'setName',
        before(){
          console.log('it happend before setName')
        },
        after(res){
          console.log(res)
          console.log('it happend after setName')
        },
        onError(error: any): any{
          console.log(error, 'on error')
        }
      })

      setTimeout(() => {
        this.setName('Ronaldinhos')
        this.fetchProductItems()
      }, 4000)
    },

    methods: {
      ...mapActions(useUserStore, [ 'setName' ]),

      ...mapActions(useProductStore, {
        fetchProductItems: 'fetchItems'
      }),

      setNewName(){
        const { setName } = useUserStore()
        setName('Dmitriy')
      }
    },
  }
</script>
<template>
  <h1>Nervue state manager library for Vue 3</h1>
  <h2>{{ fullName }}</h2>
  <!--  <v-nervue-->
  <!--    v-slot="{name}"-->
  <!--    :store="UserStoreId"-->
  <!--  >-->
  <!--    <h1>{{ name }}</h1>-->
  <!--  </v-nervue>-->

  <button @click="setNewName">CHANGE NAME</button>
</template>
