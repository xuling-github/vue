<template>
    <div>
        <h2>我是Cpn组件哈哈哈哈</h2>
        <p>{{name}}</p>
      </div>
</template>

<script>
    export default {
        name: "Cpn",
        data(){
    return {
      name: '我是Cpn组件的name'
    }
  },
  methods: {
    btnClick(){
      console.log('我被点了就显示');
    }
  }
    };
</script>
<style scoped>

</style>