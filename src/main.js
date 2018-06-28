// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/zTreeStyle/zTreeStyle.css'
import '@/assets/css/zTreeStyle.css'
import '@/assets/js/jquery-1.4.4.min.js'
import '@/assets/js/jquery.ztree.core.min.js'
import '@/assets/js/jquery.ztree.excheck.min.js'
import '@/assets/js/jquery.ztree.exedit.min.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

// var sitUrl = document.querySelector('meta[name="server-name"]').getAttribute('content')
// axios.defaults.baseURL = 'http://192.168.20.217:86'// 设置axios的默认访问地址
axios.defaults.timeout = 1000 * 10
Vue.prototype.$http = axios// 全局注册$http属性，在子组件中可以通过this.$http来进行axios通信
Vue.prototype.$token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')// 全局注册$token，在组件可以使用this.$token获取token值
Vue.prototype.$global = {
  userName: null
}
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('room')) {
    if (to.path === '/') {
      next()
      // checkLogin(next, null, '/MeetingList')
    } else {
      next({
        path: '/'
      })
    }
  } else {
    if (to.path === '/') {
      next({
        path: '/MeetingList'
      })
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
