---
aside: false
---

# Guards

Гуарды - это по сути валидаторы, которые будут выполнены перед тем, как мутировать ```state``` приложения.
Они объявляются по имени свойства которое будут валидировать, в виде массива функций
валидаторов, которые должны возвращать объект нижеследующего вида:

```typescript
// typescript
{ value: any, isValid: boolean }
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
      products => ({
        isValid: products.every(it => !!it.visible),
        value: products
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

В случае если хотя бы одна проверка ```items```  гуардами вернет значение ```isValid``` равное ```false```,
мутация состояния будет пропущена, то есть сработает защита от нежелательных мутаций состояния приложения. 

# Не только валидаторы

Если посмотреть на гуарды под другим углом, то можно увидеть то, что гуарды могут как защитить,
так и помочь привести данные в нужный вид для мутации состояния.
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
            isValid: visibleProducts.length,
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
Как видно из примера выше гуарды могут быть полезны в качестве не только валидаторов, но
и в качестве функций модификаторов данных. Более того, с помощью гуардов данные можно обрабатывать
пошагово. Давайте продолжим рассматривать все тот же пример:

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
            isValid: visibleProducts.length,
            value: visibleProducts
        }
      },
      // В качестве аргумента мы получаем уже
      // модифицированные данные предыдущим валидатором
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


