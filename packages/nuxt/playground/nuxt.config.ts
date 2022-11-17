import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import nervueModule from '../src/module'

export default defineNuxtConfig({
  alias: {
    nervue: fileURLToPath(new URL('../../nervue/src/index.ts', import.meta.url)),
  },
  modules: [nervueModule],
  // @ts-ignore
  nervue: {
    autoImports: [['defineStore', 'defineNervueStore']],
  },
})
