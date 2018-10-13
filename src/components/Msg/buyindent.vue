<template>
    <scroller lock-x height="100vh" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <ul class="box2 myorder">
                <li v-for="(item,index) in orderList" :key="index">
                <div><span>单号</span><span>{{item.Member_ID}}</span></div>
                <div><span>交易门店</span><span>{{item.Customer_Name}}</span></div>
                <div><span>金额</span><span>¥{{item.Money}}</span></div>
                <div><span>交易日期</span><span>{{item.Time}}</span></div>
                </li>
                <li style="height:50px;margin:0;padding:0;background:none;"></li>
            <load-more tip="loading"></load-more>
        </ul>
    </scroller>
</template>
<script>
import Cookies from 'js-cookie'
import { XInput,Scroller } from 'vux'
    export default{
        components: {
            XInput,
            Scroller
        },
        data(){
            return{
                orderList:[],
                count:10,
                PageIndex:0,
                onFetching:false,
            }
        },
        methods:{
            onScrollBottom () {
                if (this.onFetching) {
                    // do nothing
                } else {
                    this.onFetching = true
                    this.PageIndex++
                    console.log(this.PageIndex,"Page")
                    this.getMessage(this.PageIndex)
                }
            },
            getMessage(PageIndex){
                let openID = Cookies.get('OpenID');
                let _this = this
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
                this.axios.post(url,params).then(function(res){
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
                        if(PageIndex !== 0 || data.length === _this.count ){
                            _this.$nextTick(() => {
                                _this.$refs.scrollerBottom.reset()
                            })
                            _this.onFetching = false
                        }
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
    .myorder{
        padding: 0.4rem  0.4rem 0;
    }
    .myorder li{
        list-style: none;
        padding: 0.2rem 0;
        margin-bottom: 0.2rem;
        background: rgba(103,160,100,0.5);
        overflow: hidden;
        border-radius: 0.2rem;
    }
    .myorder li div{
        font-size: 0.28rem;
        padding: 0.2rem 0;
        width: 50%;
        float: left;
    }
    .myorder li div span{
        display: inline-block;
        width: 50%;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    .myorder li div span:nth-child(2n){
        text-align: left !important;
    }
</style>