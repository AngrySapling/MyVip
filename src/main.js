// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.withCredentials=true;//跨域请求
Vue.prototype.axios = axios//vue使用axios;
Vue.config.productionTip = false

//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex);
var q3Url = "";
var webUrl = "";
if(process.env.NODE_ENV !== 'production'){//判断是否是生产模式
  // q3Url="http://test.bw168.net/";
  q3Url="http://zyy.bwsoft.net/zyywx"
  // q3Url="http://zyy.bw168.net/zyywx/"
  webUrl ="http://localhost:8080/#";
}else{
  var index=location.href.indexOf("/zyywx");
  q3Url=location.href.substring(0,index);
  webUrl=location.href;
}
const state = {
  url:q3Url+"/Rest.aspx",
  webUrl:webUrl
}
var store = new Vuex.Store({
  state
})
import {isDate_repalce} from './components/Common/common'
Vue.prototype.isDate_repalce = isDate_repalce;//获取时间格式
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
