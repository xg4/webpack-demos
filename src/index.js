import $ from 'jquery'
// 如果 webpack config 文件没有配置 loader，
// 可以使用下面这种內联的形式
// 暴露模块到 window 上
// import $ from 'expose-loader?$!jquery'

console.log(window.$, 'window $')

console.log($, 'index $')

// eslint-disable-next-line no-undef
console.log(NODE_ENV, ENV, 'env')
