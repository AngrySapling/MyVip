//引入vuex
import Vue from 'vue'
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
  href:q3Url,
  webUrl:webUrl,
  pathID:1,
}
export default new Vuex.Store({
  state
})