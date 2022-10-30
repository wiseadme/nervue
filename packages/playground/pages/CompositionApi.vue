<script setup lang="ts">
  import { useNervue } from '../../nervue/src'
  import { useUserStore } from '../store/user-store'

  const store = useNervue()
  const userStore = useUserStore()

  // const { name } = userStore

  userStore.$patch({ name: 'jamessss' })

  setTimeout(() => {
    userStore.$patch({ name: 'Hoolio' })
  },2000)
</script>
<template>
  <h1>Composition API Nervue</h1>
  <div>{{ userStore.name }}</div>
</template>
