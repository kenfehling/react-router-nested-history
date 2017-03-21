const webpack = require('webpack')
const base = require('./webpack.config.base.babel.js')

module.exports = Object.assign({}, base, {
  output: {
    ...base.output,
    filename: 'react-router-nested-history.min.js'
  },
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