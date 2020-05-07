
var name = 'carrie';
function sum(num1,num2){
  return num1 + num2

}
// CommonJs导出用法
module.exports = {
  name: name,
  sum: sum
}

// ES6模块化导出方法
export {
  name,sum
}
// ES6导出默认值，这个default只能时唯一一个,
// const address = '北京市'
// export default address
export default function (argument) {
  console.log(argument)

}