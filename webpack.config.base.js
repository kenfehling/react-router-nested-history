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
        exclude: /node_modules/
      }, {
        test: /\.(ts|tsx)?$/,
        loader: "awesome-typescript-loader"
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
  },
  node: { Buffer: false }
};