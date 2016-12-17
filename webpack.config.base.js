var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    library: 'TabHistoryLibrary',
    path: './dist/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  node: { Buffer: false }
};