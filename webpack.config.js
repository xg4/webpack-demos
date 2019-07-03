const path = require('path')

const resolve = (...dir) => path.resolve(__dirname, ...dir)

module.exports = {
  mode: 'development',
  entry: resolve('src/index.js'),
  output: {
    filename: 'build.js',
    path: resolve('dist')
  }
}
