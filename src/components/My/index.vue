<template>
<transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
    <div class="My">
        <!-- 返回盒子 -->
        <div class="back" @click="back">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui-copy"></use>
            </svg>
        </div>
        <!-- 头部切换盒子 -->
        <div class="top">
            <ul class="tab">
                <li v-for="(item,index) in Tab" :key="index" :class="index==active?'active':''" @click="toggle(index)"><span>{{item}}</span></li>

            </ul>
        </div>
         <!-- 喜欢的列表 -->
         <div class="like" v-show="active==0?true:false">
            <div class="wrapper" ref="wrapper">
                 <div class="content">
                   <ul>
                       <li v-for="(item,index) in likeList_name" :key="index">
                           <h2 class="name">{{item}}</h2>
                           <p class="desc">{{likeList_singer[index]}}</p>
                       </li>
                   </ul>
                 </div>
            </div>

         </div>
         <!-- 最近听列表 -->
         <div class="like" v-show="active==1?true:false">
            <div class="wrapper" ref="wrapper2">
                 <div class="content">
                   <ul>
                       <li v-for="(item,index) in lateName" :key="index">
                           <h2 class="name">{{item}}</h2>
                           <p class="desc">{{lateSinger[index]}}</p>
                       </li>
                   </ul>
                 </div>
            </div>

         </div>         


    </div>
</transition>
</template>
<script>
import BS from 'better-scroll'
import Cookies from 'js-cookie'

export default {
    data(){
     return{
        Tab:['我喜欢的','最近听的'],
        active:0,
        likeList_name:[],
        likeList_singer:[],
        lateName:[],
        lateSinger:[],
     }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        toggle(index){
            if(index != this.active){
                this.active = index
            }
        },
        init(){
            let wrapper = this.$refs.wrapper
            let wrapper2 = this.$refs.wrapper2
            if(this.active == 0 ){
              this.bs = new BS(wrapper,{})
            }else if(this.active == 1){
              this.bs = new BS(wrapper2,{})
            }
           
            // 初始化喜欢的列表数据
            let nameArr = (Cookies.get('name')).split(',')   // 歌名
            let singerArr = (Cookies.get('singer')).split(',')  // 歌手
             for (let index = 0; index < nameArr.length; index++) {
                 if(index!=0){
                     if(this.likeList_name.indexOf(nameArr[index]) != -1){
                          let ele = this.likeList_name.indexOf(nameArr[index])
                          this.likeList_name.splice(ele,1)
                     }
                      this.likeList_name.unshift(nameArr[index])
                 }          
             }
             for (let index = 0; index < singerArr.length; index++) {
                 if(index!=0){
                      if(this.likeList_singer.indexOf(singerArr[index]) != -1){
                             let ele = this.likeList_singer.indexOf(singerArr[index])
                             console.log(ele)
                             this.likeList_singer.splice(ele,1)
                      }
                      this.likeList_singer.unshift(singerArr[index])      
                 }    
             }
            //  初始化最近听的列表数据
            let listnArr = (Cookies.get('listn')).split(',')   // 歌名
            let listnSingerArr = (Cookies.get('listnSinger')).split(',')  // 歌手    
             for (let index = 0; index < listnArr.length; index++) {
                 if(index!=0){
                     if(this.lateName.indexOf(listnArr[index]) != -1){
                         let ele = this.lateName.indexOf(listnArr[index])
                         this.lateName.splice(ele,1)
                     }
                      this.lateName.unshift(listnArr[index])
                 }          
             }
             for (let index = 0; index < listnSingerArr.length; index++) {
                 if(index!=0){
                     if(this.lateSinger.indexOf(listnSingerArr[index]) != -1){
                         let ele = this.lateSinger.indexOf(listnSingerArr[index])
                         this.lateSinger.splice(ele,1)
                     }
                      this.lateSinger.unshift(listnSingerArr[index])      
                 }    
             }


        }
    },
    mounted(){
        this.init()
    },
    watch:{
        active(newValue,oldValue){
           this.init()
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.My{
    position: fixed;
    top:0px;
    bottom: 0px;
    left:0;
    right:0;
    background: #222;
    // 同级返回样式
    .back{
     .w(42);
     .h(42);
     display: flex;
     justify-content: center;
     align-items: center;
     position: absolute;
     top: 6px;
     left: 6px;
     z-index: 50;
        .icon {
  width: 0.8em;
  height: 0.8em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
         }
    }
    // 同级头部样式
    .top{
        .w(375);
        height: 32px;
        margin: 10px 0 30px 0;
        .tab{
            margin: 0 auto;
            display: flex;
            justify-content: center;
            .w(240);
            border: 1px solid #333;
            border-radius: 5px;
            height: 32px;
            li{
               flex: 1;
               padding: 8px;
               text-align: center;
               font-size: @fs-s;
               color: hsla(0,0%,100%,.3);
            }
            .active{
                background: #333;
                color: #fff;
            }
        }
    }
    //  同级喜欢列表的样式
    .like{
        position: fixed;
        top: 62px;
        left: 0;
        right: 0;
        bottom: 0;
        background: #222;
       .wrapper{
           height: 100%;
           overflow: hidden;
           .content{
               .w(375);
               ul{
                   li{
                       padding: 20px 30px;
                       .name{
                           color: #fff;
                           font-size: @fs-s;
                       }
                       .desc{
                           color: hsla(0,0%,100%,.3);
                           font-size: @fs-s;
                       }
                   }
               }
           }
       }
    }
  
}
</style>