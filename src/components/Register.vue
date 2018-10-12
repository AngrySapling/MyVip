<template>
    <div id="register">
        <div class="reg_top">
            <span class="top_left"></span>
            <p>绑定会员</p>
        </div>
        <div class="phone">
            <p>手机绑定登录</p>
            <ul class="form">
                <li>
                    <span>手机号</span>
                    <input type="number" placeholder="请输入手机号" v-model="phone">
                </li>
            </ul>
        </div>
        <button class="reg_btn" @click="IsLogin()">绑定</button>
    </div>    
</template>
<script>
import Cookies from 'js-cookie'
export default {
    data(){
        return{
            phone:''
        }
    },
    methods:{
        IsLogin(){
            let openID = Cookies.get('OpenID');
            let phones = this.phone.toString()
            let url = this.$store.state.url;
            let params = JSON.stringify({
                "id":17,
                "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/MemberRpc/Bind",
                "params":[openID,phones]
            })
            this.axios.post(url,params).then(function(res){
                console.log(res);
            })
        }
    },
    mounted(){

    }
}
</script>
<style scoped>
    #register{
        list-style: none;
        height: 100vh;
        width: 100%;
    }
    #register .top_left{
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        top: 0.1rem;
        left: 0.2rem;
        background: url('../assets/back.png') no-repeat;
        background-size: 100%;
    }
    #register .reg_top{
        width: 100%;
        height: 0.8rem;
        font-size: 0.34rem;
        background: #ccc;
        line-height: 0.8rem;
        position: fixed;
        left: 0;
        top: 0;
    }
    #register .phone{
        padding: 0.8rem 0;
        overflow: hidden;
        text-align: left;
    }
    #register .phone p{
        font-size: 0.3rem;
        height: .6rem;
        line-height: .6rem;
        border-bottom: 1px solid #ccc;
        text-align: left;
        padding-left: 0.2rem;
        color: #8dcae9;
    }
    #register .phone .form{
        padding-top: 0.2rem;
    }
    #register .phone .form li{
        line-height: 0.6rem;
        height: 0.6rem;
        font-size: 0.32rem;
        width: 100%;
        margin-bottom: 0.4rem;
        overflow: hidden;
    }
    #register .phone .form li span{
        display: inline-block;
        width: 20%;
        text-align: center;
    }
    #register .phone .form li input{
        line-height: 0.58rem;
        width: 70%;
        outline: none;
        border: 1px solid #ccc;
        padding-left: 0.2rem;
    }
    #register .reg_btn{
        margin-top: .3rem;
        width: 60%;
        font-size: 0.3rem;
        background: darkgrey;
        height: .8rem;
        line-height: .8rem;
        outline: none;
        border: none;
        border-radius: 0.2rem;
    }
</style>


