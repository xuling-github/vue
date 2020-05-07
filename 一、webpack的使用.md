

### 一、webpack的使用

### 1.1.0安装

##### (1)首先安装node.js

(2)npm install webpack@3.6.0 -g (这里使用-g全局安装)

(3)打包 webpack ./src/main.js ./dist/bundle.js

(4)在index.html 使用<script src='./dist/bundle.js'></script>

(5)创建webpack.config.js配置文件

(6)npm init 创建依赖包

(6.1)填写package.json文件的信息（生成package.json文件）

```
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

(7)如果有依赖的包的话还需要npm install (生成package-lock.json)

(8)配置webpacke.config.js文件

```
const path = require('path') //导入node里面有的path的全局的包
module.exports = {
  entry: './src/main.js',
  output: {
    // 通过导入的path包中的resolve方法
    // 将node里面的全局变量__dirname，这个全局变量可以获取当前文件夹的路径同dist进行拼接
    // 动态的获取绝对路径
    path: path.resolve(__dirname,'dist'),
    filename: "bundle.js"
  }
}
```

(9)配置完成后就可以删除bundle.js,使用webpack命令重新生成bundle.js

(10)运行index.html

(11)这里用npm run build 代替webpack命令只需要在package.json文件中的script增加build属性'build':'webpack',这说明只要在script中增加对应命令都能用 npm run xx对应xx命令

```
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC"
}
```

(12)开发时依赖：是指只是在开发时才会使用的包，在发布后不会再使用，只在本地使用，这里我们使用npm install webpack@3.6.0 --save-dev

tips:只要在终端或者cmd中使用的命令都是全局的，要想使用本地的需要cd到本地路径去使用命令

(13)现在关掉package.json重新打开就多了一些东西，且多了一个node-module文件夹

```
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.6.0"
  }
}
```

#### 2.loader的使用-webpack的扩展 webpack官网（<https://www.webpackjs.com/loaders/css-loader/>）

##### 1.在main.js中添加依赖css   require('./css/norml.css')

##### 2.安装css的loader  npm install --save-dev css-loader,这里只能加载css，浏览器并不显示

3.安装style-loader，npm install style-loader --save-dev这个可以将css渲染到Dom中

4.注意使用loader时时从右往左的，所以在webpack.config.js中配置时需要把style-loader放在css-loader的左边

```
const path = require('path') //导入node里面有的path的全局的包
module.exports = {
  entry: './src/main.js',
  output: {
    // 通过导入的path包中的resolve方法
    // 将node里面的全局变量__dirname，这个全局变量可以获取当前文件夹的路径同dist进行拼接
    // 动态的获取绝对路径
    path: path.resolve(__dirname,'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loader只负责加载css
        //style-loader负责将css渲染到DOM中
        //loader加载顺序时从右往左，所以要注意顺序，这里先使用css-loader
        use: [ 'style-loader','css-loader' ]
      }
    ]
  }
}
```

5.使用打包命令，npm run build

6.使用url-loader加载图片时的注意事项

```
const path = require('path') //导入node里面有的path的全局的包
module.exports = {
  entry: './src/main.js',
  output: {
    // 通过导入的path包中的resolve方法
    // 将node里面的全局变量__dirname，这个全局变量可以获取当前文件夹的路径同dist进行拼接
    // 动态的获取绝对路径
    path: path.resolve(__dirname,'dist'),
    filename: "bundle.js",
    publicPath: "dist/"
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
      }

    ]
  },

}
```

### 三、ES6语法转成ES5

安装babel-loader

npm install --save-dev babel-loader@7 babel-core babel-preset-es2015

配置webpack.config.js文件

```
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
}
```

npm run build



### 四。使用vue

1.npm install vue --save     (因为运行时也要依赖vue 所以--save后面不加dev)

导入Vue

import Vue from 'vue'

2.配置vue使用runtime-compiler版本这个版本可以使用template，不配置的话就是runtime-only模式这个不能使用template，会报错且不能使用

在webpace.config.js中增加resolve

```
const path = require('path') //导入node里面有的path的全局的包
module.exports = {
  entry: './src/main.js',
  output: {
    // 通过导入的path包中的resolve方法
    // 将node里面的全局变量__dirname，这个全局变量可以获取当前文件夹的路径同dist进行拼接
    // 动态的获取绝对路径
    path: path.resolve(__dirname,'dist'),
    filename: "bundle.js",
    publicPath: "dist/"
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
    }

    ]
  },
  // 将runtime-only模式改成runtime-compiler模式
  resolve: {
    //alias:别名
    alias: {
      //使用vue时会去node-modles文件下寻找vue文件夹下的dist文件下vue.esm.js
      'vue$': 'vue/dist/vue.esm.js'
    }
  }

}
```



在开发中不能频繁更改index.html所以需要在vue实例中增加template属性，在这里写代码，而index.html中只需要写一个简单的<div id='app'></div>



### 使用vue-loader

npm install --save-dev vue-loader@13.0.0 vue-template-compiler

配置增加module

```
{
  test: /\.vue$/ ,
  use: {'vue-loader'}

}
```



将index.html文件打包到dist文件夹，这样只需要把dist发布到服务器就完成整个开发了

这时候需要使用HtmlWebpackPlugin

安装 npm install html-webpack-plugin --save-dev

在webpack.config.js文件夹中添加

```
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
。。。。
module.exports = {
    。。。。
    // 增加具有版权信息的plugins，基于webpack包
  //打包index.html到dist文件夹
  plugins: [
      new webpack.BannerPlugin('最终版权归carrie所有')
      new HtmlWebpackPlugin()
  ],
}
```

在执行这一步的时候可以将publicPath注释掉，将原本的index.html中的script删掉，之后在

```
new HtmlWebpackPlugin({
  template:'index.html'
})
```

删除原先的dist文件的内容，重新npm run build

### ####对js进行压缩插件

npm install uglifyjs-webpack-plugin@1.1.1 -save-dev

配置

```
const UglyfyJsPlugin = require('uglyjs-webpack-plugin')
。。。。
module.exports = {
    .....
    plugins:{
        ....
        //压缩js
      new UglyfyJsPlugin()
    }
}
```



### 搭建本地服务器

npm install --save-dev webpack-dev-server@2.9.1

配置在webpack.config.js文件中

```
devServer: {
  //为哪一个本地文件提供服务，默认为根文件./dist
  contentBase:'./dist',
  //实时监听
  inline: true,
}
```

这里使用webpack-dev-server提示不是内部命令，因为刚刚时本地安装，而直接在终端使用该命令时全局的所以报错需要去本地寻找'./node_module/.bin/webpack-dev-server'，或者在package.json的scripts中配置,为了能直接打开浏览器可以加上--open

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack"，
  。。。。。。。
  "dev": "webpack-dev-server --open"
},
```

