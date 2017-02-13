var webpack = require('webpack');

module.exports = {
  entry: './index.test.js',
  devtool: 'source-map',
  output: {
    path: './build',
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      }, {
        test: /\.(ts|tsx)?$/,
        loader: "awesome-typescript-loader"
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
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
    alias: {
      'react-router-nested-history': '../../src/'
    }
  },
  node: { Buffer: false }
};