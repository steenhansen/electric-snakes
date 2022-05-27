
const path = require('path');
require('babel-polyfill')
const AssetsPlugin = require('assets-webpack-plugin')
const js_chunks_location_plugin = new AssetsPlugin({ filename: './javascript/webpack_js_chunks.json' })

const jsx_entries = {
  create_game_entry: './javascript/browser/create-entry.js'
  , join_game_entry: './javascript/browser/join-entry.js'
}

const js_vars_and_files = {
  libraryTarget: 'var'
  , library: 'GLOBAL_WEBPACK'
  , path: path.join(__dirname, './public/auto')
  , filename: '[name].js'
}

module.exports = {
  entry: jsx_entries,
  mode: 'production',
  optimization: {
    //minimize: false,
    splitChunks: {
      chunks: 'all',
      name: 'common_game_entry',
      filename: 'common_game_entry.js'
    },
  },
  output: js_vars_and_files,
  plugins: [js_chunks_location_plugin],

};
