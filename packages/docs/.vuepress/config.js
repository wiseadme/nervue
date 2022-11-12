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
  base: '/nervue',
  head: [
    ['link', {rel: 'preconnect', href: 'https://fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', crossOrigin: true, href: 'https://fonts.gstatic.com'}],
    ['link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap'}],
    ['meta', {name: 'description', content: "Nervue библиотека стэйт менеджмента для современных Vue приложений"}],
  ],
  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Nervue',
      lastUpdated: false,
    },
    '/en/': {
      lang: 'en-US',
      title: 'Nervue',
      lastUpdated: false,
    },
  },
  theme: defaultTheme({
    colorMode: 'light',
    home: '/',
    repo: 'https://github.com/wiseadme/nervue',
    editLink: false,
    contributors: false,
    locales: {
      '/': {
        selectLanguageName: 'Русский',
        navbar: RuNavbar,
        sidebar: RuSidebar,
        home: '/',
        selectLanguageText: 'Язык',
        lastUpdatedText: 'Последнее обновление',
        contributorsText: 'Контрибутор',
      },
      '/en/': {
        selectLanguageName: 'English',
        label: 'English',
        navbar: EnNavbar,
        sidebar: EnSidebar,
        home: '/en/',
        selectLanguageText: 'Languages',
        lastUpdatedText: 'Last Updated',
        contributorsText: 'Contributor',
      },
    }
  })
}
