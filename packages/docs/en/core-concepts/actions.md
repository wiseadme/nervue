---
aside: false
---

# Actions

Действия это то место, где определяются методы вашего хранилища. Именно здесь можно реализовать бизнес логику и
взаимодействие с серверной частью.

```ts
import { defineStore } from 'nervue'
import { axios } from 'axios'

export const useItemsStore = defineStore({
  state: () => ({
    items: null
  }),

  actions: {
    async fetchItems() {
      try {
        const { data } = await axios.get('/items')
        this.items = data.items
      } catch (error) {
        console.log(error)
      }
    }
  }
})
```

Наверное нет необходимости объяснять свободу в использовании функций как таковых. Вы можете определять их с любым
количеством аргументов, использовать как для синхронных действий, так и для асинхронных, либо для вызова других
действий. Действия имеют полный доступ к контексту всего хранилища через ключевое слово ```this```.

## Использование действий c ```setup()```

```ts
import { defineComponent } from 'vue'
import { useItemsStore } from './store/items-store'

export default defineComponent({
  setup() {
    const itemsStore = useItemsStore()

    const onClick = () => {
      itemsStore.fetchItems()
    }

    return {
      onClick
    }
  }
})
```

## Использование действий c Options API

Для этого можно использовать функцию **mapActions**.

```ts
import { mapActions } from 'nervue'
import { useItemsStore } from './store/items-store'

export default {
  methods: {
    // получаем доступ к this.fetchItems()
    // в контексте компонента
    ...mapActions(useItemsStore, [ 'fetchItems' ]),

    // либо можем дать свое локальное название
    // this.someMethodName()
    ...mapActions(useItemsStore, {
      someMethodName: 'fetchItems'
    })
  }
}
```

## Подписка на действия

Мы можем наблюдать за действиями, с помощью функций обратного вызова получать результаты, обрабатывать ошибки,
создавать сторонние эффекты.

```typescript
import { useItemsStore } from './store/items-store'

const store = useItemsStore()

const unsubscribe = store.$subscribe({
  // Имя действия.
  name: 'fetchItems',
  // Удаление подписки при размонтировании компонента,
  // если установлено значение false.
  // По умолчанию установлен false.
  detached: false,

  before(...args) {
    // Будет вызван до исполнения действия.
    // В качестве аргумента получает те же аргументы,
    // что и само действие.
  },
  after(result) {
    // Будет вызван после действия.
    // В качестве аргумента получает
    // результат вызова действия.
  },
  onError(error) {
    // Будет вызван, если действие возвратит ошибку.
    // В качетсве аргумента получает
    // перехваченную ошибку.
  }
})
```
