---
aside: false
---

# Документация API

## createNervue

Возвращает ```vue``` плагин, который установит ```root``` объект Nervue в качестве глобальной переменной,
доступ к которой можно получить с помощью инъекции по ключу ```nervueSymbol```.

```typescript
import { createNervue } from 'nervue'
import { useProductStore } from './product-store'

export const store = createNervue()

store.add(useProductStore)
```

Затем импортируем в ```main.ts```

```typescript
import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'

const app = createApp()

app.use(store)
```

Теперь для того чтобы получить доступ к ```root``` объекту, достаточно будет
использовать ```inject```.

```vue

<script lang="ts">
  import { defineComponent, inject } from 'vue'
  import { nervueSymbol } from 'nervue'

  export default defineComponent({
    setup(){
      const globalStore = inject(nervueSymbol)

      globalStore._stores.PRODUCT.fetchProducts()
    }
  })
</script>

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

## $patch

## $subscribe
