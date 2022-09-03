<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapState } from '../src/index'
  import { useUserStore } from './user-store'

  export default defineComponent({
    name: 'App',
    setup() {
      const store = useUserStore()
      const { setName } = mapActions(useUserStore)

      const state = mapState(useUserStore, ['name'])

      console.log(state)

      setTimeout(() => {
        state.name = 'suuk'
      }, 3000)

      setTimeout(() => setName('gandi'), 5000)

      return {
        state
      }
    }
  })
</script>
<template>
  <h1>VueZone</h1>
  <span>{{ state.name }}</span>
</template>
