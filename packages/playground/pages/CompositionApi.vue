<script setup lang="ts">
  import { useUserStore } from '../store/user-store'

  const userStore = useUserStore()

  const { setName, name } = userStore

  setName('Havalio')
</script>
<template>
  <h1>Composition API Nervue</h1>
  <div>{{ userStore.name }}</div>
</template>
