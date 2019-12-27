<template>
  <el-container class="contain-home">
    <el-aside class="my-aside" :width="isOpen?'200px':'64px'">
        <!-- logo -->
        <div class="logo" :class="{minLogo:!isOpen}"></div>
        <!-- 菜单 -->
        <el-menu
        default-active="2"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
        >
        <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-setting"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="el-icon-setting"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
            <i class="el-icon-setting"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
        </el-menu-item>
        </el-menu>
    </el-aside>
    <el-container>
        <el-header>
            <span @click="toggleAside" class="icon el-icon-s-fold "></span>
            <span class="text">江西传智播客</span>
            <el-dropdown class="my-dropdown" @command="handler">
                <span class="el-dropdown-link">
                    <img :src="photo" alt="">
                    <span>{{name}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item> -->
                    <!-- <el-dropdown-item icon="el-icon-setting" @click.native="logout()">退出登录</el-dropdown-item> -->
                    <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-setting" command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <button onclick="alert()"></button> -->
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>

</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 是否是展开的，默认是展开的
      isOpen: true,
      // 用户名称
      name: '',
      // 用户头像
      photo: ''
    }
  },
  created () {
    // 从本地获取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleAside () {
      // 切换做菜单
      // 宽度 logo 导航菜单组件
      this.isOpen = !this.isOpen
    },
    // 1.使用组件注意，绑定原生事件的时候注意组件是否支持了这个事件
    // 2. 请参考element-ui的说明文档
    // 3. 但是他解析后的html元素时支持click事件的
    // 4.在绑定事件的时候 使用事件修饰符
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
    },
    handler (command) {
      // command 值setting logout
      // 如果是setting 跳转去个人设置
      // if(command==='setting')
      // if(command==='logout')
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.contain-home{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    .el-aside{
        background:#002030;
        .logo{
            width:100%;
            height:60px;
            background: #002244 url(../../assets/logo_admin.png) no-repeat center/140px;
        }
        // 要写在后面才能覆盖
        .minLogo{
            background-image: url(../../assets/logo_admin_01.png) ;
            background-size: 36px auto;
        }
        .el-menu{
            border-right: none;
        }
    }
    .el-header{
        border-bottom:1px solid #ddd;
        line-height: 60px;
        .icon{
            font-size: 24px;
            vertical-align: middle;
        }
        .text{
            font-size: 16px;
            vertical-align: middle;
        }
        .my-dropdown{
            float:right;
            img{
                width: 30px;
                height: 30px;
                margin-right:5px;
                vertical-align: middle;
                border-radius: 50%;
            }
            i{
                vertical-align: middle;
            }
        }
    }
}
</style>
