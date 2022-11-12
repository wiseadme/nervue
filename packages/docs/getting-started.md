# Установка

Для начала необходимо установить **Nervue** с помощью вашего любимого менеджера пакетов:

```bash
npm install nervue
# или с помощью
yarn add nervue
```

Далее после установки библиотеки, мы можем создать экземпляр **Nervue**
который будет корневым объектом всех хранилищ:

```typescript
import { createApp } from 'vue'
import { router } from './router'
import { createNervue } from 'nervue'

const app = createApp()
const nervue = createNervue()

app.use(nervue)
app.use(router)

router.isReady().then(() => app.mount('#app'))
```

:::tip Примечание!
Вы можете прекрасно обходиться и без создания корневого объекта **Nervue**, просто импортируя ваши
```useStore``` функции туда, там где вам это необходимо.
:::
