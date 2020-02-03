const Visualizer = require('webpack-visualizer-plugin');
const path = require('path');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new Visualizer({ filename: './statistics.html' }),
    ],
    resolve: {
      alias: {
        "leaflet": path.resolve(__dirname, 'node_modules/leaflet'),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
  transpileDependencies: [
    // can be string or regex
    '@phila/layerboard',
    '@phila/vue-comps',
    '@phila/vue-mapping',
    '@phila/vue-datafetch',
    'arcgis-to-geojson-utils',
    // /other-dep/
  ],
};
