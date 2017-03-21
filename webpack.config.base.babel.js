var webpack = require('webpack');

module.exports = {
  entry: "./src/index.ts",
  output: {
    libraryTarget: 'umd',
    library: 'ReactRouterNestedHistory',
    path: './dist/'
  },
  module: {
    loaders: [
      {
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