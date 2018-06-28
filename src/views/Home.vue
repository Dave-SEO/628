<template>
    <div class="pages">
        <el-col :span="24" class="container">
            <el-container style="height:100%" >
            <el-aside width="200px"  class="leftView">
                <div class="logo">
                    <img src="../assets/images/nav_logo.png" alt="">
                </div>
                <div class="userCenter">
                    <!-- <a href="javascript:;">
                        欢迎您,admin!
                    </a> -->
                    <el-dropdown trigger="click" placement='top-start' >
                        <span class="el-dropdown-link">
                            欢迎您admin！<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/UserCenter">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                            </router-link>
                            <el-dropdown-item>安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                     <!-- <i class="el-submenu__icon-arrow el-icon-arrow-down" style="color:#FF8893;top: 60%;right: 28px;"></i> -->
                </div>
                <el-menu  @open="handleOpen"  @close="handleClose" :router='true' default-active='/MeetingList' :unique-opened='true' text-color='#FF8893'  active-text-color='#ffff'>
                     <el-menu-item index="/MeetingList" class="lixing">
                        <i class="icon meeting_norma meeting_active"></i>
                        <span slot="title">例行会议</span>
                    </el-menu-item>

                    <el-submenu index="1">
                        <template slot="title" v-if="sign">
                            <div style="padding-left:21px;">
                                <i class="icon  nav_icon_control_pressed "></i>
                                <span class="sign">站点管理</span>
                            </div>
                        </template>
                        <el-menu-item index="/PeopleManagement" class="renyuanguanli">
                            <i class="icon meeting_norma meeting_active"></i>
                            <span slot="title">人员管理</span>
                        </el-menu-item>

                        <el-submenu index="1-4" class="fenzu">
                            <template slot="title">
                                <i class="icon  nav_icon_group_active "></i>
                                <span class="sign">分组管理</span>
                            </template>
                            <el-menu-item index="/GroupManagement">
                                <i class="icon meeting_norma meeting_active"></i>
                                <span slot="title">组管理</span>
                            </el-menu-item>
                            <el-menu-item index="/Member">
                                <i class="icon meeting_norma meeting_active"></i>
                                <span slot="title">组成员管理</span>
                            </el-menu-item>
                        </el-submenu>

                        <el-menu-item index="/MeetingManagement" class="huiyishiguanli">
                            <i class="icon  nav_icon_mg_normal"></i>
                            <span slot="title">例行会议室管理</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
           <el-container class="sub-container">
               <router-view style="width:100%"></router-view>
           </el-container>
        </el-container>
        </el-col>
    </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      sign: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      let name = window.localStorage.getItem('room')
      if (name === 'admin') {
        this.sign = true
      } else {
        this.sign = false
      }
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang='less' >
.pages /deep/ .container,
.pages /deep/ .section {
  height: 100%;
}
.pages /deep/ .el-submenu .el-submenu__icon-arrow{
    // display: none;
    color:#fff;
}
.pages /deep/.el-menu{border:none;background: none;text-align: center;font-size: 16px;}
.pages /deep/ .el-menu-item{
    font-size: 16px;
}
.pages /deep/ .el-menu-item:focus, .pages /deep/ .el-menu-item:hover,.pages /deep/ .el-submenu__title:hover {
    outline: 0;
    background-color: #690C14;
}
.pages /deep/.el-dropdown{
    width: 146px;
    height: 26px;
    line-height: 26px;
    color: #fff;
    border-radius: 2px;
}
.pages /deep/.el-dropdown:hover{
    font-size: 14px;
    color: #FF8893;
    cursor: pointer;
    background: #690C14;
}
.pages /deep/.el-dropdown-menu{
    left:43px !important;
}
.pages /deep/ .fenzu{
         .el-submenu__title{
            color: #fff !important;
            font-size: 15px;
        }
    }
.pages /deep/ .lixing{
    padding-left: 40px !important;
}
.pages /deep/ .el-menu-item{
    text-align: left;
}
.pages /deep/ .el-submenu{

    text-align: left !important;
}
.leftView{
    background: url('../assets/images/nav_bg.png') no-repeat;
    background-size: 100% 100%;
}
.pages /deep/.el-header, .pages /deep/.el-footer {
    background-color: rgb(194, 195, 197);
    color: #333;
    line-height: 60px;
}
.pages /deep/ .sub-container{
    padding-left:30px;
}
.pages{
    background:#F5F2EF;
    height: 100%;
    .sign{
        font-size: 16px;
        color: #fff;
    }
    .renyuanguanli,.huiyishiguanli{
        span{
            font-size: 15px;
        }
    }

    .leftView{
          .is-active{
               .icon.meeting_active{
                   background: url('../assets/images/meeting_active.png') no-repeat !important;
                   background-size: 100% 100%;
               }
                .icon.nav_icon_control_normal{
                   background: url('../assets/images/nav_icon_control_normal.png') no-repeat !important;
                   background-size: 100% 100%;
               }
           }
        .icon{
           display: inline-block;
           width: 20px;
           height: 18px;
           &.meeting_norma{
               background: url('../assets/images/meeting_norma.png') no-repeat;
               background-size: 100% 100%;
           }
            &.nav_icon_control_pressed{
               background: url('../assets/images/nav_icon_control_pressed.png') no-repeat;
               background-size: 100% 100%;
           }
            &.nav_icon_group_active{
               background: url('../assets/images/nav_icon_group_active.png') no-repeat;
               background-size: 100% 100%;
           }
            &.nav_icon_mg_normal{
               background: url('../assets/images/nav_icon_mg_normal.png') no-repeat;
               background-size: 100% 100%;
           }
        }
    }
    .logo{
      margin-top:22px;
      text-align: center;
    }
    .userCenter{
        text-align: center;
        position: relative;
        margin-top:42px;
        margin-bottom: 15px;
        a{
            margin-top:4px;
            font-size: 14px;
            color: #FF8893;
            letter-spacing: -0.1px;
            text-align: center;
        }
    }
}
.fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
