import Theme from 'vitepress/theme'
// import VueSchoolLink from '../components/VueSchoolLink.vue'
// import { Layout } from './Layout'
import './custom.css'
import './code-theme.css'

import HomePage from '../components/HomePage.vue'

const config = {
  ...Theme,

  // Layout,

  enhanceApp({ app, router, siteData }) {
    app.component('HomePage', HomePage)
  },
}

export default config
