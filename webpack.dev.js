const { smart } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = smart(baseConfig, {
  mode: 'development',
  devServer: {
    port: 3000,
    progress: true,
    // 压缩
    compress: true
    // 1. http proxy 跨域问题
    // proxy: {
    // '/api': 'https://localhost'
    //   '/api': {
    //     target: 'https://localhost',
    //     pathRewrite: { '/api': '' }
    //   }
    // },
    // 2. 模拟数据 mock
    // before 钩子函数
    //  app 是 express
    // before(app) {
    //   app.get('/user', (req, res) => {
    //     res.json({ name: 'hello' })
    //   })
    // }
  }
  // 调试工具，源码映射 https://webpack.js.org/configuration/devtool/
  // production 下不会生成映射文件
  // 1. source-map 生成源码映射文件
  // 2. eval-source-map 不生成单独的映射文件，生成在文件中可以显示行和列
  // 3. cheap-module-source-map 是一个单独的映射文件，但不会生成列
  // 4. cheap-module-eval-source-map
  // devtool: 'source-map',
  // 监控打包文件，更改重新打开
  // watch: true,
  // watchOptions: {
  //   // 每秒查看 1000 次
  //   poll: 1000,
  //   // 防抖
  //   aggreatement: 500,
  //   // 不监控那些文件
  //   ignored: /node_modules/
  // },
})
