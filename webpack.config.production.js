const webpack = require('webpack')
const base = require('./webpack.config.base')

module.exports = Object.assign({}, base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
        screw_ie8: false
      },
      output: {
        screw_ie8: false
      },
      mangle: false
    })
  ]
})