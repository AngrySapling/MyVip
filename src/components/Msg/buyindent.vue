<template>
    <div id="buyindent">
        <scroller height="100%" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
            <ul class="box2 myorder" style="position:relative;">
                    <li v-for="(item,index) in orderList" :key="index">
                        <div class="form1">
                            <span class="sp1">单号</span>
                            <span>{{item.Member_ID}}</span>
                        </div>
                        <div class="form2">
                            <span class="sp1">交易门店</span>
                            <span style="overflow:hidden;width:2.8rem;white-space:nowrap;text-overflow:ellipsis;">{{item.Customer_Name}}</span>
                        </div>
                        <div class="form1">
                            <span class="sp1">金额</span><span>¥{{item.Money}}</span>
                        </div>
                        <div class="form2">
                            <span class="sp1">交易日期</span>
                            <span>{{item.Time}}</span>
                        </div>
                        <div class="form">
                            <div class="invoice">
                                <span>开票状态</span>
                                <span>未开票</span>
                            </div>
                            <div class="invoice" style="text-align:right;">
                                <span class="playinvoice" :class="{isinvoice:isInvoice}" @click="playinvoice()">申请开票</span>
                            </div>
                        </div>
                    </li>
                    <li v-if="orderList.length === 0" style="font-size:0.36rem;height:0.8rem;line-height:0.8rem;">暂无任何订单....</li>
                    <load-more :show-loading="false" :tip="'暂无更多数据'" background-color="#fbf9fe" v-if="orderList.length !== 0"></load-more>
                <load-more tip="loading" v-if="isShow"></load-more>
            </ul>
        </scroller>
    </div>
    
</template>
<script>
import Cookies from 'js-cookie'
import { XInput,Scroller,LoadMore } from 'vux'
    export default{
        components: {
            XInput,
            Scroller,
            LoadMore
        },
        data(){
            return{
                orderList:[],
                count:10,
                PageIndex:0,
                onFetching:false,
                isShow:false,
                isInvoice:true,
            }
        },
        methods:{
            playinvoice(){
                if(this.isInvoice){
                    let url = this.$store.state.href;
                    window.location.href =url+'/zyywx/invoice.html';
                }
            },
            onScrollBottom () {
                if (this.onFetching) {
                    // do nothing
                } else {
                    this.onFetching = true
                    this.PageIndex++
                    this.isShow = true;
                    console.log(this.PageIndex,"Page")
                    this.getMessage(this.PageIndex)
                }
            },
            getMessage(PageIndex){
                this.isShow = true;
                let openID = Cookies.get('OpenID');
                let url = this.$store.state.url;
                let params = JSON.stringify({
                    "id":14,
                    "method":"/MainSystem/Q3ZhangYiYuan/Rpcs/MemberRpc/GetRetailRecords",
                    "params":[{
                        "OpenID":openID,
                        "SelectColumns":["Member_ID","Customer_Name","Customer_ID","Money","Time"], 
                        "SortExpression":"Member_ID", 
                        "PageSize":this.count, 
                        "PageIndex":this.PageIndex, 
                    }]
                })
                //api
                this.GetAxios(url,params,this,PageIndex)
            },
            //获取订单信息
            GetAxios(url,params,_this,PageIndex){
                this.axios.post(url,params).then(function(res){
                    if(res.data.error){
                        _this.isShow = false;
                        return
                    }
                    let data = res.data.result.Data.rows;
                    if(data !== undefined){
                        data.forEach((res)=>{
                            var regexp = /[0-9]*/g;
                            if(res[4] !== null){
                                var times = res[4].match(regexp)[6];
                            }
                            var oDate = new Date();
                            oDate.setTime(times);
                            res[4] = _this.isDate_repalce(oDate);
                            _this.orderList.push({
                                "Member_ID":res[0],
                                "Customer_Name":res[1],
                                "Customer_ID":res[2],
                                "Money":res[3],
                                "Time":res[4]
                            })
                        })
                        if(PageIndex !== 0 && data.length === _this.count ){
                            this.isShow = false;
                            _this.$nextTick(() => {
                                _this.$refs.scrollerBottom.reset()
                            })
                            _this.onFetching = false
                        }else{
                            _this.isShow = false;
                        }
                    }else{
                        _this.isShow = false;
                    }
                })
            }
        },
        mounted(){
            this.getMessage(0)
        }
    }
</script>

<style>
    #buyindent{
        height: calc(100vh - 50px) !important;
    }
    .myorder{
        padding: 0.4rem  0.4rem 0;
    }
    .myorder li{
        list-style: none;
        padding: 0.2rem 0;
        margin-bottom: 0.2rem;
        /* background: rgba(103,160,100,0.5); */
        background: #fff;
        overflow: hidden;
        border-radius: 0.2rem;
    }
    .myorder li div{
        font-size: 0.28rem;
        padding: 0.1rem 0;
        float: left;
        text-align: left;
    }
    .myorder li .form{
        width: 100%;
        display: flex;
    }
    .myorder li  .form .invoice{
        flex: 1;
        padding:0 0.15rem;

    }
    .myorder li  .form .invoice .playinvoice{
        padding: 0 0.2rem;
        background: #ccc;
        border-radius: 0.2rem;
    }
    .myorder li .form1{
        width: 35%;
    }
    .myorder li .form2{
        width: 65%;
    }
    .myorder li .form2 span{
        float:left;
    }
    .myorder li div span{
        display: inline-block;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    .myorder li div .sp1{
        padding: 0 0.15rem;
    }
    .myorder li div span:nth-child(2n){
        text-align: left !important;
    }
    .noneList{
        position:absolute;
        top:50%;
        margin-top:-0.5rem;
        height:1rem;
        line-height:1rem;
        width:80%;
        margin:0 auto;
        font-size:0.3rem;
    }
    .isinvoice{
        background: #439057 !important;
    }
</style>