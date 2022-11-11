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

export const nervue = createNervue()
```

В ```main.ts```

```typescript
import { createApp } from 'vue'
import { nervue } from './store'
import { router } from './router'

const app = createApp()

app.use(nervue)
app.use(router)

router.isReady().then(() => app.mount('#app'))
```

Таким образом мы создали ```root``` объект, куда будут добавлены все созданные ```useStore``` функции.

:::tip 
Примечание! Вы можете прекрасно обходиться и без создания ```root``` объекта, просто импортируя ваши хранилища
туда, там где вам это необходимо.
:::

## Добавление useStore функции в root объект
Добавление функции useStore происходит автоматически, соответственно функция уже возвращает
хранилище которое добавлено в ```root``` объект, именно поэтому нет никакой необходимости
делать это вручную. Но для того, что бы было понимание как это происходит, вам будет
достаточно взглянуть на следующий пример:

```js
import { createNervue } from 'nervue'
import { useUserStore } from 'modules/users/store'

export const nervue = createNervue()
```
Метод ```set``` сохранит по ```id``` ключу функцию useStore в ```root``` объекте, после чего,
получить значение сохраненное по ключу ```id``` можно будет как с помощью самой функции useStore, так
и с помощью функции ```useNervue```:

```vue

<script setup>
  import { useNervue } from 'nervue'
  
  const userStore = useNervue('USER')
</script>
```
