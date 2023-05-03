<script setup lang="ts">
  import { useStore } from '../../nervue/src'
  import { wrapRef } from '../../nervue/src/wrapRef'
  import {createNervue} from '../../nervue/src'

  const nervue = createNervue()

  const user = wrapRef({
    name: 'alex',
    age: 25
  })

  const newName = wrapRef('Loko')

  newName.set('87')

  console.log(newName.prev(), newName.next(), newName.value())

  const store = useStore('USER')

  user.set({
    name: 'john',
  })

  const onClick = () => {
    user.effect()
    newName.effect()
  }

  console.log(nervue, )

  console.log(user.prev(), user.next(), user.value())
</script>

<template>
  <div>
    <h1>Composition API Nervue</h1>
    <div>{{ store.name }}{{ store.fullName }}</div>

    <button @click="store.setName('Vladimir Putin')">
      set name
    </button>
    <h1 @click="onClick">{{ user.value().name }}</h1>
  </div>
</template>
