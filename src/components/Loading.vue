<template>
    <div class="loading">
        <p class="text">正在进入,加载中......</p>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import { get } from 'http';
export default{
    data(){
        return{
            url:'',
        }
    },
    methods:{
        getCookie(){
            let openid = Cookies.get('OpenID');
            if(openid !== undefined){
                this.$router.push('/index/message');
            }else{
                this.$router.push('/');
            }
        }
    },
    mounted(){
        this.getCookie() 
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