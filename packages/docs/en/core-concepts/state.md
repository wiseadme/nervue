---
aside: false
---

# State

Is a reactive object that is defined using a factory function that always returns a state initialization
object:

```typescript
const state = () => ({
  name: 'Alex',
  age: 35
})
```

During initialization, the ```state``` will first be wrapped in a ```proxy``` object (you will find out why this is done later)
and only then the resulting proxy object will be wrapped in a reactive proxy, using the Vue API ```ref``` and ```toRefs```.
Then the resulting reactive object will be additionally wrapped in ```reactive``` to decompress
the ```value``` of the ``ref`` object, as specified in the Vue documentation for the ```reactive``` API, while maintaining reactivity.

Now, after initializing, we have the state that we can mutate:

```typescript
import { defineStore } from 'nervue'

const state = () => ({
  name: 'Alex',
  age: 35
})

const actions = {
  setUserName(name){
    // we get access to state directly from the "this" context
    this.name = name
  }
}

export const useUserStore = defineStore({
  id: 'USER',
  state,
  actions
})

```
