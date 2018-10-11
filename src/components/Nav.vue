<template>
  <div id="mypng">
    <tabbar>
      <div @click="push(0)" style="width:50%;" :class="{vip_active:isClass === 0}">
        <tabbar-item link="/message" >
            <span slot="label" style="font-size:0.32rem;line-height:1rem;" :class="{vip_active1:isClass === 0}">用户信息</span>
        </tabbar-item>
      </div>
      <div @click="push(1)" style="width:50%;" :class="{vip_active:isClass === 1}">
        <tabbar-item  link="/buyindent"  >
            <span slot="label" style="font-size:0.32rem;line-height:1rem;" :class="{vip_active1:isClass === 1}">交易记录</span>
        </tabbar-item>
      </div>
    </tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, } from 'vux'
// import {getItem} from '../components/Common/common.js'
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
  methods:{
    push(i){
      this.isClass = i;
    },
  },
  mounted(){
    this.$router.push('/message');

  }
}
</script>
<style>
#mypng{
  height: 100vh;
  width: 100%;
  background: url('../assets/vipbg.png') no-repeat;
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

</style>
