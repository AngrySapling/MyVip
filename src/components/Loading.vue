<template>
    <div class="loading">
        <p class="text">正在进入,加载中......</p>
    </div>
</template>
<script>
// import {deleteItem,setItem,getItem} from '../components/Common/common.js'
import { get } from 'http';
export default{
    data(){
        return{
            url:'',
        }
    },
    methods:{
    //跳转
        Load(){
            let url = this.$store.state.url;
            let params = JSON.stringify({
                "id":14,
                "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/MemberRpc/Load",
                "params":[this.$store.state.webUrl+'']
            })
            axios.post(url,params).then(function(res){
                let url = res.result
                console.log(url);
                
            })
        },
    //会员验证
        IsVip(){
            let url = this.$store.state.url;
            let params = JSON.stringify({
                "id":14,
                "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/WeixinMPRpc/GetWeixinAuthUrl",
                "params":[this.$store.state.webUrl+'']
            })
            axios.post(url,params).then(function(res){
                let url = res.result
                console.log(url);
                
            })
        }
    },
    mounted(){
        // var redirect_url = location.href;
        // var index=redirect_url.lastIndexOf("?");
        // redirect_url=redirect_url.substring(index+1,redirect_url.length);//截取url地址中\?之前地址
        // var error = redirect_url.split("&");



        // //获取openid
        // let openID = getItem('openid');
        // if(openID !== "" || openID !== null){
        //     //会员验证
        //     IsVip()
        // }else{
        //     Load(openID)
        // }
        // //判断用户身份
        
        // this.url = error;
        // var err = error[0].split("=");//查看是否是跳转链接
        //    // 判断用户是否已经登录
        // this.jump(date);
    }
}    
</script>
<style>
    .loading{
        position: relative;
        width: 100%;
        height: 100vh;
    }
    .loading .text{
        width:100%;
        position: absolute;
        top: 50%;
        text-align: center;
        font-size: 0.3rem;
    }
</style>