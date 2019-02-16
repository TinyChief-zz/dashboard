const path = require('path')
const Config = require('webpack-chain')

const config = new Config()
const isProd = process.env.NODE_ENV === 'production'

config.mode(isProd ? 'production' : 'development')

config
  .output
  .publicPath('/')
  .path(path.resolve('dist'))
  .filename('[name].bundle.js')

config.entry('index')
  .add('./src/js/main.js')
  .end()

config.module
  .rule('js')
  .test(/\.jsx?$/)
  .use('babel-loader')
  .loader('babel-loader')

config.plugin('copy')
  .use(require('copy-webpack-plugin'))
  .init((Plugin, args) => new Plugin([
    { from: 'src/assets', to: './assets' }
  ]))

config.plugin('clean')
  .use(require('clean-webpack-plugin'))
  .init((Plugin, args) => new Plugin(['dist']))

config.plugin('html')
  .use(require('html-webpack-plugin'), [{
    minify: false,
    template: 'src/index.html'
  }])

if (!isProd) {
  config.devServer
    .contentBase('./dist')

  config.plugin('hmr').use(require('webpack/lib/HotModuleReplacementPlugin'))

  config
    .plugin('no-emit-on-errors')
    .use(require('webpack/lib/NoEmitOnErrorsPlugin'))
}

if (isProd) {
  // config.plugin('optimize-css')
  //   .use(require('optimize-css-assets-webpack-plugin'), [{
  //     canPrint: false,
  //     cssProcessorOptions: {
  //       safe: true,
  //       autoprefixer: { disable: true },
  //       mergeLonghand: false
  //     }
  //   }])
}

module.exports = config.toConfig()
