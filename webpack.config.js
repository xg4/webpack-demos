const path = require('path')

const resolve = (...dir) => path.resolve(__dirname, ...dir)

module.exports = {
  mode: 'development',
  entry: resolve('src/index.js'),
  output: {
    filename: 'build.js',
    path: resolve('dist')
  },
  resolveLoader: {
    modules: ['node_modules', resolve('loaders')],
    // loader 别名
    alias: {
      'x-loader': resolve('loaders/x-loader.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: resolve('loaders/x-loader.js')
      }
    ]
  }
}
