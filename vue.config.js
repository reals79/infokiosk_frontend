module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/assets/' : '/',
  outputDir: '../api/public/assets',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://infokiosk.test',
      },
      '/storage': {
        target: 'http://infokiosk.test',
      },
    },
  },
  transpileDependencies: ['vuetify'],
  filenameHashing: false,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'InfoKiosk'
      return args
    })
  },
}
