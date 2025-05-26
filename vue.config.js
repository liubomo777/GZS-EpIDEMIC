const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  parallel: false,
  publicPath: process.env.VUE_APP_publicPath,
  outputDir: process.env.VUE_APP_outputDir,
  productionSourceMap: false,
  integrity:true,
  configureWebpack: {
    devtool: "source-map"
  }
}
