<template>
<div id="mychange">
    <ul>
        <li>
            <p class="weui-cell__hd">姓名</p>
			<input class="inp" type="text" placeholder="请输入名字"/>
        </li>
        <li>
            <p class="weui-cell__hd">性别</p>
            <div class="inp">
                <input  type="radio" name="sex" value='male'/>男
			    <input style="margin-left:0.2rem;"  name="sex" checked type="radio" value="female"/>女
            </div>
			
        </li>
        <li>
            <p class="weui-cell__hd">出生日期</p>
			<input class="inp" type="number" placeholder="出生日期格式:20180909"/>
        </li>
        <li>
            <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
        </li>
    </ul>
    <div class="btn">
        <button disabled="disabled" style="float:left;">保存</button>
        <button disabled="disabled" style="float:right;">取消</button>
    </div>
</div>
    
</template>
<script>
import { XInput, XAddress,ChinaAddressData } from 'vux'
//  import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch } from 'vux'
    export default{
        components:{
            XInput,
            XAddress,
        },
        data(){
            return{
                addressData: ChinaAddressData,
                addressValue: ['北京市', '市辖区', '东城区'],
            }
        }
    }
</script>
<style >
    #mychange{
        font-size: 0.3rem;
        padding:0 0.4rem;
        height: 100vh;
        overflow: hidden;
    }
    #mychange ul{
        margin-top: 0.5rem;
        background: rgba(103,160,100,0.4);
        border-radius: 0.2rem;
    }
    #mychange li{
        overflow: hidden;
        padding: 0.2rem;
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

