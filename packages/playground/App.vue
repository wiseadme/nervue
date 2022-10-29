<script setup lang="ts">
  import CompositionApi from './pages/CompositionApi.vue'
  import OptionsApi from './pages/OptionsApi.vue'

  let current = $shallowRef()

</script>
<template>
  <div>
    <h2 @click="current = CompositionApi">composition</h2>
    <h2 @click="current = OptionsApi">options</h2>
    <component :is="current"></component>
  </div>
</template>
