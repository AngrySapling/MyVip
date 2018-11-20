<template>
<div style="height: 100vh;background:#e4e7ee;">
    <x-header :left-options="{backText: ''}" style="background:#439057;">会员信息修改</x-header>
    <div id="mychange">
        
        <ul>
            <li>
                <p class="weui-cell__hd">姓名</p>
                <input class="inp" type="text" placeholder="请输入名字" v-model="VipMsg.Name"/>
            </li>
            <li>
                <p class="weui-cell__hd">性别</p>
                <div class="inp">
                    <input  type="radio" name="sex"  value="男" v-model="VipMsg.Gender"/> 男
                    <input style="margin-left:0.2rem;"  name="sex" value="女" type="radio" v-model="VipMsg.Gender"/> 女
                </div>
                
            </li>
            <li>
                <p class="weui-cell__hd">出生日期</p>
                <x-button @click.native="showPopup = true" type="primary" > {{birthDay}} </x-button>
            </li>
            <li>
                <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left" ></x-address>
            </li>
        </ul>
        <div class="btn">
            <button  style="float:left;" @click="upDate()">保存</button>
            <button  style="float:right;">取消</button>
        </div>
        <div v-transfer-dom>
        <popup v-model="showPopup">
            <datetime-view v-model="birthDay" start-date="1901-01-01" end-date="2100-01-01"></datetime-view>
        </popup>
        </div>
    </div>
    <div v-transfer-dom>
      <alert v-model="show" :title="title" > {{Message}}</alert>
    </div>
</div>

    
</template>
<script>
import { XInput, XAddress,ChinaAddressData,DatetimeView, XButton, Popup, TransferDom ,XHeader,Alert} from 'vux'
import Cookies from 'js-cookie'
export default{
    components:{
        XHeader,
        XInput,
        XAddress,
        DatetimeView,
        XButton,
        Popup,
        Alert,
    },
    directives: {
        TransferDom
    },
    data(){
        return{
            title:"提示",
            birthDay:'',
            addressData: ChinaAddressData,
            addressValue: ['北京市', '市辖区', '东城区'],
            showPopup: false,
            VipMsg:{},
            Message:"",
            show:false,
        }
    },
    methods:{
        upDate(){
            this.changeMessage();
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
                    let Address =  _this.VipMsg.Source;
                    let BirDate = _this.VipMsg.DateOfBirth
                    var regexp = /[0-9]*/g;
                    //地址转变
                    if(Address !== null && Address !== undefined){
                        Address = Address.split(" ");
                        _this.addressValue = Address
                    }
                    //日期转变
                    if(BirDate !== null && BirDate !== undefined){
                        var times = BirDate.match(regexp)[6];
                        var oDate = new Date();
                        oDate.setTime(times);
                        _this.birthDay = _this.isDate_repalce(oDate)
                    } else{
                        this.getDate();
                    }
                }
            })
        },
        changeMessage(){
            //地址转变
            var adr1,adr2,adr3;
            this.addressData.forEach((res)=>{
                if(res.value === this.addressValue[0]){
                    adr1 = res.name;
                }
                if(res.value === this.addressValue[1]){
                    adr2 = res.name;
                }
                if(res.value === this.addressValue[2]){
                    adr3 = res.name;
                }
            })
            this.VipMsg.Source =adr1+" "+adr2+" "+adr3;
            //日期转变
            var date = new Date(this.birthDay);
            var times = Date.parse(date);
            this.VipMsg.DateOfBirth = "/Date("+times+" 0800)/";
            let url = this.$store.state.url;
            
            let data = this.VipMsg;
            var _this= this;
            let params = JSON.stringify({
                "id":14,
                "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/MemberRpc/Update",
                "params":[data]
            })
            this.axios.post(url,params).then(function(res){
                let data = res.data;
                if(data.error){
                    _this.show = true;
                    _this.Message = data.error.message;
                    return;
                }
                _this.show = true;
                _this.Message = "信息修改成功";
            })
        },
        getDate(){
            var oDate = new Date();
            this.birthDay = this.isDate_repalce(oDate).toString();
        }
    },
    created(){
        this.getMessage();
    }
}
</script>
<style >
    #mychange{
        font-size: 0.3rem;
        overflow: hidden;
        padding:0 0.4rem;
        height: 100vh;
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
    #mychange .inp input{
        vertical-align:middle;
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

