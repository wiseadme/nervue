import {
  // isNuxt2,
  addPlugin,
  addImports,
  createResolver,
  resolveModule,
  defineNuxtModule
} from '@nuxt/kit'

const module = defineNuxtModule({
  meta: {
    name: 'nervue',
    configKey: 'nervue',
    compatibility: {
      nuxt: '^2.0.0 || ^3.0.0-rc.5',
      bridge: true,
    },
  },
  defaults: {
    disableVuex: true,
    autoImports: [],
  },

  setup(options, nuxt){
    const resolver = createResolver(import.meta.url)

    // if (options.disableVuex && isNuxt2()) {
    //
    // }

    nuxt.options.build.transpile.push(resolver.resolve('./plugins/plugin.nuxt3'))

    nuxt.options.alias.nervue =
      nuxt.options.alias.pinia ||
      resolveModule('nervue/dist/nervue.mjs', {
        paths: [ nuxt.options.rootDir, import.meta.url ],
      })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@nervue/nuxt' })
    })

    addPlugin(resolver.resolve('./plugins/plugin.nuxt3.ts'))

    const plugins = resolver.resolve('./plugins/index')

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

export default module
