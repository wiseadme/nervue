<script setup lang="ts">
  // import { useUserStore } from '../store/user-store'
  import { useStore } from '../../nervue/src'

  // const userStore = useUserStore()
  const store = useStore('USER')

  console.log(store)

</script>

<template>
  <div>
    <h1>Composition API Nervue</h1>
    <div>{{ store.name }}{{ store.fullName }}</div>

    <button @click="store.setName('Vladimir Putin')">
      set name
    </button>
  </div>
</template>
