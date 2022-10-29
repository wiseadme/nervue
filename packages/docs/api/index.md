---
aside: false
---

# Функции

## createNervue

Возвращает ```vue``` плагин, который установит ```root``` объект Nervue в качестве глобальной переменной,
доступ к которой можно получить с помощью инъекции по ключу ```NERVUE_ROOT_SYMBOL```.

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
## useNervue
Функция, которая в качестве аргумента принимает ```id``` конкретного хранилища, которое зарегистрировано в ```root```
объекте, с помощью метода ```add```

## defineStore

## mapState

Позволяет использовать состояние хранилища, путем создания объекта распространения доступа в ```computed``` свойстве
компонента. В качестве аргумента принимает ```composition``` функцию, возвращающую хранилище, вторым аргументом можно
передать либо объект ключей, вида ```{ localKeyName: "stateKey"}```, либо массив ключей состояния.

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

## $expose
