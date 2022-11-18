import {
  isNuxt2,
  addPlugin,
  addImports,
  createResolver,
  resolveModule,
  defineNuxtModule
} from '@nuxt/kit'

const module = defineNuxtModule({
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

    if (options.disableVuex && isNuxt2()) {
      nuxt.options.build.transpile.push(resolver.resolve('./runtime/plugin.nuxt2'))
    } else {
      nuxt.options.build.transpile.push(resolver.resolve('./runtime/plugin.nuxt3'))
    }

    nuxt.options.alias.nervue = nuxt.options.alias.nervue || resolveModule('nervue/dist/nervue.mjs', {
      paths: [ nuxt.options.rootDir, import.meta.url ],
    })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@nervue/nuxt' })
    })

    nuxt.hook('ready', async () => {

    })

    addPlugin(resolver.resolve('./runtime/plugin.nuxt3.ts'))

    const plugins = resolver.resolve('./runtime/index')

    addImports([
      { from: plugins, name: 'useNervueStore' },
      ...options.autoImports!.map((imports) =>
        typeof imports === 'string'
          ? { from: plugins, name: imports }
          : { from: plugins, name: imports[0], as: imports[1] }
      ),
    ])
  }
})

export default module as any
