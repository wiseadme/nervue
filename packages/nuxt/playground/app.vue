<script setup lang="ts">
  import { useUserStore } from './store'

  // @ts-ignore
  console.log(useNervueStore(), 'store')

  const store = useUserStore()

  await store.setName('Alex')

</script>
<template>
  <div>
    <h1 @click="store.setName(new Date())">Hello, {{ store.name }}</h1>
  </div>
</template>
