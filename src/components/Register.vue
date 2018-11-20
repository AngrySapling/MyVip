<template>
    <div id="register">
        <div class="reg_top">
            <span class="top_left" @click="back()"></span>
            <p style="color:#fff;">绑定会员</p>
        </div>
        <div class="phone">
            <p>手机绑定登录</p>
            <ul class="form">
                <li>
                    <span>手机号</span>
                    <input type="number" placeholder="请输入手机号" v-model.trim="phone">
                </li>
            </ul>
        </div>
        <button class="reg_btn" @click="IsLogin()">绑定</button>
        <div v-transfer-dom>
            <alert v-model="show" :title="title" > {{values}}</alert>
        </div>
    </div>    
</template>
<script scope>
import { AlertModule, Alert, TransferDomDirective as TransferDom } from 'vux'
import Cookies from 'js-cookie'
export default {
    directives: {
        TransferDom
    },
    components: {
        Alert,
    },
    data(){
        return{
            title:"提示",
            phone:'',
            show: false,
            values:'',
        }
    },
    methods:{
        back(){
            this.$router.push('/')
        },
        IsLogin(){
            let openID = Cookies.get('OpenID');
            let phones = this.phone.toString();
            let _this = this;
            let url = this.$store.state.url;
            //手机号正则
            var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (!phoneReg.test(this.phone)) {
                this.show = true;
                this.values = "请输入正确手机号";
                return false;
            }
            let params = JSON.stringify({
                "id":17,
                "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/MemberRpc/Bind",
                "params":[openID,phones]
            })
            this.axios.post(url,params).then(function(res){
                let data = res.data;
                if(data.error){
                    _this.show = true;
                    _this.values = "该微信号已绑定会员";
                }else{
                    _this.$router.push('/');
                }
            })
        }
    },
}
</script>
<style>
    #register{
        list-style: none;
        height: 100vh;
        width: 100%;
    }
    #register .top_left{
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        top: 0.05rem;
        left: 0.2rem;
        background: url('../assets/back.png') no-repeat;
        background-size: 100%;
    }
    #register .reg_top{
        width: 100%;
        height: 0.7rem;
        font-size: 0.34rem;
        background: #4fb136;
        line-height: 0.7rem;
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
        color: #4fb136;
    }
    #register .phone .form{
        padding-top: 0.2rem;
    }
    #register .phone .form li{
        line-height: 0.6rem;
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
        border-radius: 0.1rem;
        line-height: 0.58rem;
        width: 70%;
        outline: none;
        border: 1px solid #ccc;
        padding-left: 0.2rem;
    }
    #register .reg_btn{
        margin-top: .3rem;
        width: 70%;
        font-size: 0.3rem;
        background: #4fb136;
        height: .6rem;
        line-height: .6rem;
        outline: none;
        border: none;
        color: #fff;
        border-radius: 0.2rem;
    }
    .weui-dialog__hd{
        padding:15px 0 !important;
    }
    .weui-dialog__bd {
        line-height: 40px !important;
    }
    .weui-dialog__title {
        display: block;
    }
</style>


