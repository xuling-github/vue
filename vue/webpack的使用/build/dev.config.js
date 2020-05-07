//开发时使用本地服务器，随时调试
const webpackMerge = require('webpack-merge') //合并
const baseConfig = require('./base.config.js') //导入base.config.js文件

module.exports = webpackMerge(baseConfig, {devServer: {
    //为哪一个本地文件提供服务，默认为根文件./dist
    contentBase:'./dist',
    //实时监听
    inline: true,
  }})
// module.exports = {
//   devServer: {
//     //为哪一个本地文件提供服务，默认为根文件./dist
//     contentBase:'./dist',
//     //实时监听
//     inline: true,
//   }
//
// }