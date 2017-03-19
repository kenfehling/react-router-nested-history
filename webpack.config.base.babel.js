var webpack = require('webpack');

module.exports = {
  entry: "./src/index.ts",
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    library: 'ReactRouterNestedHistory',
    path: './dist/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)?$/,
        loader: "awesome-typescript-loader"
      }, {
        enforce: 'pre',
        test: /\.(ts|tsx)?$/,
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  node: { Buffer: false }
};