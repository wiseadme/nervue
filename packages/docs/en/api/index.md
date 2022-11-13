---
aside: false
---

# API documentation

## createNervue

Возвращает ```vue``` плагин, который установит ```root``` объект Nervue.

```typescript
import { createNervue } from 'nervue'
import { createApp } from 'vue'
import App from './App.vue'

const nervue = createNervue()
const app = createApp()

app.use(nervue)
```

Для того чтобы получить доступ к ```nervue``` объекту, достаточно будет
использовать ```inject```, передав ему в качестве аргумента ```nervueSymbol```.

```vue

<script lang="ts">
  import { defineComponent, inject } from 'vue'
  import { nervueSymbol } from 'nervue'

  export default defineComponent({
    setup(){
      const globalStore = inject(nervueSymbol)

      globalStore.stores.USER.getUser()
    }
  })
</script>

```
Nervue устанавливается как глобальная переменная и поэтому мы можем обращаться из шаблона
компонента к нему на прямую:

```vue
<template>
  <div class="user">
    <h1 class="user__name">
      {{ $nervue.stores.USER.name }}
    </h1>
  </div>
</template>
```

## useNervue

Функция, которая возвращает ```root``` объект. Если в качестве аргумента передать ```id``` конкретного хранилища,
которое зарегистрировано в ```root```
объекте, с помощью метода ```set```, то в таком случае функция вернет хранилище по ```id``` ключу.

```vue
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useNervue } from 'nervue'
  
  export default defineComponent({
    setup() {
      const productStore = useNervue('PRODUCT')
      
      return {
        productStore
      }
    }
  })
</script>

```

## defineStore
В процессе...

## createComponent
В процессе...

## mapState

Позволяет получить доступ к свойствам ```state``` и ```computed``` хранилища, путем распространения в ```computed``` свойстве
компонента, с использованием ```options api```. В качестве первого аргумента принимает ```useStore``` функцию, возвращающую хранилище, вторым аргументом необходимо
передать либо объект, либо массив ключей.

В качестве примера возьмем все то же хранилище, которое мы определили ранее в качестве базового примера:

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

Теперь мы можем в Vue компоненте извлечь ключи состояния, с помощью ```mapState```:

```vue

<script lang="ts">
  import { mapState } from 'nervue'
  import { useCounterStore } from './store/counter-store'

  export default {
    data(){
      return {}
    },
    computed: {
      ...mapState(useCounterStore, {
        counterValue: 'count',
        doubleCount: state => state.count * 2
      })
    },

    methods: {
      decrement(){
        this.counterValue -= 1
      }
    }
  }

</script>
```

::: tip Примечание
Нет необходимости использовать ```mapState``` при использовании ```composition api```.
:::

## mapActions
В процессе...

## $patch
В процессе...

## $subscribe
В процессе...
