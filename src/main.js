// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.withCredentials=true;//跨域请求
Vue.prototype.axios = axios//vue使用axios;
Vue.config.productionTip = false

import store from './vuex/store'

import {isDate_repalce} from './components/Common/common'
Vue.prototype.isDate_repalce = isDate_repalce;//获取时间格式
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})
