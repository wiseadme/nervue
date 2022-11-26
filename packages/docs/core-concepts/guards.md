---
aside: false
---

# Guards

Гуарды - это по сути функции валидаторы, которые будут выполнены перед тем, как мутировать ```state``` приложения.
Они объявляются по имени свойства которое будут валидировать, в виде массива функций
валидаторов, которые должны возвращать объект нижеследующего вида:

```typescript
// typescript
{ value?: any, next: boolean }
```

Давайте рассмотрим небольшой боевой пример кода:

```typescript
import { defineStore } from 'nervue'
import axios from 'axios'

const usersStore = defineStore({
  id: 'PRODUCTS',

  state: () => ({
    products: null,
    categories: null
  }),

  guards: {
    products: [
      // валидация массива вернет true или false
      (items) => ({
        next: items.every(it => it.visible),
      }),
      (items) => ({
        next: !items.some(it => !it.available)
      })
    ]
  },

  actions: {
    async fetchProductItems(){
      try {
        const { data } = await axios.get('/products')
        this.products = data.items
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
```

В случае если хотя бы одна проверка ```items```  гуардами вернет значение ```next``` равное ```false```,
мутация состояния будет пропущена, то есть сработает защита от нежелательных мутаций состояния приложения.

# Не только валидаторы

Гуарды можно использовать не только как валидаторы, но и для модификации данных. С их помощью можно привести данные в
нужный вид для мутации состояния.
Давайте рассмотрим тот же пример, но немного изменив его:

```typescript{17-19}
import { defineStore } from 'nervue'
import axios from 'axios'

const usersStore = defineStore({
  id: 'PRODUCTS',

  state: () => ({
    products: null,
    categories: null
  }),

  guards: {
    products: [
      (items) => {
        const visibleItems = items.filter(it => it.visible)
        return {
            next: items.length,
            value: visibleItems
        }
      }
    ]
  },

  actions: {
    async fetchProductItems(){
      try {
        const { data } = await axios.get('/products')
        this.products = data.items
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
```

Как видно из примера выше, гуард возвращает объект у которого присутствует свойство ```value```, которое и будет
сохранено для мутации,
если не будет модифицировано нижеследующим гуардом.
Давайте продолжим рассматривать все тот же пример:

```typescript
import { defineStore } from 'nervue'
import axios from 'axios'

const usersStore = defineStore({
  id: 'PRODUCTS',

  state: () => ({
    products: null,
    categories: null
  }),

  guards: {
    products: [
      (items) => {
        const visibleItems = items.filter(it => it.visible)

        return {
          next: visibleItems.length,
          value: visibleItems
        }
      },
      // В качестве массива products мы получаем уже
      // отфильтрованный массив предыдущим гуардом
      (items) => {
        // тут некая логика...
      }
    ]
  },

  actions: {
    async fetchProductItems(){
      try {
        const { data } = await axios.get('/products')
        this.products = data.items
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
```


