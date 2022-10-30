<script lang="ts">
  import { mapActions, mapState } from '../../nervue/src'
  import { useUserStore } from '../store/user-store'
  import { useProductStore } from '../store/product-store'

  export default {
    name: 'App',

    data(){
      return {
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

      setTimeout(() => this.userStore.setName('Alexandr'), 2000)
      setTimeout(() => this.setName('Ron'), 4000)

      this.userStore.$guards.name.push((val) => ({ next: !!val }))

      console.log(this.userStore)

      this.userStore.setAge(45)

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
  <h1>Options API Nervue</h1>
  <h2>{{ fullName(35) }}</h2>
  <button @click="setNewName">CHANGE NAME</button>
</template>
