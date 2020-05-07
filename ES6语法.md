# ES6的语法	

### ES5中因为if和for没有块级作用域的概念，那么他的变量就相当于在外部定义的，可以随时被改变，当被遍历之后i的值变成了最后的值，导致我们原本想要的结果出错，所以很多时候我们都要借助function的作用域来解决。	

### ES6中加入了let，let他是有if和for的块级作用域的	

建议：在开发中优先使用const（定义一个常量，不能被修改，一旦给const修改的标识符修改就会报错。2.在使用const定义变量时必须被赋值，不然会报错没有初始值。3.常量的概念是指被赋值的对象不可以改变，但是对象内部的属性值是可以被改变的），只有需要改变某一个标识符的时候才用let

### ES6对象字面量的增强写法	

const app = new object();

对象子面量写法： const app = {}

对象属性的增强写法

const name = 'why';

const age =19;

const height = 1.55;

//es5的写法

const app = {

​	name:name,

​	age:age,

​	height:height

}

//ES6的增强写法,他会把变量的名字作为key变量的值作为value

const app = {

​	name,

​	age,

​	height

}

#### 函数的增强写法	

//ES5的写啊

const app = {

​	eat: function(){

},

​	run: function(){

}

}

//ES6的增强写法

const app = {

​	eat(){

},

​	run(){

}

}

### filter/map/reduce高阶函数的运用

```
nums = [12,34,213,23,444,11]
1.需求一,取数组中所有小于100的数
//普通写法
let newnums = []
for (let n of nums){
  if (n<100){
    newnums.push(n)
  }
}
//高阶函数filter用于过滤元素的方法
//filter方法的返回结果总是一个boolean类型
//当他的结果为false时，filter函数会将这个值过滤掉
//当它结果为true时他会自动建一个数组并把这个结果添加到数组中，我们只需要创建一个变量去接收这个数组
let newnums = nums.filter(function (n) {
  return n < 100

})
2.需求2，将新产生的数组中的每个数据全部乘以2，返回一个新数组
//普通写法
let new2Nums = []
for(let n of newnums){
  new2Nums.push(n*2)
}
//高阶函数映射函数map的用法，
let new3Nums = newnums.map(function (n) {
  return n * 2

})
3.需求3，将所有new3Nums中的数字相加得到一个总数
//普通写法
let total = 0
for(let n of new3Nums){
  total += n
}
//高阶函数reduce用于计算总和reduce(第一个参数，第二个参数）
//                     xx.reduce(回调函数（上一个函数的结果，需要遍历的对象），设置函数结果的初始值）
// xx.reduce(function(prevalue,n){return prevalue + n},0)
let total = new3Nums.reduce(function (prevalue,n) {
  return prevalue + n

},0)

//上面三种需求的汇总写法
let total = nums.filter(function (n) {
  return n < 100

}).map(function (n) {
  return n * 2

}).reduce(function (prevalue,n) {
  return prevalue + n

},0)
```