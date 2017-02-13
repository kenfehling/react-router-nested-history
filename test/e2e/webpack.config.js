var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve('./'),
  entry: '../../examples/react/src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    /*
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],
    */
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve('../../examples/react/src'),
          path.resolve('../../src')
        ]
      }, {
        test: /\.(ts|tsx)?$/,
        loader: "awesome-typescript-loader"
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  resolve: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-router-nested-history': path.resolve('../../src')
    },
    modules: [
      path.resolve('../../examples/react/node_modules'),
      path.resolve('../../node_modules'),
      path.resolve('./node_modules'),
      'node_modules'
    ]
  },
  node: { Buffer: false }
};