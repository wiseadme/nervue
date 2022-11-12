<script setup lang="ts">
  import { useUserStore } from '../store/user-store'
  import { createComponent } from '../../nervue/src'

  const userStoreComponent = createComponent(useUserStore)

  console.log(userStoreComponent)
  const userStore = useUserStore()

  // const { name } = userStore

  userStore.$patch({ name: 'jamessss' })

  userStore.$patch(state => {
    state.name = ''
  })

  setTimeout(() => {
    userStore.$patch({ name: 'Hoolio' })
  }, 2000)
</script>

<template>
  <user-store-component
    v-slot="{name, age, setName}"
    :name="useUserStore"
  >
    <h1>Composition API Nervue</h1>
    <div>{{ name }}{{ age }}</div>

    <button @click="setName('Vladimir Putin')">
      set name
    </button>
  </user-store-component>
</template>
