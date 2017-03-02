import path from 'path'
import nodeExternals from 'webpack-node-externals'
import baseConfig from './webpack.base.config'

export default {
  ...baseConfig,
  entry: './index',
  target: 'node',
  output: {
    ...baseConfig.output,
    filename: 'server.js'
  },
  node: {
    __dirname: true
  },
  externals: [nodeExternals()]
}