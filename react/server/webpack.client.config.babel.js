import baseConfig from './webpack.base.config'

export default {
  ...baseConfig,
  entry: '../src/index.js',
  output: {
    ...baseConfig.output,
    filename: 'client.js'
  }
}