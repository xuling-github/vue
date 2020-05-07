//打包发布时使用的工具
const webpackMerge = require('webpack-merge') //合并
const baseConfig = require('./base.config.js') //导入base.config.js文件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = webpackMerge(baseConfig, {plugins: [

      // //压缩js
      // new UglifyJsPlugin()
  ]})
// module.exports = {
//   plugins: [
//
//       // //压缩js
//       new UglyfyJsPlugin()
//   ],
//
//
// }