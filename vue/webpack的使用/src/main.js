// 作为入口的js文件不需要放到js包里面，js包里面放一些功能性文件
console.log('aaaa')
//CommonJS导入
const {sum,mul} = require('./js/mathUtils.js')
console.log(sum(23, 30));
console.log(mul(20, 23));
//ES6导入
import {name,age} from './js/info.js'

console.log(name);
console.log(age);
//3.依赖的css文件
require('./css/normal.css')
//4.依赖less文件
require('./css/special.less')
document.writeln('<p>Hello,World!</p>')
//5.使用Vue进行过开发
//5.1先导入
import Vue from 'vue'
//
import App from './vue/APP.vue'
//定义一个组件
// const App = {
//   template: `
//       <div>
//         <h2>{{message}}</h2>
//         <button @click="btnClick">按钮</button>
//       </div>
//   `,
//   data(){
//     return {
//       message: 'Hello,World!'
//     }
//   },
//   methods: {
//     btnClick(){
//       console.log('我被点了就显示');
//     }
//   }
//
// }
const app = new Vue({
  el: '#app',
  //使用组件,可以使用单标签
  template: '<App/>',
  //注册组件
  components: {
    App
  }
})
// const app = new Vue({
//   el: '#app',
//   template: `
//       <div>
//         <h2>{{message}}</h2>
//         <button @click="btnClick">按钮</button>
//       </div>
//   `,
//   data: {
//     message: 'Hello,World!'
//   },
//   methods: {
//     btnClick(){
//       console.log('我被点了就显示');
//     }
//   }
// })
document.writeln('<p>我是carrie</p>')