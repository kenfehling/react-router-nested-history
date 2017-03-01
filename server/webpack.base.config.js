import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  context: path.resolve('./'),
  devtool: 'source-map',
  output: {
    path: './build/',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['es2015', { modules: false }],
            'react',
          ],
        }
      }, {
        test: /\.(ts|tsx)?$/,
        loader: 'awesome-typescript-loader'
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "isomorphic-style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-router-nested-history': path.resolve('../../../src')
    }
  }
}