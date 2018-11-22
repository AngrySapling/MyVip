<template>
    <div id="my">
        <ul class="myContent" slot="margin-top:0.8rem;">
            <li><span>手机号</span><p class="p1">{{VipMsg.Code}}</p><p style="float:right;background:#eee;width:20%;" @click="bindTitle()">解除绑定</p></li>
            <li><span>会员积分</span><p>{{VipMsg.Point}}</p></li>
            <li><span>所属门店</span><p>{{VipMsg.Customer_Name}}</p></li>
        </ul>
        <ul class="myMessage">
            <li>
                <span>姓名</span>
                <p style="width:30%;float:left;">{{VipMsg.Name}}</p>
                <button @click="push()" >完善信息</button>
            </li>
            <li><span>性别</span><p>{{VipMsg.Gender}}</p></li>
            <li><span>生日</span><p>{{VipMsg.DateOfBirth}}</p></li>
            <li><span>地区</span><p>{{VipMsg.Source}}</p></li>
        </ul>
        <div v-transfer-dom>
            <alert v-model="show" :title="title" > {{Message}}</alert>
        </div>
        <div v-transfer-dom>
            <confirm v-model="show1"
            :title="title"
            @on-confirm="onConfirm">
                <p style="text-align:center;">{{msg}}</p>
            </confirm>
        </div>
    </div>
</template>
<script>
import {Alert,Confirm} from 'vux'
import Cookies from 'js-cookie'
    export default{
        components:{
            Alert,
            Confirm
        },
        data(){
            return{
                msg:"确认解除绑定",
                VipMsg:[],
                title:"提示",
                Message:"",
                show:false,//弹框提示
                show1:false,//解绑确认
            }
        },
        methods:{
            onConfirm (msg) {
                this.unBind();
            },
            push(){
                this.$router.push('/index/change');
            },
            getMessage(){
                let openID = Cookies.get('OpenID');
                let _this = this
                let url = this.$store.state.url;
                let params = JSON.stringify({
                    "id":14,
                    "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/MemberRpc/Load",
                    "params":[openID]
                })
                this.axios.post(url,params).then(function(res){
                    let data = res.data;
                    if(data.error){
                        _this.$router.push('/register')
                    }else{
                        _this.VipMsg = data.result;
                        let BirDate = _this.VipMsg.DateOfBirth
                        var regexp = /[0-9]*/g;
                        if(BirDate !== null && BirDate !== undefined){
                            var times = BirDate.match(regexp)[6];
                            var oDate = new Date();
                            oDate.setTime(times);
                            _this.VipMsg.DateOfBirth = _this.isDate_repalce(oDate)
                        }
                        
                    }
                })
            },
            bindTitle(){
                this.show1 = true;
            },
            unBind(){
                let openID = Cookies.get('OpenID');
                let url = this.$store.state.url;
                var _this = this
                let params = JSON.stringify({
                    "id":14,
                    "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/MemberRpc/UnBind",
                    "params":[openID]
                })
                this.axios.post(url,params).then(function(res){
                    let data = res.data;
                    if(data.error){
                        _this.show = true;
                        _this.Message = data.error.message;
                        return;
                    }
                    console.log(data)
                    Cookies.remove('OpenID');
                    _this.show = true;
                    _this.Message = "解绑成功";
                    _this.$router.push("/");
                })
            }
        },
        mounted() {
            this.getMessage()
        },
    }
</script>
<style scoped>
    #my{
        font-size: 0.28rem;
        height: 100vh;
        overflow: hidden;
    }
    #my li{
        border-bottom: 1px solid #cccccc;
    }
    .myContent,.myMessage{
        overflow: hidden;
        margin:0.4rem;
        border-radius: 0.2rem;
        padding: 0.2rem 0.2rem;
        background:#ffffff;
        border:2px solid #ffffff;
    }
    .myMessage{
        margin-top: 1rem !important;
    }
    .myContent li,.myMessage li{
        padding:0.2rem 0;
        overflow: hidden;
        height: 0.5rem;
        line-height: 0.5rem;
        border-bottom: 2px solid #ffffff;
    }
    .myContent li span,.myMessage li span{
        float: left;
        width: 30%;
    }
    .myContent li p,.myMessage li .p1{
        padding-left:0.2rem; 
        text-align: left;
        float: left;
        width: 40%;
    }
    .myMessage p{
        padding-left:0.2rem; 
        text-align: left;
        float: right;
        width: 65%;
    };
    #my button{
        border: 1px solid #000;
        border-radius: 0.2rem;
        height:0.5rem;
        padding:0 0.2rem;
        line-height:0.5rem;
        outline:none;
        float:right;
        background: none;
        font-size: 0.28rem;
    }
    #my .weui-dialog__bd {
        line-height: 40px !important;
    }
</style>

