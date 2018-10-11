<template>
    <div id="my">
        <ul class="myContent" slot="margin-top:0.8rem;">
            <li><span>手机号</span><p>17311212626</p></li>
            <li><span>会员积分</span><p>266</p></li>
            <li><span>所属门店</span><p>平安里</p></li>
        </ul>
        <ul class="myMessage">
            <li>
                <span>姓名</span>
                <p style="width:30%;float:left;">李培基</p>
                <button @click="push()" >完善信息</button>
            </li>
            <li><span>性别</span><p>男</p></li>
            <li><span>生日</span><p>20180606</p></li>
            <li><span>地区</span><p>北京市西城区</p></li>
        </ul>
    </div>
</template>
<script>
    export default{
        methods:{
            push(){
                this.$router.push('/change');
            }
        }
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

