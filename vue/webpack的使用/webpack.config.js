const path = require('path') //导入node里面有的path的全局的包
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglyfyJsPlugin = require('uglyjs-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    // 通过导入的path包中的resolve方法
    // 将node里面的全局变量__dirname，这个全局变量可以获取当前文件夹的路径同dist进行拼接
    // 动态的获取绝对路径
    path: path.resolve(__dirname,'dist'),
    filename: "bundle.js",
    // publicPath: "dist/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loader只负责加载css
        //style-loader负责将css渲染到DOM中
        //loader加载顺序时从右往左，所以要注意顺序，这里先使用css-loader
        use: [ 'style-loader','css-loader' ]
      },
     {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
    },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当图片在limit(以btyes为单位）图片10kb=10*1024=10240b设置的数字之内时
              // ，会将图片编译成base64字符串
              //当图片大小在limit设置的数字之外时，需要安装file-loader模块，
              // 使用时会复制图片到dist文件夹下
              //浏览器会使用dist文件夹下的图片
              // 这就需要在webpack.config.js文件的output中增加publicPath:'dist/',
              // 这样在使用每一个url文件时使用的dist下面生成的复制的开发时使用的图片
              limit: 6000,
              //给生成在dist的图片重命名
            //        这里使用中括号时会把它里面的内容当成一个变量，那么就可以生成不同的文件名
            //因为生成的图片是一个32为的hash值，太长了使用hash:8表示只截取8位加中括号因为hash也是一个变量
            //ext表示extension扩展名也需要中括号
            name: 'img/[name].[hash:8].[ext]'
            },

          }
        ]
      },
      {
        test: /\.js$/,
        //转换js文件中所有的ES6语法不包含node_modles或bower_components
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
            presets: ['es2015']
          }
        }
    },
      {
        test: /\.vue$/ ,
        use: ['vue-loader']

      }

    ]
  },
  // 将runtime-only模式改成runtime-compiler模式
  resolve: {
    //alias:别名
    //extensions可以让一些路径后面省略扩展名
    extensions: ['.js','.css','.vue'],
    alias: {
      //使用vue时会去node-modles文件下寻找vue文件夹下的dist文件下vue.esm.js
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // 增加具有版权信息的plugins，基于webpack包
  //打包index.html到dist文件夹
  plugins: [
      new webpack.BannerPlugin('最终版权归carrie所有'),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      // //压缩js
      // new UglyfyJsPlugin()
  ],
  devServer: {
    //为哪一个本地文件提供服务，默认为根文件./dist
    contentBase:'./dist',
    //实时监听
    inline: true,
  }

}