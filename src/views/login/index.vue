<template>
  <div class="container-login">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            style="width:238px;margin-right:10px"
            v-model="loginForm.code"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已经阅读和同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '../../store/index.js'
export default {
  mounted () {
    // 生命周期钩子函数(当组件渲染完毕后执行)
    /* console.log(this.$refs)
    console.log(this.$refs.dom)
    console.log(this.$refs['com']) */
  },
  data () {
    // 校验手机号的函数
    const checkMobile = (rule, value, callback) => {
      // 自己的检验逻辑：必须1开头第二位3-9之间，9个数字结尾
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号错误，格式不对'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '15727309557',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { len: 6, message: '请输入6位密码', trigger: 'blur' }
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 先校验成功后再登录
      this.$refs.loginForm.validate(async (valid) => {
        // valid 判断是否检验成功
        console.log(valid)
        if (valid) {
          // 进行登录
          /* this.$http.post(
            'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            this.loginForm
          ).then(res => {
            // 登录成功
            // res是响应对象 res.data是响应主体
            // 直接跳转首页
            store.setUser(res.data.data)
            this.$router.push('/')
          }).catch(e => {
            // 登录失败
            // e错误对象
            // 提示：手机号或者验证码错误
            this.$message.error('手机号或者验证码错误!')
          }) */
          // 使用try{} catch(e){}可以捕获和处理异常
          // 当你有一段代码不能保证一定成功，你可以使用try来捕获这段代码的报错
          // 再就是使用catch 来处理这个报错
          try {
            const res = await this.$http.post('/authorizations', this.loginForm)
            store.setUser(res.data.data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或者验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
}
.my-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
}
</style>
