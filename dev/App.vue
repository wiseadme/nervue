<script lang="ts">
  import { mapActions, mapState } from '../src'
  import { useUserStore } from './user-store'
  import { useProductStore } from './product-store'

  export default {
    name: 'App',
    data(){
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

      setTimeout(() => {
        this.setName('Ronald')
        this.fetchItems()
      }, 4000)
      console.log(this.font)
    },

    methods: {
      ...mapActions(useUserStore, [ 'setName' ]),
      ...mapActions(useProductStore, [ 'fetchItems' ]),

      setNewName(){
        const store = useUserStore()

        store.name = 'Dmitriy'
      }
    },
  }
</script>
<template>
  <h1>VueZone</h1>
  <span>{{ name }}</span>
  <span>{{ items }}</span>

  <button @click="setNewName">CHANGE NAME</button>
</template>
