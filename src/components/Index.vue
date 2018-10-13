<template>
    <router-view></router-view>
</template>
<script>
import Cookies from 'js-cookie'
export default{
    data(){
        return{
        }
    },
    methods:{
        //会员验证
        IsVip(){
            console.log(this.$store.state.webUrl)
            let url = this.$store.state.url;
            let params = JSON.stringify({
                "id":14,
                "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/WeixinMPRpc/GetWeixinAuthUrl",
                "params":[this.$store.state.webUrl+'loading',]
            })
            this.axios.post(url,params).then(function(res){
                let url = res.data.result
                let openid = Cookies.get('OpenID');
                window.location.href=url;//跳转到验证登录链接
            })
        }
    },
    mounted(){
        console.log(666,6666666)
        let openid = Cookies.get('OpenID');
        if(openid !== undefined){
            this.$router.push('/message')
        }else{
            this.IsVip()
        }
        
    },
}
</script>
<style>
</style>

