export default {
  template: `      
      <div>
        <h2>{{message}}</h2>
        <button @click="btnClick">按钮</button>
      </div>
  `,
  data(){
    return {
      message: 'Hello,World!'
    }
  },
  methods: {
    btnClick(){
      console.log('我被点了就显示');
    }
  }

}
