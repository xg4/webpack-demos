const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const Webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  // production development
  mode: 'development',
  // 多入口
  entry: {
    home: resolve('src/home'),
    other: resolve('src/other')
  },
  output: {
    // [name] home, other
    filename: '[name].[hash:6].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    // 默认处理这些后缀的文件
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  // 直接使用外部引用，并不需要打包进项目的模块
  externals: {
    // jquery: 'jQuery'
  },
  // 模块
  module: {
    // 规则
    // loader 单一性，只处理一件事情，默认顺序是从后向前执行
    // 前置loader pre，普通loader normal，内联loader，后置loader post,
    rules: [
      // 处理 html 中的 img src
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      // 处理图片资源
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {},
          // },
          {
            loader: 'url-loader',
            options: {
              // 小于 8k
              limit: 8 * 1024,
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
      // import当前模块之后
      // 暴露模块到全局对象 window 上
      // 也可以使用內联的形式
      {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
      },
      // eslint
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre', // previous 前置loader， pre / post
        exclude: /node_modules/
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            // 插入 css 到 head 标签中
            loader: 'style-loader',
            options: {
              // 插入到最上层，避免 head 中原有样式被覆盖
              insertAt: 'top'
            }
          },
          // 处理 css 中 @import 语法、路径
          'css-loader'
        ]
      },
      // less scss sass
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
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
      new TerserJSPlugin({}), // 压缩 js
      new OptimizeCssAssetsPlugin({}) // 压缩 css
    ]
  },
  plugins: [
    // 关联 html
    // new HtmlWebpackPlugin({
    //   template: resolve('public/index.html'),
    //   filename: 'index.html',
    //   minify: {
    //     removeAttributeQuotes: true, // 删除双引号
    //     collapseWhitespace: true // 折叠成一行
    //   }
    // }),
    // 多页
    new HtmlWebpackPlugin({
      template: resolve('public/home.html'),
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: resolve('public/other.html'),
      filename: 'other.html',
      chunks: ['other']
    }),
    // 导出 css 为文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // production '[name].[hash].css'
      chunkFilename: 'css/[id].css'
    }),
    // check
    new ForkTsCheckerWebpackPlugin(),
    // 在每个模块中直接注入某个模块，无需引用，直接调用
    new Webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}
