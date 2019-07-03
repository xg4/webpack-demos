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
    // loader 查找模块
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
        // loader 绝对路径
        use: resolve('loaders/x-loader.js')
      },
      {
        test: /\.js$/,
        use: ['1-loader'],
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: ['2-loader']
      },
      {
        test: /\.js$/,
        use: ['3-loader'],
        enforce: 'post'
      }
    ]
  }
}
