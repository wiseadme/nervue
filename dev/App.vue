<script lang="ts">
  import { mapActions, mapState } from '../src/index'
  import { useUserStore } from './user-store'

  export default {
    name: 'App',
    data() {
      return {}
    },

    computed: {
      ...mapState(useUserStore, {
        name: store => store.name + 'Salam'
      })
    },

    mounted() {
      setTimeout(() => this.setName('Alex'), 2000)
      setTimeout(() => this.setName('Rovsh'), 4000)
    },

    methods: {
      ...mapActions(useUserStore),

      setNewName() {
        const store = useUserStore()

        store.name = 'Hohoho'
      }
    },
  }
</script>
<template>
  <h1>VueZone</h1>
  <span>{{ name }}</span>

  <button @click="setNewName">CHANGE NAME</button>
</template>
