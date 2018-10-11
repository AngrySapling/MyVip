import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Vuex from 'vuex'
Vue.use(Vuex)

//引入缓存
// import { getItem } from '../../components/Common/common'

var router =  new Router({
    routes:[
        //首页
    {
        path:'/',
        component:resolve=>require(['@/components/Index'],resolve),
        redirect:'/loading',
    },

    {
        path:'/loading',
        component:resolve=>require(['@/components/Loading'],resolve),
    },
        //会员首页
    {
        path:'/index',
        component:resolve=>require(['@/components/Nav'],resolve),
        redirect:'/register',
        children:[{
            path:'/message',
            component:resolve=>require(['@/components/Msg/message'],resolve),
            meta:{
                requireAuth:true,//登录拦截
            },
        },{
            path:'/buyindent',
            component:resolve=>require(['@/components/Msg/buyindent'],resolve),
            meta:{
                requireAuth:true,//登录拦截
            },
        },{
            path:'/change',
            component:resolve=>require(['@/components/Msg/changeMy'],resolve),
            meta:{
                requireAuth:true,//登录拦截
            },
        }]
    },
        //注册登录页
    {
        path:'/register',
        component:resolve=>require(['@/components/Register'],resolve),
        meta:{
            requireAuth:false,//登录拦截
        },
    }]
})
// router.beforeEach((to, from, next) => {
//     const openID = getItem('openids')
//     if (to.meta.requireAuth !== true) {
//         if (openID) {
//             router.push('register')
//         }
//     }
//     next()
// })
  
export default router