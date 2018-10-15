<template>
    <div id="my">
        <ul class="myContent" slot="margin-top:0.8rem;">
            <li><span>手机号</span><p>{{VipMsg.Code}}</p></li>
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
    </div>
</template>
<script>
import Cookies from 'js-cookie'
    export default{
        data(){
            return{
                VipMsg:[]
            }
        },
        methods:{
            push(){
                this.$router.push('/change');
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
                        console.log(BirDate !== "undefined")
                        var regexp = /[0-9]*/g;
                        if(BirDate !== null && BirDate !== undefined){
                            var times = BirDate.match(regexp)[6];
                            var oDate = new Date();
                            oDate.setTime(times);
                            _this.VipMsg.DateOfBirth = _this.isDate_repalce(oDate)
                        }
                        
                    }
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
    .myContent,.myMessage{
        overflow: hidden;
        margin:0.4rem;
        background: #e9e9e9;
        border-radius: 0.2rem;
        padding: 0.2rem 0.2rem;
        background: rgba(103,160,100,0.5);
    }
    .myMessage{
        margin-top: 1rem !important;
    }
    .myContent li,.myMessage li{
        padding:0.2rem 0;
        overflow: hidden;
        height: 0.5rem;
        line-height: 0.5rem;
        border-bottom: 1px solid #ddd;
    }
    .myContent li span,.myMessage li span{
        float: left;
        width: 30%;
    }
    .myContent li p,.myMessage li p{
        padding-left:0.2rem; 
        text-align: left;
        float: right;
        width: 65%;
    }
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
</style>

