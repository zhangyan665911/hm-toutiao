// 提供一个配置好的axios然后导出给main.js使用
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 1.默认配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.interceptors.request.use(config => {
  // 修改配置  加token
  config.headers.Authorization = 'Bearer ' + store.getUser().token
  return config
}, (err) => {
  return Promise.reject(err)
})
// 请求拦截器（在每一次请求前）
axios.interceptors.response.use(res => res, err => {
  // 自己逻辑
  // 1. 获取状态码
  const status = err.response.status
  // 2. 判断401
  if (status === 401) {
    // 3. 清除无效token
    store.delUser()
    // 4. 跳转登录
    // 4.1 原生方式改路径  router基于hash实现  /login ===> #/login
    // window.location.hash = '#/login'
    // 4.2 使用router进行跳转  $router本质 main.js导入了router/index.js的实例 挂载vue根实例下。
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
