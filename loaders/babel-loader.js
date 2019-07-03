const babel = require('@babel/core')
const loaderUtils = require('loader-utils')

module.exports = function(content) {
  console.log('babel-loader')
  const cb = this.async()
  babel.transform(
    content,
    {
      ...loaderUtils.getOptions(this),
      // 生成 映射文件
      sourceMap: true,
      // 映射文件名
      filename: this.resourcePath.split('/').pop()
    },
    function(err, result) {
      cb(err, result.code, result.map)
    }
  )
}
