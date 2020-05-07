// CommonJS导入用法
var {name,sum} = require('./aaa.js')
var name = aaa.name;
var sum = aaa.sum;
sum(20,30)

//ES6导入方法
import {name, sum} from './aaa.js'
var name = aaa.name;

//ES6导入默认，这里就不需要用{}包含了,且可以指定别名，因为default只有一个
// import addr from './aaa.js'
// console.log(addr)

import addr from './aaa.js'
addr('你好啊')

//ES6统一全部导入
import * as aaa from './aaa.js'
console.log(aaa.flag)