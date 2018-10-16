<template>
<div id="mychange">
    <ul>
        <li>
            <p class="weui-cell__hd">姓名</p>
			<input class="inp" type="text" placeholder="请输入名字" v-model="name"/>
        </li>
        <li>
            <p class="weui-cell__hd">性别</p>
            <div class="inp">
                <input  type="radio" name="sex"  value="男" v-model="sex"/>男
			    <input style="margin-left:0.2rem;"  name="sex" value="女" type="radio" v-model="sex"/>女
            </div>
			
        </li>
        <li>
            <p class="weui-cell__hd">出生日期</p>
            <x-button @click.native="showPopup = true" type="primary" > {{value2}} </x-button>
        </li>
        <li>
            <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
        </li>
    </ul>
    <div class="btn">
        <button  style="float:left;" @click="upDate()">保存</button>
        <button  style="float:right;">取消</button>
    </div>
    <div v-transfer-dom>
      <popup v-model="showPopup">
        <datetime-view v-model="value2" start-date="1901-01-01" end-date="2100-01-01"></datetime-view>
      </popup>
    </div>
</div>
    
</template>
<script>
import { XInput, XAddress,ChinaAddressData,DatetimeView, XButton, Popup, TransferDom } from 'vux'
import Cookies from 'js-cookie'
    export default{
        components:{
            XInput,
            XAddress,
            DatetimeView,
            XButton,
            Popup
        },
        directives: {
            TransferDom
        },
        data(){
            return{
                name:'',
                sex:'男',
                birthDay:'',
                addressData: ChinaAddressData,
                addressValue: ['北京市', '市辖区', '东城区'],
                value2: '',
                showPopup: false,
            }
        },
        methods:{
            upDate(){
                console.log(this.sex,3333)
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
            getDate(){
                var oDate = new Date()
                this.value2 = this.isDate_repalce(oDate).toString();
            }
        },
        created(){
            this.getMessage()
            this.getDate()
        }
    }
</script>
<style >
    #mychange{
        font-size: 0.3rem;
        padding:0 0.4rem;
        height: 100vh;
        overflow: hidden;
        background: #e4e7ee;
    }
    #mychange ul{
        margin-top: 0.5rem;
        background:#fff;
        border-radius: 0.2rem;
    }
    #mychange li{
        overflow: hidden;
        padding: 0.2rem;
    }
    #mychange .weui-btn{
        float: left;
        width: 65%;
        padding-left: 0.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        outline: none;
        border: none;
        text-align: left;
        font-size: 0.28rem;
        background: #fff;
        color: initial;
        border: none;
    }
    #mychange .weui-cell__hd{
        width: 30% !important;
        float: left;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    #mychange .inp,.vux-cell-primary{
        float: left;
        width: 65%;
        padding-left: 0.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        outline: none;
        border: none;
        text-align: left;
        font-size: 0.28rem;
    }
    .vux-cell-primary{
        padding-left: 0.2rem !important;
        background: #fff  !important;
        flex: none;
    }
    .weui-cell{
        padding: 0.2rem 0 !important;

    }
    .weui-cell__hd{
        width: 30% !important;
        text-align: center;
    }
    .weui-cell__ft{
        display: none;
    }
    .btn{
        margin-top: 3rem;
        padding: 0 .4rem;
        overflow: hidden;
    }
    .btn button{
        width: 40%;
        padding: 0.14rem 0;
        outline: none;
        border: 1px solid #ddd;
        border-radius: 0.1rem;
        color: #000;
        font-weight: bold;
        background: rgba(103,160,100,0.5);
    }
</style>

