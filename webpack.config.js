const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: 'development', // production development
  entry: './src/index.js',
  output: {
    filename: 'index.[hash:6].js',
    path: resolve('dist')
  },
  devServer: {
    port: 3000,
    progress: true,
    compress: true // 压缩
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true // 折叠成一行
      }
    })
  ]
}
