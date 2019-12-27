// 提供操作本地用户信息的工具函数
// 设置用户信息
// 获取用户信息
// 删除用户信息
// 示例代码
// sessionStorage.setItem('数据名称', '具体数据')
const KEY = 'hm-toutiao-pc-91-user'

export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 得到用户信息对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }

}
