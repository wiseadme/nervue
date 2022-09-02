<script>
  import { defineComponent } from 'vue'
  import { useVueZone, mapActions, mapState } from '../src/index'

  export default defineComponent({
    name: 'App',
    setup() {
      const vz = useVueZone()
      const state = mapState('user')

      const { setName } = mapActions('user')

      console.log(vz)
      setTimeout(() => setName('alex'), 3000)

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
