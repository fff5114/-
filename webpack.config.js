const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.json5$/,
        use: 'json5-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.json$/,
        // use: 'json-loader'
        use: 'raw-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            // 在处理 <img> 标签时自动转换以下源文件路径
            // 可以使用 require 或 import 语句
            img: ['src', 'data-src'],
            // 在处理 <a> 标签时自动转换以下 href 属性路径
            a: 'href'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin() // 添加这一行
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
};