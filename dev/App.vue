<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapState } from '../src/index'
  import { useUserStore } from './user-store'

  export default defineComponent({
    name: 'App',
    setup(){
      const store = useUserStore()
      const map = mapActions(useUserStore)
      const state = mapState(useUserStore)

      console.log(map, state)

      setTimeout(() => store.setName('alex'), 3000)
      setTimeout(() => state.name = 'suuuka', 5000)

      return {
        store
      }
    }
  })
</script>
<template>
  <h1>VueZone</h1>
  <span>{{ store.name }}</span>
</template>
