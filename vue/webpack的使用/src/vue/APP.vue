<template>
    <div>
        <h2 class="title">{{message}}</h2>
        <button @click="btnClick">按钮</button>
        <Cpn/>
      </div>
</template>

<script>
  import Cpn from './Cpn.vue'
    export default {
        name: "App",
        data(){
          return {
            message: 'Hello,World!'
          }
          },
        components: {
          Cpn
        },

        methods: {
          btnClick(){
            console.log('我被点了就显示');
          }
        }
    };
</script>
<style scoped>
    .title{
        color: green;
    }
</style>