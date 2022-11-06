# Установка

Для начала необходимо установить **Nervue** с помощью вашего любимого менеджера пакетов:

```bash
npm install nervue
# или с помощью
yarn add nervue
```

Далее после установки библиотеки, мы можем создать глобальный ```root``` объект **Nervue**

```js
import { createNervue } from 'nervue'

export const store = createNervue()
```

В ```main.ts```

```typescript
import { createApp } from 'vue'
import { store } from './store'
import { router } from './router'

const app = createApp()

app.use(store)
app.use(router)

router.isReady().then(() => app.mount('#app'))
```

Таким образом мы создали ```root``` объект, куда по необходимости мы сможем добавлять локальные хранилища с помощью
метода ```set``` root объекта.

:::tip 
Примечание! Вы можете прекрасно обходиться и без создания ```root``` объекта, просто импортируя ваши хранилища
туда, там где вам это необходимо.
:::

## Добавление хранилища в ```root``` объект

```js
import { createNervue } from 'nervue'
import { useUserStore } from 'modules/users/store'

export const store = createNervue()

store.set(useUserStore)
```
Метод ```set``` сохранит по ```id``` ключу наше хранилище в ```root``` объекте. 

Соответственно теперь для того, что бы получить доступ из любой точки приложения к сохраненному хранилищу, нам будет достаточно
воспользоваться функцией ```useNervue```.

```vue

<script setup>
  import { useNervue } from 'nervue'
  
  const userStore = useNervue('USER')
</script>
```
Но следует учесть одну особенность, если в хранилище определен ```expose```, то соответственно
в качестве хранилища по ключу мы получим именно доступные в ```expose``` значения хранилища.
Подробнее об ```expose``` вы узнаете далее.
