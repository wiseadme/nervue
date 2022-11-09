# Что такое Nervue?

**Nervue** - это интуитивно понятный и простой в использовании ```state``` менеджер для современных **Vue** приложений. Он
позволяет вам писать чистый и хорошо структурированный код, который легко читается и поддерживается. А благодаря тому,
что библиотека полностью реализована на ```typescript```, она имеет отличную типизацию данных. Разумеется все
это реализовано с поддержкой как ```composition``` так и ```options``` api.

Что означает название **Nervue**? Название созвучно со словом **nerve**, что
в переводе означает "нерв". Таким названием хотелось передать понимание, как о жизненно важной
системе вашего приложения, которая будет реагировать так же быстро как
ваша нервная система реагирует на происходящее вокруг, разумеется в хорошем смысле сказанного выше :).

## Базовый пример
Давайте рассмотрим небольшой базовый пример использования **Nervue**:

```typescript
import { defineStore } from 'nervue'

const useCounterStore = defineStore({
  id: 'counter',
  // определяем состояние
  state: () => ({
    count: 0
  }),
  // определяем действия
  actions: {
    increment(){
      this.count += 1
    }
  }
})
```

Где - то в другом файле:

```vue

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useCounterStore } from './store/counter-store.ts'

  export default defineComponent({
    setup(){
      const store = useCounterStore()
      const { increment } = store

      return {
        store,
        increment
      }
    }
  })
</script>
<template>
  <div class="counter-block">
    <div class="counter-display">{{ store.count }}</div>
    <button @click="increment">up</button>
  </div>
</template>
```
И этого базового локального примера в принципе будет достаточно для того, что бы организовать 
хранилище состояния вашего реактивного приложения. Интересно? Ну что же, тогда поехали дальше.

::: tip информация
Далее вы узнаете больше о возможностях библиотеки.
:::