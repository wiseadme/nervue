<script setup lang="ts">
  import { useNervue } from '../../nervue/src'
  import { useUserStore } from '../store/user-store'

  const store = useNervue()
  const userStore = useUserStore()

  const { setName, name } = userStore

  console.log(store)

  setName('Havalio')
</script>
<template>
  <h1>Composition API Nervue</h1>
  <div>{{ userStore.name }}</div>
</template>
