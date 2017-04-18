import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

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
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  node: { Buffer: false }
};