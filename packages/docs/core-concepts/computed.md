# Computed

Само название говорит за себя. Это хорошо знакомый вам по названию метод Vue, с помощью которого и реализованы
вычесления
в Nervue. Это абсолютный аналог getters во Vuex или в Pinia:

```typescript
import { defineStore } from 'nervue'

const useUserStore = defineStore({
  id: 'USER',

  state: () => ({
    name: 'Alex',
    secondName: 'Malkovic',
    age: 35,
    gender: 'Male'
  }),

  computed: {
    // функция в качестве аргумента принимает store
    fullName: store => `${ store.name } ${ store.secondName }`,

    userFullInfo(){
      // либо можно использовать контекст для доступа как к state, 
      // так и к другим computed значениям.
      return `name: ${ this.fullName() }, age: ${ this.age }, gender: ${ this.gender }`
    }
  }

})
```