### 配置文件的分离

将webpack.config.js文件分离成

base.config,js  公共部分

```
//公共部分
const path = require('path') //导入node里面有的path的全局的包
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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


  plugins: [
      // 增加具有版权信息的plugins，基于webpack包
      new webpack.BannerPlugin('最终版权归carrie所有'),
      //打包index.html到dist文件夹
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
  ],

}
```

prod.config.js   打包发布时使用的工具

```
//打包发布时使用的工具
const webpackMerge = require('webpack-merge') //合并
const baseConfig = require('./base.config') //导入base.config.js文件
const UglyfyJsPlugin = require('uglyjs-webpack-plugin')
module.exports = webpackMerge(baseConfig, {plugins: [

      // //压缩js
      new UglyfyJsPlugin()
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
```

dev.config.js   开发时使用本地服务器，随时调试

```
//开发时使用本地服务器，随时调试
const webpackMerge = require('webpack-merge') //合并
const baseConfig = require('./base.config') //导入base.config.js文件

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
```

将上面三个文件合并需要 npm install webpack-merge --save-dev

之后就可以将原来的webpack.config.js文件删除了

之后在package.json文件中修改"build": "webpack --config ./build/prod.config.js"

"dev": "webpack-dev-server --open --config ./build/dev.config.js"

```
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
//"build": "webpack",
    "build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.5",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^3.5.3",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^2.30.1",
    "less": "^3.11.1",
    "less-loader": "^4.0.5",
    "style-loader": "^1.2.1",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.6.2",
    "vue-loader": "^13.0.0",
    "vue-template-compiler": "^2.6.11",
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.2.2"
  },
  "dependencies": {
    "vue": "^2.6.11"
  }
}
```

之后打包还需要修改base.config.js文件中output中的path

path: path.resolve(__dirname,'../dist'), 时打包文件可以生成到dist文件夹而不是buiid文件夹下



```
output: {
  // 通过导入的path包中的resolve方法
  // 将node里面的全局变量__dirname，这个全局变量可以获取当前文件夹的路径同dist进行拼接
  // 动态的获取绝对路径
  path: path.resolve(__dirname,'../dist'),
  filename: "bundle.js",
  // publicPath: "dist/"
},
```

注意一旦修改了package.json中的工具版本，就需要npm install一下