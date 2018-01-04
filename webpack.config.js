
// $ webpack 

const path = require('path')
const env = require('node-env-file')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
env('./.env')  // N.B. This defines process.env.NODE_ENV

const jsx_entries = {
  create_game_entry: './browser/create-entry.js'
  , join_game_entry: './browser/join-entry.js'
}

const js_vars_and_files = {
  libraryTarget: 'var'
  , library: ['GLOBAL_WEBPACK', '[name]']
  , path: path.join(__dirname, './public')
  , filename: '[name].[chunkhash].js'
  , chunkFilename: '[chunkhash].js'
}

const node_env_plugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
})

const js_chunks_location_plugin = new AssetsPlugin({filename: './html/webpack_js_chunks.json'})

const js_chunks_hashed_plugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common_game_entry'
  , filename: '[name].[chunkhash].js'
  ,chunkFilename: '[chunkhash].js'
})


const do_cleanup_plugin = new WebpackCleanupPlugin({exclude: ['*.ico']})

module.exports = {
  context: path.resolve(__dirname, './javascript/')
  ,entry: jsx_entries
  ,output: js_vars_and_files
  ,plugins: [js_chunks_location_plugin
  , node_env_plugin
  , js_chunks_hashed_plugin
  , do_cleanup_plugin
  ]
}


