import Theme from 'vitepress/theme'
// import VueSchoolLink from '../components/VueSchoolLink.vue'
// import { Layout } from './Layout'
import './custom.css'
import './code-theme.css'

const config = {
  ...Theme,

  // Layout,

  enhanceApp({ app, router, siteData }) {
    const { themeConfig } = siteData.value
    themeConfig.nav.forEach(nav => {
      if (nav.id) {
        nav.link += router.route.path
      }
    })
    console.log(router, siteData.value)
    // app.component('VueSchoolLink', VueSchoolLink)
  },
}

export default config
