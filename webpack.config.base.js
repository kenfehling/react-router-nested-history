var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    libraryTarget: 'umd',
    library: 'ReactRouterNestedHistory',
    path: './dist/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.(ts|tsx)?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  node: { Buffer: false }
};