import webpack from 'webpack'
const base = require('./webpack.config.base.babel.js')

module.exports = Object.assign({}, base, {
  output: {
    ...base.output,
    filename: 'react-router-nested-history.min.js'
  },
  plugins: [
    ...base.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  optimization: {
    minimize: true
  }
})