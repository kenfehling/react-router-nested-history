import baseConfig from './webpack.base.config'

export default {
  ...baseConfig,
  entry: '../src/index.ts',
  output: {
    ...baseConfig.output,
    filename: 'client.js'
  }
}