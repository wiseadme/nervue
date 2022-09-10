import { defineConfig } from 'vitepress'
import RuSidebar from './configs/sidebar/ru'
import RuNavbar from './configs/nav/ru'
import EnNavbar from './configs/nav/en'

export default defineConfig({
  markdown: {
    anchor: {},
    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%',
    },
  },
  title: 'Nervue библиотека',
  lang: 'ru-RU',
  lastUpdated: true,
  base: '/',
  lastUpdatedText: 'Update Date',
  description: 'The Vue Store that you will enjoy using',
  themeConfig: {
    repo: 'wiseadme/nervue',
    logo: '/logo.svg',
    docsDir: 'packages/docs',
    activeHeaderLinks: true,
    docsBranch: 'v2',
    nav: RuNavbar,
    sidebar: RuSidebar,
    locales: {
      '/en/': {
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        nav: EnNavbar
      }
    }
  },
  locales: {
    '/': {
      label: 'русский',
      lang: 'ru-RU', // this will be set as the lang attribute on <html>
      title: 'Nervue',
      description: 'Vue-powered Static Site Generator'
    },
    '/en/': {
      label: 'english',
      lang: 'en-US',
      title: 'Nervue',
      description: 'Vue 3 state manager library'
    }
  }
})
