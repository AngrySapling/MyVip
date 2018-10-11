<template>
    <div id="my">
        <ul class="myorder">
            <li>
                <div><span>单号</span><span>000001</span></div>
                <div><span>交易门店</span><span>和平里</span></div>
                <div><span>金额</span><span>300000</span></div>
                <div><span>交易日期</span><span>2018-09-20</span></div>
            </li>
        </ul>
    </div>
</template>
<script>
import { XInput } from 'vux'
    export default{
        components: {
            XInput
        }
    }
</script>
<style scoped>
    #my{
        overflow: hidden;
        padding: 0 0.2rem;
    }
    #my .myorder{
        padding: 0.4rem  0.2rem 50px;
    }
    #my .myorder li{
        padding: 0.2rem 0;
        margin-bottom: 0.2rem;
        background: rgba(103,160,100,0.5);
        overflow: hidden;
        border-radius: 0.2rem;
    }
    #my .myorder li div{
        font-size: 0.28rem;
        padding: 0.2rem 0;
        width: 50%;
        float: left;
    }
    #my .myorder li div span{
        display: inline-block;
        width: 50%;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    #my .myorder li div span:nth-child(2n){
        text-align: left !important;
    }
</style>