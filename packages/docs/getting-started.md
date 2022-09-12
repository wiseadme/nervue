# Начинаем

Для начала необходимо установить **Nervue** с помощью вашего любимого менеджера пакетов:

```bash
npm install nervue
# или с помощью
yarn add nervue
```

Далее после установки библиотеки, вы можете создать глобальный ```instance``` **Nervue**

```js
import { createNervue } from 'nervue'

export const store = createNervue()
```

В ```main.js```

```js
import { createApp } from 'vue'
import { store } from './store'
import { router } from './router'

const app = createApp()

app.use(store)
app.use(router)

router.isReady().then(() => app.mount('#app'))
```

Таким образом вы создали ```root``` объект, куда по необходимости вы сможете добавлять локальные хранилища с помощью
метода ```add``` root объекта.

:::tip 
Примечание! Вы можете прекрасно обходиться и без создания ```root``` объекта, просто импортируя ваши хранилища
туда, там где вам это необходимо.
:::

```js
import { createNervue } from 'nervue'
import { useUserStore } from 'modules/users/store'

export const store = createNervue()

store.add(useUserStore)
```
Метод ```add``` сохранит по ```id``` ключу ваше хранилище в ```root``` объекте. 

Соответственно теперь для того, что бы получить доступ из любой точки вашего приложения к сохраненному хранилищу, вам будет достаточно
воспользоваться ```composition``` функцией библиотеки ```useNervue```.

```vue

<script setup>
  import { useNervue } from 'nervue'
  
  const userStore = useNervue('USER')
  
</script>
```
