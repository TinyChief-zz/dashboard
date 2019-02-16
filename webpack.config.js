const path = require('path')
const Config = require('webpack-chain')
const CSSExtractPlugin = require('mini-css-extract-plugin')

const config = new Config()
const isProd = process.env.NODE_ENV === 'production'

config.mode(isProd ? 'production' : 'development')

config.resolve.alias.set('~', path.resolve('src'))

config.output
  .publicPath('/')
  .path(path.resolve('dist'))
  .filename('[name].bundle.js')

config
  .entry('index')
  .add('./src/index.js')
  .end()

config.module
  .rule('js')
  .test(/\.jsx?$/)
  .use('babel-loader')
  .loader('babel-loader')

config
  .plugin('copy')
  .use(require('copy-webpack-plugin'))
  .init((Plugin, args) => new Plugin([{ from: 'src/assets', to: './assets' }]))

config
  .plugin('clean')
  .use(require('clean-webpack-plugin'))
  .init((Plugin, args) => new Plugin(['dist']))

config.plugin('html').use(require('html-webpack-plugin'), [
  {
    minify: false,
    template: 'src/index.html'
  }
])

const baseRuleCSS = config.module
  .rule('css')
  .test(/\.css$/)
  .oneOf('normal')

// DOESNT WORK!
if (isProd) {
  baseRuleCSS.use('extract-css-loader').loader(CSSExtractPlugin.loader)
} else {
  baseRuleCSS
    .use('style-loader')
    .loader('style-loader')
}
baseRuleCSS
  .use('css-loader')
  .loader('css-loader')
  .options({
    modules: true,
    localIdentName: `[local]_[hash:base64:8]`,
    importLoaders: 1,
    sourceMap: !isProd
  })

if (!isProd) {
  config.devServer.contentBase('./dist')

  config.plugin('hmr').use(require('webpack/lib/HotModuleReplacementPlugin'))

  config
    .plugin('no-emit-on-errors')
    .use(require('webpack/lib/NoEmitOnErrorsPlugin'))
}

if (isProd) {
  config
    .plugin('extract-css')
    .use(CSSExtractPlugin, [{ filename: 'style.css' }])

  config.plugin('optimize-css')
    .use(require('optimize-css-assets-webpack-plugin'), [{
      canPrint: false,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true },
        mergeLonghand: false
      }
    }])
}

module.exports = config.toConfig()
