<script lang="ts">
  import { mapActions, mapState } from '../src'
  import { useUserStore } from './user-store'
  import { useProductStore } from './product-store'
  import { VNervue, useNervue } from '../src'

  export default {
    name: 'App',
    components: { VNervue },
    data(){
      this.user = useUserStore
      return {}
    },

    computed: {
      ...mapState(useUserStore, {
        name: store => store.name,
        font: 'age'
      }),
      ...mapState(useProductStore, {
        items: store => store.items
      })
    },

    mounted(){
      setTimeout(() => this.setName('Alex'), 2000)
      useNervue('suu')

      setTimeout(() => {
        this.setName('Ronald')
        this.fetchProductItems()
      }, 4000)
      console.log(this.font)
    },

    methods: {
      ...mapActions(useUserStore, [ 'setName' ]),

      ...mapActions(useProductStore, {
        fetchProductItems: 'fetchItems'
      }),

      setNewName(){
        const store = useUserStore()
        console.log(this.fetchProductItems)

        store.name = 'Dmitriy'
      }
    },
  }
</script>
<template>
  <h1>Nervue state manager library for Vue 3</h1>
  <span>{{ name }}</span>
  <span>{{ items }}</span>

  <v-nervue
    v-slot="{name, age}"
    store="user"
  >
    <h1>component</h1>
    <div>{{ name }} {{ age }}</div>
  </v-nervue>

  <button @click="setNewName">CHANGE NAME</button>
</template>
