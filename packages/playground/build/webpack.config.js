const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env = {}) => {
  return {
    devtool: 'eval-cheap-module-source-map',
    target: 'web',
    mode: 'development',
    entry: {
      main: [
        'regenerator-runtime/runtime.js',
        path.resolve(__dirname, '../main.ts')
      ]
    },
    devServer: {
      host: 'localhost',
      open: false,
      port: 3000,
      hot: true,
    },
    optimization: {
      minimize: !env.dev,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            compress: {
              collapse_vars: true, // 0.3kb
              booleans: true, // 0.7kb
              if_return: true, // 0.4kb
              sequences: true, // 0.7kb
              unused: true, // 2.3kb
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            output: {
              comments: false
            },
            mangle: {
              safari10: true,
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true,
          }
        }
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { babelrc: true }
            },
            {
              loader: 'ts-loader',
              options: { transpileOnly: true }
            },
            {
              loader: 'eslint-loader'
            }
          ]
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: [
            { loader: 'vue-loader', options: { reactivityTransform: true } }
          ],
        },
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        vue: 'vue/dist/vue.runtime.esm-browser.js'
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'nervue',
        hash: false,
        template: path.resolve(__dirname, '../index.html'),
        filename: 'index.html',
        inject: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
        __DEV__: process.env.NODE_ENV !== 'production'
      }),
      new VueLoaderPlugin(),
    ],
  }
}
