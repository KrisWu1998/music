<template>
    <div class="rank">
       <div class="wrapper" ref="rankwrapper">
           <div class="content">
              <ul>
                 <li v-for="(item,index) in rankList" :key="index" @click="openDetail(item.id)">
                   <div class="left-img">
                     <img v-lazy="item.picUrl" alt="" width="100" height="100">
                   </div>
                   <ul class="right-title">
                       <li v-for="(ele,i) in item.songList" :key="i">
                         <span>{{i+1}}</span><span>{{ele.songname}}-{{ele.singername}}</span>
                         </li>
                   </ul>
                 </li>
              </ul>
           </div>

       </div>
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <router-view></router-view>
      </transition>
    </div>
</template>
<script>
import BS from 'better-scroll'
import axios from 'axios'
import {getRankList} from '../../api/api'
export default {
  name:'rank',
  data(){
    return {
      rankList:''
    }
  },
    methods:{
       initrank(){
         let wrapper = this.$refs.rankwrapper
         new BS(wrapper,{probeType:3,click:true})
       },
       openDetail(index){
          this.$router.push(`/rank/${index}`)
       }
    },
    mounted(){
      this.initrank();
      // getRankData().then((res)=>{
      //        console.log(res)
      //  })
      // let url ='/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&'
      getRankList().then((res)=>{
        // console.log(JSON.parse(res.slice(18,-1)).data.topList)     
        this.rankList = res.data.topList
      })
    },

  
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.rank{
    position: fixed;
  top:88px;
  bottom: 0px;
  left:0px;
  right: 0px;
  background: #222;
  .wrapper{
    height: 100%;
    overflow: hidden;
    .content{
      .w(375);
      ul{
        li{
          .w(335);
          height: 120px;
          padding-top: 20px;
          margin: 0px 20px;
          box-sizing: border-box;
          display: flex;
          .right-title{
            flex: 1;
            height: 100px;
            padding: 0px 20px;
            background: #333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            li{
              .w(195);
              height: 26px;
              margin: 0px;
              padding: 0px;
              font-size: @fs-xs;
              color: rgba(255, 255, 255, 0.3)
            }
          }
        }
      }
    }
  }
}

</style>