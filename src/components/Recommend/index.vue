<template>
    <div class="recommend">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <!-- 给轮播图插件传入api接口收到的轮播图数据 -->
                <banner :banners='banner'></banner>
                <!-- 歌单推荐 -->
                <h1 class="title">热门歌单推荐</h1>
                 <!-- 推荐列表 -->
                 <ul class="sing">
                   <li v-for="(item, index) in list" :key="index" @click="openDetail(item.dissid)">
                     <div class="tp">
                       <img v-lazy="item.imgurl" alt="" width="60" height="60" />
                     </div>
                     <div class="text">
                       <h2>{{item.creator.name}}</h2>
                       <p>{{item.dissname}}</p>
                      </div>
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
import { Indicator } from 'mint-ui';
import banner from '../banner'
import BS from 'better-scroll'
import {getBannerData,getRecommendData} from '../../api/api'
import Cookies from 'js-cookie'
export default {
    name:'index',
    data(){
        return{
            banner:[],
            list:[]
        }
    },
    components:{banner},
    methods:{
openDetail(index){
       this.$router.push(`/recommend/${index}`)
       
    },
     init(){
      let wrapper = this.$refs.wrapper
      this.bs = new BS(wrapper,{
        probeType:3,
        click:true,
        pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        pullUpLoad: {
          threshold: 50
        },       
        })
      this.bs.on('pullingDown',()=>{
        // 上次下拉刷新已经结束 可以开始下一次
                Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        getRecommendData().then((res)=>{
        Indicator.close() 
        this.list = res.data.list
        this.bs.finishPullDown()         
        })   
      })
            // 监听上拉加载
      this.bs.on('pullingUp',()=>{
        // 上一次上拉加载已经结束可以开启下一次
        this.bs.finishPullUp()
      })



       if(!Cookies.get('name')){
         Cookies.set('name',null)
         Cookies.set('singer',null)
       }
       if(!Cookies.get('listn')){ 
         Cookies.set('listn',null)
         Cookies.set('listnSinger',null)
       }
     }
    },
    mounted(){
        Indicator.open()
        getBannerData().then((res)=>{
            this.banner = res.data.slider
        })
        getRecommendData().then((res)=>{
            this.list = res.data.list
           Indicator.close();
        })
        this.init()
    }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
  .wrapper{
    position: fixed;
    top:88px;
    bottom: 0px;
    left:0px;
    right: 0px;
    overflow: hidden;
    .content{
      .w(375);
      .title{
        .w(375);
          height: 65px;
  line-height: 65px;
  text-align: center;
  font-size: @fs-s;
  color: #ffcd32;
  background: #222;
  padding: 0;
  margin: 0;
  border: 0;
      }
.sing {

  display: flex;
  flex-direction: column;
  background: #222;
  li {
  height: 1.68rem;
  padding: 0px 20px 20px 20px;
  display: flex;
   .tp {
  width: 1.9rem;
  height: 1.69rem;
  padding-right: 20px;
   }
    .text {
      font-weight: 400px;
      h2 {
          font-size: @fs-s;
          margin-bottom: 10px;
          color: #fff;
        }
      p {
          font-size: @fs-xs;
          color: hsla(0, 0%, 100%, 0.5);
        }
    }
 }
}

    }
  }





</style>