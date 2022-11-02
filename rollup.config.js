import path from 'path'
import ts from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, 'nervue')
const pkg = require(path.resolve(packageDir, `package.json`))

const name = pkg.name

const nodePlugins = [resolve(), commonjs()]

const tsPlugin = ts({
  check: true,
  tsconfig: path.resolve(__dirname, './tsconfig.json'),
  declarationDir: `./packages/nervue/dist/${name}.d.ts`,
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationMap: true,
    },
    exclude: ['packages/*/__tests__'],
  },
})

const outputConfigs = {
  mjs: {
    file: `packages/nervue/${pkg.module}`,
    format: `es`,
  },
  cjs: {
    file: `packages/nervue/${pkg.module.replace('mjs', 'cjs')}`,
    format: `cjs`,
  },
  global: {
    file: `packages/nervue/${pkg.unpkg}`,
    format: `iife`,
  },
  browser: {
    file: 'packages/nervue/dist/nervue.esm-browser.js',
    format: `es`,
  },
}

const packageBuilds = Object.keys(outputConfigs)

const packageConfigs = packageBuilds.map((format) => {
  return createConfig(format, outputConfigs[format])
})

packageBuilds.forEach((buildName) => {
  if (buildName === 'cjs') {
    packageConfigs.push(createProductionConfig(buildName))
  } else if (buildName === 'global') {
    packageConfigs.push(createMinifiedConfig(buildName))
  }
})

function createProductionConfig(format) {
  const extension = format === 'cjs' ? 'cjs' : 'js'
  const descriptor = format === 'cjs' ? '' : `.${format}`
  return createConfig(format, {
    file: `packages/nervue/dist/${name}${descriptor}.prod.${extension}`,
    format: outputConfigs[format].format,
  })
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    {
      file: `packages/nervue/dist/${name}.${format === 'global' ? 'iife' : format}.prod.js`,
      format: outputConfigs[format].format,
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
      }),
    ]
  )
}

function createConfig(format, output, plugins = []) {
  return {
    input: path.join(__dirname, 'packages', 'nervue', 'src', 'index.ts'),
    output,
    external: ['vue-demi', 'vue', '@vue/composition-api'],
    plugins: [
      tsPlugin,
      ...nodePlugins,
      ...plugins
    ]
  }
}

export default packageConfigs

