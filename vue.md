# vue 	

方法和函数的区别，方法时定义在对象中的，函数时定义在类中的

mustache语法用于html内容部分

v-on:监听事件

v-for：循环

v-on：监听事件 ----语法糖：@

v-bind：绑定元素属性

v-bind绑定class属性使用对象语法，就是直接用大括号括起来一个对象，可以通过布尔值动态的改变class比如active或者不选中，只要在Vue实例中将他的布尔值赋给它就能改变状态，当然还可以用传统的class赋值方式放一个固定不变的class属性，Vue会将他们自动合并=====语法糖：：

参考：

<h1 :class="{class名1：boolean，class名2：boolean}"></h1>

一个大括号{}表示一个对象，那么它里面就可以放键值对

v-bind动态绑定style

参考：

<h1 :style="{key(属性名)：value(属性值)，key2:value}"></h1>

key属性名可以使用驼峰命名法fontSize或则加-链接font-size,推荐用驼峰

注意：在vue中键值对中的value值一定要加引号，不然vue解析不出来，他会把它当一个变量去Vue实例中寻找



Vue实例的computed属性在里面定义函数，计算属性命名的时候就按属性的感觉来命名，且这个函数在内容填充时不用加括号

计算属性和methods属性的区别是前者只会调用 一次它内部会缓存的，methods是使用了多少个就会调用多少个。所以一般情况多使用计算属性



### v-on事件监听	

#### v-on的参数问题	

如果函数没有参数，在v-on:click调用函数时可以不加小括号，

如果函数有参数，但是在调用函数时加了小括号但没有传参，默认返回的时undefined对象

如果有参数调用时没有加小括号，那么会返回浏览器生成的event事件对象多为参数传入到方法中。

当我们既需要自己传参有需要浏览器的event事件时，传入$event作为实参得到浏览器的event事件

#### v-on的修饰符

.stop阻止事件冒泡

.prevent阻止默认行为，比如表单提交，用户希望自己提交

.keyCode(键盘的数字代码）|keyAlias（键盘的别名）

.once,回调只触发一次

### v-if和v-show的区别

```
<!--  当条件为false时，包含v-if的元素根本就不会显示-->
<!--  当条件为false时，包含v-show的元素会增加一个display：none的属性，当需要频繁切换时可以使用v-show-->
```

### 解决vue底层出现值复用的方法，只要添加一个key就行，vue根据不同的key避免复用

v-for的使用过层添加key为了更高效的使用虚拟DOM，在使用v-for时添加一个：key，他的值选用item而不要选用index，只有item才能更好的一一对应

### 可变参数的概念，就是（...num）表示可以传入多个参数

### 数组中的那些方法是响应式的

```
//响应式方法
    // //1.push方法,可以在末尾添加多个参数
    // this.letters.push('f')
    // this.letters.push('f','aaaa')
    // //2.pop方法,删除数组中的最后一个元素
    // this.letters.pop()
    // //2.pop方法,删除数组中的最后一个元素
    // this.letters.pop()
    //3.shift方法，删除数组中最前面的元素
    // this.letters.shift()
    //4.unshift方法，在数组最前面添加元素，可以同时添加多个元素
    // this.letters.unshift('aa','bbb','cccc')
    //5.splice（第一个参数：在哪个地方后面添加/删除/替换元素，
    // 第二个参数：传入删除几个元素-不删除就写0-如果不传这第二个参数的话他会删除第一个参数标识位置后面的全部元素，
    // this.letters.splice(2,2,'a') //替换元素：表示在第二个元素后面删除2个元素，并添加上'a'，abcde变成abae
    // this.letters.splice(2) //删除元素：删除第二个元素后面的所有元素，abcde变成ab
    // this.letters.splice(2,0,'a') //插入元素：在第二个元素后面添加一个a，abcde变成abacde
    // //6.sort排序方法
    // this.letters.sort()
    // //7.reverse取反方法
    // this.letters.reverse()

    //注意通过索引的方法修改数组中的元素没办法响应，也就是页面吗不会改变
    // this.letters[0] = 'v'
    //想要实现上面可以用下面两种方法
    // this.letters.splice(0,1,'v') //在最开始的位置插入，删掉他后面也就是第一个元素，插入v，abcde变成vbcde
    // //Vue的set方法（要替换的对象，索引，修改后的值—）
    // Vue.set(this.letters,0,'v')


  }
}
//可变参数的概念，就是（...num）表示可以传入多个参数
```



