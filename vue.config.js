const Visualizer = require('webpack-visualizer-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      new Visualizer({ filename: './statistics.html' })
      // new webpack.ProvidePlugin({
      //   'L.esri': 'esri-leaflet'
      // })
    ],
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  transpileDependencies: [
    // can be string or regex
    '@cityofphiladelphia/mapboard',
    '@cityofphiladelphia/phila-vue-comps',
    '@cityofphiladelphia/phila-vue-mapping',
    '@cityofphiladelphia/phila-vue-datafetch'
    // 'L-esri-WebMap'
    // /other-dep/
  ]
}
