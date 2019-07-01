const { smart } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const Webpack = require('webpack')

module.exports = smart(baseConfig, {
  mode: 'production',
  // 优化
  optimization: {
    minimizer: [
      // 压缩 js
      new TerserJSPlugin({}),
      // 压缩 css
      new OptimizeCssAssetsPlugin({})
    ]
  },
  plugins: [
    // 全局注入环境变量
    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      ENV: JSON.stringify('hello')
    }),
    // 版权声明
    new Webpack.BannerPlugin(`${new Date()} by xg4`)
  ]
})
