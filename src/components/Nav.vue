<template>
  <div id="mypng">
    <tabbar>
      <div  style="width:50%;" :class="{vip_active:pathID === 0}">
        <tabbar-item link="/index/message" >
            <span slot="label" style="font-size:0.32rem;line-height:1rem;" :class="{vip_active1:pathID === 0}">用户信息</span>
        </tabbar-item>
      </div>
      <div style="width:50%;" :class="{vip_active:pathID === 1}">
        <tabbar-item  link="/index/buyindent"  >
            <span slot="label" style="font-size:0.32rem;line-height:1rem;" :class="{vip_active1:pathID === 1}">交易记录</span>
        </tabbar-item>
      </div>
    </tabbar>
    
    <router-view></router-view>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, } from 'vux'
import {mapState} from 'vuex'
export default {
  components: {
    Tabbar,
    TabbarItem,
  },
  data(){
    return{
      isClass:0,
    }
  },
  computed:{
    ...mapState(['pathID'])
  },
  methods:{
    // push(i){
    //   this.isClass = i;
    // },
  },
  mounted(){
    this.$router.push('/index/message');
  }
}
</script>
<style>
#mypng{
  height: 100vh;
  width: 100%;
  /* background: url('../assets/vipbg.png') no-repeat; */
  background: #e4e7ee;
  background-size: 100% 100%;
}
.vip_active{
  background: #439057;
  color: #ffffff !important;
}
.vip_active1{
  color: #ffffff !important;
}
.weui-tabbar__item:first-child{
    border-right: 1px solid #cccccc !important;
}
.weui-tabbar__item.vux-tabbar-simple{
  height: 1rem !important;
  line-height: 1rem !important;
}
.weui-tabbar{
  position: fixed !important;
}
</style>
