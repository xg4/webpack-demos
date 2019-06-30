const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: 'development', // production development
  entry: './src/index.js',
  output: {
    filename: 'index.min.js',
    path: resolve('dist')
  }
}
