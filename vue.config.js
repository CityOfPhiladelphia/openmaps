const Visualizer = require('webpack-visualizer-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      new Visualizer({ filename: './statistics.html' })
    ],
    resolve: {
      alias: {
        "leaflet": path.resolve(__dirname, 'node_modules/leaflet')
      }
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  transpileDependencies: [
    // can be string or regex
    '@philly/layerboard',
    '@philly/vue-comps',
    '@philly/vue-mapping',
    '@philly/vue-datafetch'
    // 'L-esri-WebMap'
    // /other-dep/
  ]
}
