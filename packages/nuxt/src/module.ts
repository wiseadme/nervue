import {
  isNuxt2,
  addPlugin,
  addImports,
  createResolver,
  resolveModule,
  defineNuxtModule
} from '@nuxt/kit'

import type { NuxtModule } from '@nuxt/schema'

export interface ModuleOptions {
  disableVuex?: boolean
  autoImports?: Array<string | [ string, string ]>
}

const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nervue/nuxt',
    configKey: 'nervue',
    compatibility: {
      nuxt: '^2.0.0 || ^3.0.0',
      bridge: true,
    },
  },
  defaults: {
    disableVuex: true,
    autoImports: [],
  },

  async setup(options, nuxt){
    const resolver = createResolver(import.meta.url)

    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    nuxt.options.alias.nervue = nuxt.options.alias.nervue ||
      resolveModule('nervue/dist/nervue.mjs', {
        paths: [ nuxt.options.rootDir, import.meta.url ],
      })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@nervue/nuxt' })
    })

    nuxt.hook('modules:done', () => {
      if (isNuxt2()) {
        addPlugin(resolver.resolve('./runtime/plugin.nuxt2'))
      } else {
        addPlugin(resolver.resolve('./runtime/plugin.nuxt3'))
      }
    })

    const plugins = resolver.resolve('./runtime/index')

    addImports([
      { from: plugins, name: 'useNervueStore' },
      ...options.autoImports!.map((imports) => {
        if (typeof imports === 'string') {
          return { from: plugins, name: imports }
        } else {
          return { from: plugins, name: imports[0], as: imports[1] }
        }
      }),
    ])
  }
})

export default module
