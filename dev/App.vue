<script lang="ts">
  import { defineComponent } from 'vue'
  // import { useVueZone } from '../src/index'
  import { useUserStore } from './user-store'

  export default defineComponent({
    name: 'App',
    setup(){
      const store = useUserStore()

      setTimeout(() => store.setName('alex'), 3000)

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
