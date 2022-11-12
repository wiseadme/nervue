<script lang="ts">
  import { mapActions, mapState, useNervue } from '../../nervue/src'
  import { useUserStore } from '../store/user-store'
  import { useProductStore } from '../store/product-store'

  export default {
    name: 'App',

    data(){
      return {
        productStore: useNervue('PRODUCT')
        // userStore: null
      }
    },

    computed: {
      ...mapState(useUserStore, {
        name: store => store.name,
        fullName: 'fullNameAndAge',
        company: 'org'
      }),
      ...mapState(useProductStore, {
        items: store => store.items
      }),
      ...mapState(useUserStore, ['name'])
    },

    created(){
      this.userStore = useUserStore()

      this.userStore.$patch({name: 'Randevounier'})

      this.userStore.setName('gandsdklfjghsldfkjghsldkfjghsi')
    },

    mounted(){
      this.userStore.$patch(state => {
        state.name = 'Randevounier'
      })

      console.log(this.userStore, this.productStore)

      setTimeout(() => this.userStore.setName('Alexandr'), 2000)
      setTimeout(() => this.setName('Ron'), 4000)

      this.userStore._guards.name.push((val) => ({ next: !!val }))

      this.userStore.$patch({
        age: 17,
        name: 'sdfsdfsdf'
      })

      const unsubscribe = this.userStore.$subscribe({
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

      unsubscribe()
    },

    methods: {
      ...mapActions(useUserStore, [ 'setName', 'setUser' ]),

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
  <h1>Options API Nervue</h1>
  <h2>{{ fullName(35) }}</h2>
  <button @click="setNewName">CHANGE NAME</button>
  <h2>{{ $nervue.stores.USER.name }}</h2>
</template>
