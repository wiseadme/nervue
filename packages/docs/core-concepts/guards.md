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
    visibleiItems: null,
    categories: null
  }),

  guards: {
    visibleiItems: [
      // валидация массива вернет true или false
      products => ({
        next: products.every(it => it.visible),
      }),
      products => ({
        next: !products.some(it => !it.available)
      })
    ]
  },

  actions: {
    async fetchProductItems(){
      try {
        const items = await axios.get('/products')
        this.visibleItems = items
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

Гуарды можно использовать не только как валидаторы, но и для модификации данных. С их помощью можно привести данные в нужный вид для мутации состояния.
Давайте рассмотрим тот же пример, но немного изменив его:

```typescript{15-25}
import { defineStore } from 'nervue'
import axios from 'axios'

const usersStore = defineStore({
  id: 'PRODUCTS',

  state: () => ({
    visibleiItems: null,
    categories: null
  }),

  guards: {
    visibleiItems: [
      products => {
        const visibleProducts = products.filter(it => it.visible)
        return {
            next: visibleProducts.length,
            value: visibleProducts
        }
      }
    ]
  },

  actions: {
    async fetchProductItems(){
      try {
        const items = await axios.get('/products')
        this.visibleItems = items
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
```
Как видно из примера выше, гуард возвращает объект у которого присутствует совйство ```value```, которое и будет сохранено для мутации,
если не будет модифицировано нижеследующим гуардом. 
Давайте продолжим рассматривать все тот же пример:

```typescript
import { defineStore } from 'nervue'
import axios from 'axios'

const usersStore = defineStore({
  id: 'PRODUCTS',

  state: () => ({
    visibleiItems: null,
    categories: null
  }),

  guards: {
    visibleiItems: [
      products => {
        const visibleProducts = products.filter(it => it.visible)
        return {
            next: visibleProducts.length,
            value: visibleProducts
        }
      },
      // В качестве массива products мы получаем уже
      // отфильтрованный массив предыдущим гуардом
      products => {
        // тут некая логика...
      }
    ]
  },

  actions: {
    async fetchProductItems(){
      try {
        const items = await axios.get('/products')
        this.visibleItems = items
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
```


