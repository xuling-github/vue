### CLI脚手架的安装

官网：<https://cli.vuejs.org/zh/>

终端中输入命令：npm install @vue/cli -g

cli3创建项目

vue create my-project

拉取2.x版本

npm install @vue/cli-init -g

CLI2创建项目

vue init  webpack my-project（文件夹名称）

### cli2初始化项目

vue init webpack vuecli2test

project name

关掉eslint规范 在config文件夹下面的index.js中useEslint:false

#### runtime-compiler和runtime-only的区别



runtime-copiler:  template  (parse解析）------->（astract synax tree)ast(compile编译------->render-------->virtual dom -------> UI

runtime-only(1.性能更高，代码量更少，比上面代码轻6kb）: render--->vdom---->UI



将runtime-complier变为runtime-only

```
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//创键一个组件cpn
const cpn = {
  template:'<div>{{message}}</div>',
  data(){
    return {
      message: '我是cpn组件的message'
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { App },
  // //temlate的作用就是把el挂载的内容替换掉
  // template: '<App/>'
  render: function (createElement) {
    // 1.普通用法createElement('标签', {标签的属性: 属性值}, ['标签的内容'])
    // 将el挂载的div换成h2标签
    // return createElement('h2',
    //   {class: 'box'},
    //   ['hello,world', createElement('button',['按钮'])])
    //2.传入组件对象：
    // return createElement(cpn)
    return createElement(App)

  }
})
```

这里就省略了template解析编译的过程直接用render函数----》vdom----->UI

那么,vue文件中的template是由vue-template-compiler文件封装成render函数了过了不再需要解析和编译

所以在开发中推荐使用runtime-only

### CLI3的使用

preset配置的意思  manually手动的 dedicated独立的

vue create vuecli3test

上下左右选择 空格选中

rc结尾的文件rc ----> run command

git init 生成仓库 git add. 

终端输入 vue UI进入配置图型界面 或者进入node-modules -->@vue--->webpack.config.js 或者自己创建一个vue.config.js  执行git commit -m '添加一个配置文件' 之后将自己写的配置同默认的配置合并

### 掌握箭头函数

```
<script>
  //当我么需要在函数中导入另一个函数时推荐使用箭头函数
  //
  //箭头函数中的原本没有this，他的this是引用的外层this，
  // 向外一层一层查找有this的定义，就把这个对象赋给this
  // const obj = {
  //   aaa(){
  //     setTimeout(function(){
  //       console.log(this) //window
  //     },1000),
  //     setTimeout(() => {
  //       console.log(this)  //object
  //     },1000)
  //   }
  // }
  const obj = {
    aaa(){
      setTimeout(function(){
        setTimeout(function () {
          console.log(this)  //window

        })
        setTimeout(() => {
          console.log(this) //window
        })

      }),
      setTimeout(() => {
        setTimeout(function () {
          console.log(this)// window

        })
        setTimeout(() => {
          console.log(this)  //obj对象
        })
      })
    }
  }
  obj.aaa()

</script>
```

herf: hyper reference 超级 引用  超链接

#### 更改ul但是不刷新资源请求

location.hash = 'aaa'   

html5中的history模式

history.pushState({},'','aaa')  类似于栈结构 先入后出

history.back() 弹出当前走到后面一个

history.go(-1) = history.back

history.forword() = histroy.go(1)

history.replaceState()  网页就不能前后返回切换了

### vue-router

安装 npm install vue-router --save

在src文件夹下创建router文件夹创建index.js写入

```
//配置路由信息
import VueRouter from 'vue-router'
import Vue from 'vue'

//1.通过Vue.use(插件，任何插件安装都要用Vue.use），安装插件
Vue.use(VueRouter)
//2.创建路由对象
const routes = [

]
const router = new VueRouter({
  // 配置路由和组件之间的关系
  routes
})

//3.将router对象传入到Vue实例中
export default router
```

在main.js中挂载router

```
import Vue from 'vue'
import App from './App'
import router from './router/index'

Vue.config.productionTip = false
new Vue({
  el:'#app',
  router,
  render: h => h(App)
})
```

之后在components文件夹中创建两个组件文件 Home.vue About.vue

添加组件与路由的映射关系

```
//配置路由信息
import VueRouter from 'vue-router'
import Vue from 'vue'
//导入组件vue文件
import Home from '../components/Home.vue'
import About from '../components/About.vue'

//1.通过Vue.use(插件，任何插件安装都要用Vue.use），安装插件
Vue.use(VueRouter)
//2.创建路由对象
// 配置路由和组件之间的关系，一个映射关系就是一个对象
const routes = [
  {
    path:'/home',
    component: Home

  },
  {
    path:'/about',
    component: About
  }
]
const router = new VueRouter({
  // 配置路由和组件之间的关系，一个映射关系就是一个对象
  routes
})

//3.将router对象传入到Vue实例中
export default router
```

在App.vue中添加内容

```
<template>
  <div id="app">
    <router-view></router-view>
<!--    router-link是vue中已经注册过的全局组件-->
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
<!--    router-view组件是将两个页面的组件具体内容渲染到响应页面-->
<!--    并且router-view的放置位置决定改内容放置的位置-->

  </div>
</template>

<script>


export default {
  name: 'App'

}
</script>

<style scoped>

</style>
```

设置默认页面

```
const routes = [
  {
    //设置默认页面
    path: '',
    //重定向
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home

  },
  {
    path:'/about',
    component: About
  }
]
```

修改成history模式

```
const router = new VueRouter({
  // 配置路由和组件之间的关系，一个映射关系就是一个对象
  routes,
  //将url地址修改成html5的history模式，默认是hash模式，url地址栏会有#显示不好看
  mode: 'history'
})
```

<router-link></router-link>默认渲染成a标签，增加tag属性可以更改标签类型

增加replace属性，网页不能点前后箭头切换

active-class='active'更改活跃的名称或者直接在index.js中增加linkActiveClass:'active'属性统一改名

```
<router-link to="/home" tag="button" replace active-class="active">首页</router-link>
```

```
const router = new VueRouter({
  // 配置路由和组件之间的关系，一个映射关系就是一个对象
  routes,
  //将url地址修改成html5的history模式，默认是hash模式，url地址栏会有#显示不好看
  mode: 'history',
  linkActiveClass:'active'
}) 
```

router-link的补充可以用@click代替

在app.js中的components中增加方法方法中用this.$router.push('/home')或者this.$router.replace('/home')

$router可以调用push或者replace方法使路由进行跳转

#### 动态路由的设置/user/userId

index.js中

```
{
  //动态增加url地址
  path: '/user/:userId',
  component: User
}
```

App.vue中

```
<!--    动态绑定属性 v-bind-->
    <router-link :to="'/user/' + userId">用户</router-link>
    
   。。。。。。
  <script>


export default {
  name: 'App',
  data(){
    return {
      userId: 'lisi'
    }
  }

}
</script>
```

$router是我们在index.js中创建的路由对象  $

$route是指我们当前活跃的那个路由

在User.vue中做演示 

```
<template>
  <div id="app">
    <h2>我是用户界面</h2>
    <p>我是user,hhhhh</p>
    <p>{{userId}}</p>

  </div>
</template>

<script>
export default {
  name: 'User',
  computed: {
    userId(){
      return this.$route.params.userId
    }
  }

}
</script>

<style scoped>

</style>
```

#### 使用路由懒加载

路由懒加载就是用到的时候才加载，可以提高用户体验，容量更小，加载更快

index.js文件重写

```
//导入组件
// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// import User from '../components/User'
//使用路由懒加载导入文件
const Home = () => import('../components/Home')
const About = () => import('../components/About')
const User = () => import('../components/User')
```

### 子路由

1.在index.js中的home中增加children

```
{
  path:'/home',
  component: Home,
  //增加home/news home/messages子路由
  children: [
    {
      // 默认页面
      path: '',
      redirect: 'news'
    },
    {
      path: 'news',
      component: HomeNews
    },
    {
      path: 'messages',
      component: HomeMessages
    }
  ]

},
```

2.在home.vue中增加router-link以及router-view

```
<template>
  <div id="app">
    <h2>我是首页</h2>
    <p>我是home,hhhhh</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/messages">消息</router-link>
    <router-view></router-view>

  </div>
</template>
```

### 传递参数的方式

1.$route获取当前活跃路由的参数

2.<http://localhost:8080/profile?age=18&height=1.64> 要变成这种需要新建profile.vue之后添加路由同组件的映射之后在App.vue 的template标签中添加（：to={},为了把{}当成语法去解析需要加上v-bind，不然只是一个字符串

```
<!--    传递参数的第二种方式-->
    <router-link :to="{path: '/profile', query: {name:carrie, age:18, height:1.64}}">档案</router-link>
```

想要取出这个query

<p>{[$route.query]}

#### 生命周期函数

created(){

​	console.log('created')

}  //当组件被创建的时候会回调这个函数

mounted(){

​	console.log('mounted')

} //当我们的template挂载到dom时回调这个函数

updated(){

​	consloe.log('updated')

} //当页面更新刷新时回调这个函数

这里利用created函数更改html的标题

在每个组件中增加created生命周期函数

```
<template>
  <div id="app">
    <h2>我是首页</h2>
    <p>我是home,hhhhh</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/messages">消息</router-link>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'Home',
  //生命周期函数
  created(){
    //当组件被创建时，将html页面标题改为首页
    document.title = '首页'
  }

}
</script>

<style>

</style>
```

### vue-router的全局导航守卫（官网：<https://router.vuejs.org/zh/guide/advanced/navigation-guards.html>

#####router.beforeEach()是一个前置钩子（hook）在页面跳转之前做一些事情，这里是修改页面标题

// vue-router的全局导航守卫
//点进beforeEach源码可以看到它括号里面的NavigationGuard是一个箭头函数，
// NavigationGuard有三个参数，to，from，next，
// 从from跳转到to，to是一个route对象
// next是一个函数，这个函数必须在NavigationGuard中被调用，这样路由才会跳转不然整个方法不起效果且报错
// 那么这里就可以指我们每一个routes，在每个映射关系表中添加meta元数据，增加么个页面的标题
// 这里注意Home路由拥有一个子路由，他的meta：title在总的matched第一个元素的meta里面
// 所以要拿到每一个title就需要这样写to.matched[0].meta.title
router.beforeEach((to,from,next) => {
  document.title = to.matched[0].meta.title
  // 打印一个to看看这个to里面有什么
  console.log(to);
  next()
})

```
//配置路由信息
import VueRouter from 'vue-router'
import Vue from 'vue'
//导入组件
// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// import User from '../components/User'
//使用路由懒加载导入文件
const Home = () => import('../components/Home')
const About = () => import('../components/About')
const User = () => import('../components/User')
const HomeNews = () => import('../components/HomeNews')
const HomeMessages = () => import('../components/HomeMessages')
const Profile = () => import('../components/Profile')

//1.通过Vue.use(插件，任何插件安装都要用Vue.use），安装插件
Vue.use(VueRouter)
//2.创建路由对象
// 配置路由和组件之间的关系，一个映射关系就是一个对象
const routes = [
  {
    //设置默认页面
    path: '',
    //重定向
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home,
    // 给每个路由增加元数据
    meta: {
      title: '首页'
    },
    //增加home/news home/messages子路由
    children: [
      {
        // 默认页面
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'messages',
        component: HomeMessages
      }
    ]

  },
  {
    path:'/about',
    component: About,
    meta: {
      title: '关于'
    },
  },
  {
    //动态增加url地址
    path: '/user/:userId',
    component: User,
    meta: {
      title: '用户'
    },

  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    },
  }
]
const router = new VueRouter({
  // 配置路由和组件之间的关系，一个映射关系就是一个对象
  routes,
  //将url地址修改成html5的history模式，默认是hash模式，url地址栏会有#显示不好看
  mode: 'history',
  linkActiveClass:'active'
})

// vue-router的全局导航守卫
//点进beforeEach源码可以看到它括号里面的NavigationGuard是一个箭头函数，
// NavigationGuard有三个参数，to，from，next，
// 从from跳转到to，to是一个route对象
// next是一个函数，这个函数必须在NavigationGuard中被调用，这样路由才会跳转不然整个方法不起效果且报错
// 那么这里就可以指我们每一个routes，在每个映射关系表中添加meta元数据，增加么个页面的标题
// 这里注意Home路由拥有一个子路由，他的meta：title在总的matched第一个元素的meta里面
// 所以要拿到每一个title就需要这样写to.matched[0].meta.title
router.beforeEach((to,from,next) => {
  document.title = to.matched[0].meta.title
  // 打印一个to看看这个to里面有什么
  console.log(to);
  next()
})

//3.将router对象传入到Vue实例中
export default router
```

1. console.log(to)的结果如下meta：title是在matched[0]下面

2. matched: Array(2)

3. 1. 0:

   2. 1. beforeEnter: undefined
      2. components: {default: {…}}
      3. instances: {default: VueComponent}
      4. matchAs: undefined
      5. meta: {title: "首页"}
      6. name: undefined
      7. parent: undefined
      8. path: "/home"
      9. props: {}
      10. redirect: undefined
      11. regex: /^\/home(?:\/(?=$))?$/i

4. ### keep-alive和vue-router

5. keep-alive是vue中的一个内置组件，可以是被包含的组件保留状态或避免重新渲染

6. 当被保留了状态的时候有两个函数可以用

7. ```
   <!--    keep-alive时vue的一个内置组件，可以是被包含的组件保留状态，避免被重新渲染-->
   <!--    router-view如果直接包在keep-alive中时所有路径匹配到的视图组件都会被缓存-->
   <!--    当没有内容是router-view可以用单标签，更简洁-->
       <keep-alive>
         <router-view/>
       </keep-alive>
   ```

```
// 只有在使用了keep-alive页面被保留了状态这两个生命周期函数才有用
activated() {
  console.log('activated')
},
deactivated() {
  console.log('deactivated');
}
```

```
<!--    keep-alive中有两个属性include以及exclude前者表示包含的组件会被保留状态，-->
<!--    exclude='组件的name' 这里不能随便加空格，更正则匹配相关-->
<!--    表示Profiley以及User页面不会被保留状态会重新渲染-->
    <keep-alive exclude="Profile,User">
      <router-view/>
    </keep-alive>
```