import './theme/custom.css'
import './theme/code-theme.css'

import { defineClientConfig } from '@vuepress/client'
import HomePage from './components/HomePage.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('HomePage', HomePage)
  },
})
