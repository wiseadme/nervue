<script lang="ts">
  import { mapActions, mapState } from '../nervue/src'
  import { useUserStore, UserStoreId } from './user-store'
  import { useProductStore } from './product-store'

  export default {
    name: 'App',
    data(){
      return {
        UserStoreId,
        sharedName: ''
      }
    },

    computed: {
      ...mapState(useUserStore, {
        name: store => store.name,
        company: 'org'
      }),
      ...mapState(useProductStore, {
        items: store => store.items
      })
    },

    created(){
      this.note = useUserStore()

      // this.note.$patch(state => {
      //   state.name = 'Randevounier'
      // })

      // this.note.$expose({
      //   name: this.note.name
      // })
      // this.note._exposed.USER.name = 'dfsfsdfsdfsdfsdf'
      this.note._exposed.USER.setName('gandsdklfjghsldfkjghsldkfjghsi')
    },

    mounted(){
      setTimeout(() => this.setName('Alex'), 2000)
      const userStore = useUserStore()

      // userStore.$patch(state => {
      //   state.name = 'Randevounier'
      // })

      const unsubscribe = userStore.$subscribe({
        storeId: userStore.$id,
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
        // unsubscribe()
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
  <h2>{{ note._exposed.USER.name }}</h2>
  <!--  <v-nervue-->
  <!--    v-slot="{name}"-->
  <!--    :store="UserStoreId"-->
  <!--  >-->
  <!--    <h1>{{ name }}</h1>-->
  <!--  </v-nervue>-->

  <button @click="setNewName">CHANGE NAME</button>
</template>
