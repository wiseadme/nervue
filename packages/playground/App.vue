<script lang="ts">
  import { mapActions, mapState } from '../nervue/src'
  import { useUserStore } from './user-store'
  import { useProductStore } from './product-store'
  import { VNervue } from '../nervue/src'

  export default {
    name: 'App',
    components: { VNervue },
    data(){
      this.user = useUserStore()
      return {}
    },

    computed: {
      // ...mapState(useUserStore, {
      //   name: store => store.name,
      //   font: 'age'
      // }),
      // ...mapState(useProductStore, {
      //   items: store => store.items
      // })
    },

    mounted(){
      setTimeout(() => this.setName('Alex'), 2000)

      this.user.$patch(state => {
        state.name = 'Gandiniramsndbf'
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
        const { setName, name } = useUserStore()

        setName('Dmitriy')

        console.log(name)
      }
    },
  }
</script>
<template>
  <h1>Nervue state manager library for Vue 3</h1>
  <v-nervue
    v-slot="{name, age}"
    store="USER"
  >
    <h1>component</h1>
    <div>{{ name }} || {{ age }}</div>
  </v-nervue>

  <button @click="setNewName">CHANGE NAME</button>
</template>
