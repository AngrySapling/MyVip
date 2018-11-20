import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Vuex from 'vuex'
Vue.use(Vuex)

//引入缓存
import Cookies from 'js-cookie'
import store from '../vuex/store';
const Index = r => require.ensure([], () => r(require('@/components/Index')), 'Index');//首页
const Loading = r => require.ensure([],()=> r(require('@/components/Loading')),'Loading');//加载页
const Register = r=> require.ensure([],()=> r(require('@/components/Register')),'Register');//绑定页
const Nav = r=> require.ensure([],()=>r(require('@/components/Nav')),'Nav');//Nav页
const Message  = r => require.ensure([],()=>r(require('@/components/Msg/message')),'Message');//个人信息
const Buyindent = r => require.ensure([],()=>r(require('@/components/Msg/buyindent')),'Buyindent');//我的订单
const ChangeMy = r => require.ensure([],()=>r(require('@/components/Msg/changeMy')),'ChangeMy');//信息修改


var router =  new Router({
    routes:[
        //首页
    {
        path:'/',
        component:Index
    },

    {
        path:'/loading',
        component:Loading,
    },
        //会员首页
    {
        path:'/index',
        component:Nav,
        meta:{
            requireAuth:true,//登录拦截
        },
        redirect:'/index/message',
        children:[{
            path:'message',
            component:Message,
            meta:{
                requireAuth:true,//登录拦截
            },
        },{
            path:'buyindent',
            component:Buyindent,
            meta:{
                requireAuth:true,//登录拦截
            },
        }]
    },
        //修改信息页面
    {
        path:'/index/change',
        component:ChangeMy,
        meta:{
            requireAuth:true,//登录拦截
        },
    },
        //注册登录页
    {
        path:'/register',
        component:Register,
        meta:{
            requireAuth:false,//登录拦截
        },
    }]
})
router.beforeEach((to, from, next) => {
    if(to.path === '/index/message'){
        store.state.pathID = 0
    }else if(to.path === '/index/buyindent'){
        store.state.pathID = 1
    }
    const openID = Cookies.get('OpenID');
    if (to.meta.requireAuth == true) {
        if(openID == null || openID == undefined) {
            router.push('/')
        }
    }
    next()
})
  
export default router