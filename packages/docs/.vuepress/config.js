import { defaultTheme } from '@vuepress/theme-default'
import RuSidebar from './configs/sidebar/ru'
import EnSidebar from './configs/sidebar/en'
import RuNavbar from './configs/nav/ru'
import EnNavbar from './configs/nav/en'

export default {
  markdown: {
    code: {
      lineNumbers: false,
    }
  },
  head: [
    ['link', {rel: 'preconnect', href: 'https://fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', crossOrigin: true, href: 'https://fonts.gstatic.com'}],
    ['link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap'}],
  ],
  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Nervue',
      lastUpdated: true,
      lastUpdatedText: 'Последнее обновление',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Nervue',
      lastUpdated: true,
      lastUpdatedText: 'Last Updated',
    },
  },
  theme: defaultTheme({
    colorMode: 'light',
    home: '/',
    repo: 'wiseadme/nervue',
    editLink: false,
    locales: {
      '/': {
        selectLanguageName: 'Русский',
        navbar: RuNavbar,
        sidebar: RuSidebar,
        selectLanguageText: 'Язык'
      },
      '/en/': {
        selectLanguageName: 'English',
        label: 'English',
        navbar: EnNavbar,
        sidebar: EnSidebar,
        selectLanguageText: 'Languages'
      },
    }
  })
}
