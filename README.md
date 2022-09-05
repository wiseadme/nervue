# zikkurat

Vue 3 composition and options API-compatible store library

```typescript
import { createZikkurat } from 'zikkurat'
import { useUserStore } from './user-store'

export const store = createZikkurat()

store.add(useUserStore)
```

* then in ```main.ts``` file
```typescript
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import App from './App.vue'

const app = createApp(App)

app.use(store)
app.use(router)

router.isReady().then(() => app.mount('#app'))
```
