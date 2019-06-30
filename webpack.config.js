const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: 'development', // production development
  entry: './src/index.js',
  output: {
    filename: 'index.[hash:6].js',
    path: resolve('dist')
  },
  // 模块
  module: {
    // 规则
    // loader 单一性，只处理一件事情，默认顺序是从右向左执行
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // 插入 css 到 head 标签中
            options: {
              insertAt: 'top' // 插入到最上层，避免 head 中原有样式被覆盖
            }
          },
          'css-loader' // 处理 css 中 @import 语法、路径
        ]
      },
      // less scss sass
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 处理 css 浏览器前缀、css next 等
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    progress: true,
    compress: true // 压缩
  },
  // 优化
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin() // 压缩 css
    ]
  },
  plugins: [
    // 关联 html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
      // minify: {
      //   removeAttributeQuotes: true, //删除双引号
      //   collapseWhitespace: true // 折叠成一行
      // }
    }),
    // 导出 css 为文件
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ]
}
