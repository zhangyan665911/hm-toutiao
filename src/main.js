import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from '@/api'
// index.js index.vue index.json支持三种格式，并且优先级和我书写顺序一致
// import router from '@router
// vue-cli 提供的是一个绝对路径别名，是src的绝对路径
Vue.use(ElementUI)
// axios不是他的插件，要挂载在原型上
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
