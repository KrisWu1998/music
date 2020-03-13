<template>
<transition
        
      >
    <div class="player" v-if='songList.length'>
        <!-- 大屏 -->
        <transition
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
       <div class="big" v-show='fullScreen'>
            <!-- 头部 -->
           <div class="top">
            <span @click='toggleScreen(false)'>
              <svg class="icon goback" aria-hidden="true" >
  <use xlink:href="#icon-fanhui"></use>
</svg>
            </span>
            <span class="title-name">{{currentSong.songname}}</span>
           
           </div>
            <!-- 背景 -->
            <div class="bg">
                <img :src="currentSong.albumUrl" alt="">
            </div>
           <!-- 歌手 -->
           <p class="name">{{currentSong.singer[0].name}}</p>
           <!-- 专辑图片 -->
           <div class="img">
              <img :src="currentSong.albumUrl" alt="" :class="cd" >    
           </div>
           <!-- 歌词 -->
            <mylyric :seekTime='seekTime' :play='play'></mylyric>
           <!-- 进度条组件 -->
           <myprogress
           :startTime ='startTime'
      :endTime ='endTime'
      @seekFa='seek'
      ></myprogress>
           <!-- 播放功能 -->
           <div class="bottom">
           <!-- <span @click='changeLoop'>{{loops[loop]}}</span> -->
           <!-- 循环模式 -->
          <svg class="icon" aria-hidden="true" @click='changeLoop' style="width:30px;height:30px">
          <use :xlink:href="loops[loop]"></use>
          </svg>
          <!-- //上一曲  -->
             <svg class="icon" aria-hidden="true" @click='prev' style="width:30px;height:30px">
          <use xlink:href="#icon-xiayigexiayiqu"></use>
           </svg>
           <!-- 暂停 -->
           <svg class="icon" aria-hidden="true" @click="togglePlay" style="width:40px;height:40px">
  <use :xlink:href="beginOrstop"></use>
</svg>
             <!-- 下一曲 -->
          <svg class="icon" aria-hidden="true" @click='next' style="width:30px;height:30px">
  <use xlink:href="#icon-prev"></use>
</svg>
            <!-- 喜欢 -->
            <svg class="icon" aria-hidden="true" style="width:30px;height:30px" @click="toggleLike">
  <use :xlink:href="like"></use>
</svg>
       
           <!-- 播放器
            <audio ref='audio' 
            @ended='ended'
            @canplay='canplay'
            @timeupdate="timeupdate"
             :src='currentSong.audioUrl'></audio> -->
             </div>
       </div>
        </transition>
       <!-- 小屏     -->

       <div class="small" v-show='!fullScreen'>
         <!-- 小图片 -->
         <div class="imgs" @click='toggleScreen(true)'><img :src="currentSong.albumUrl" alt="" width="40" height="40" :class="cd"></div>
         <div class="text" @click='toggleScreen(true)'>
           <h2>{{currentSong.songname}}</h2>
           <p>{{currentSong.singer[0].name}}</p>
         </div>
         <div class="control">
           <svg class="icon" aria-hidden="true" @click="togglePlay" style="width:30px;height:35px">
               <use :xlink:href="beginOrstop"></use>
           </svg>
         </div>
         <div class="control">
            <svg class="icon" aria-hidden="true" @click='changeLoop' style="width:30px;height:35px">
               <use :xlink:href="loops[loop]"></use>
           </svg>
         </div>
         
       </div>

                <!-- 播放器 -->
            <audio ref='audio' 
            @ended='ended'
            @canplay='canplay'
            @timeupdate="timeupdate"
             :src='currentSong.audioUrl'
             preload="auto"></audio>
              
    </div>
</transition>
</template>
<script>
 import {mapState,mapMutations,mapGetters} from 'vuex'
 import myprogress from '../progress/index'
 import mylyric from '../Lyric/index'
 import Cookies from 'js-cookie'
//  document.addEventListener('DOMContentLoaded', function () {
//      function audioAutoPlay() {
//          let audio = document.getElementById('bgmusic');
//          audio.play();
//          document.addEventListener("WeixinJSBridgeReady", function () {
//              audio.play();
//              }, false);
//           }
//           audioAutoPlay();
//           });
export default {
  components:{myprogress,mylyric},
    data(){
     return {
       startTime:0,
       endTime:0,
         play:true,
         loops:['#icon-buxunhuanbofang-','#icon-danquxunhuan','#icon-liebiaoxunhuan','#icon-suiji'],
         seekTime:0,
         beginOrstop:'#icon-zanting1',
         like:'#icon-xihuan',
         likeshow:true,
     }
    },
    computed:{
         ...mapState(['fullScreen','songList','loop','curIndex']),
         ...mapGetters(['currentSong']),
         cd(){
             return this.play?'cd':'cd paused'
         }
    },
    methods:{
        ...mapMutations(['changeScreen','nextCurrendIndex','prevCurrendIndex','changeLoop','changeCurIndex']),
        // 大小屏切换后保持歌曲状态
        toggleScreen(result){
              this.changeScreen(result)
              if(this.audio.paused){
                return
              }
              this.canplay()
        },
        // 播放暂停切换
        togglePlay(){
            this.play =!this.play
            if(this.play){
                this.beginOrstop = '#icon-zanting1'
            }else{
              this.beginOrstop = '#icon-zanting'
            }
          
        },
        // 喜欢切换
        toggleLike(){
            this.likeshow = !this.likeshow
            if(this.likeshow){
              if(this.like == '#icon-xihuan1'){
              let arr = (Cookies.get('name')).split(',')  // 歌曲cookie
              let arr2 =(Cookies.get('singer')).split(',')  //歌手cookie
              let index = arr.indexOf(this.currentSong.songname)
              arr.splice(index,1)
              arr2.splice(index,1)
              let str = arr.join(',')
              let str2 = arr2.join(',')
              Cookies.set('name',str, { expires: 1 })
              Cookies.set('singer',str2, { expires: 1 })
              }
              this.like = '#icon-xihuan'
            }else{
              this.like = '#icon-xihuan1'
              let arr = (Cookies.get('name')).split(',')  // 歌曲cookie
              let arr2 =(Cookies.get('singer')).split(',')  //歌手cookie
              if(arr.indexOf(this.currentSong.songname) != -1){
                    return
              }
              arr.push(this.currentSong.songname)
              arr2.push(this.currentSong.singer[0].name)
              let str = arr.join(',')
              let str2 = arr2.join(',')
              Cookies.set('name',str, { expires: 1 })
              Cookies.set('singer',str2, { expires: 1 })
            }
        },
      //  查找是否添加为喜欢
         FindLike(){
          let arr2 = (Cookies.get('name')).split(',')
              for (let index = 0; index < arr2.length; index++) {
                if(arr2[index] == this.currentSong.songname){
                     this.like = '#icon-xihuan1'
                     return
              }else{
                     this.like = '#icon-xihuan'
              }
            }   
         },
      // 当播放的时候把歌曲存入cookie
         SetCookies(){
              let arr = (Cookies.get('listn')).split(',')// 歌曲cookie
              let arr2 = (Cookies.get('listnSinger')).split(',')  //歌手cookie
              if(arr.indexOf(this.currentSong.songname) != -1){
                    return
              }
              arr.push(this.currentSong.songname)
              arr2.push(this.currentSong.singer[0].name)
              let str= arr.join(',')
              let str2 = arr2.join(',')
              Cookies.set('listn',str,{ expires: 1 })
              Cookies.set('listnSinger',str2,{ expires: 1 })
               
         },

        timeupdate(e){
      // console.log('歌曲播放',e)
      // 随着播放更新时间
      this.startTime = e.target.currentTime
    },
      canplay(){

             this.audio = this.$refs.audio
                // this.audio.play()
            //  this.audio.pause()
              this.audio.play()
             this.play = true
            
             this.endTime = this.audio.duration                              
             this.FindLike()
             this.SetCookies()
             
        },
      seek(s){
      if(!this.audio){ return false} 
      // 更改播放的时间 
      this.audio.currentTime = s
      this.seekTime = s
       },
        next(){
            this.nextCurrendIndex()
            this.FindLike()
            this.beginOrstop = '#icon-zanting1'
        },
        prev(){
            this.prevCurrendIndex()
            this.FindLike()
            this.beginOrstop = '#icon-zanting1'
        },
        ended(){
          switch (this.loop) {
            case 1:
               this.audio.play()
              break;
            case 2:
               this.nextCurrendIndex()
              break;   
            case 3:
              let count = this.songList.length    
          let index =parseInt(Math.random()*count)
              this.changeCurIndex(index)
              break;                        
            default:
              break;
          }
        },

    },
      watch:{
    play(newValue,oldValue){
      if(!this.audio) return false 
      // console.log(this.audio.playState())
      if(newValue){
          this.audio.play()
      }
      else{
        this.audio.pause()
      }
    },
     currentSong(newValue,oldValue){
          setTimeout(()=>{
             this.$refs.audio.play()
          },100)
     }


  },
   
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.player{
  color: #fff;
  .big{
    position: fixed;
    top:0px;
    bottom: 0px;
    left:0;
    right:0;
    background: #222;
    .top{
      .w(375);
      .h(40);
      font-size: @fs-l;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
      .goback{
        position: fixed;
        left: 10px;
        top: 10px;
      }
      .title-name{
        font-size:@fs-m
      }
    }
    .name{
      font-size: @fs-s;
      text-align: center;
      padding: 10px;
    }
    .bg{
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      img{
         width: 100%;
         height: 100%;
      }
    }
    .img{
    
      text-align: center;
      // background: red;
      .w(375);
      padding: 20px;
      box-sizing: border-box;
      img{
          width: 85%;
          border-radius:50%;
          border:10px solid hsla(0,0%,100%,.1); 
      }
      & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    }
    .bottom{
      margin:0 auto;
      margin-top: 10px;
      .w(300);
      align-items: center;
      display: flex;
      justify-content: space-between
    }
  }
  .small{
    position: fixed;
    .w(375);
    bottom: 0px;
    height: 60px;
    background: #333;
    display: flex;
    align-items: center;
    .imgs{
      .w(70);
      text-align: center;
      line-height: 40px;
      img{
        border-radius: 50%;
      } 
      & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    }
    .text{
      .w(205);
      height: 40px;
      h2{
        font-size: @fs-s;
      }
      p{
        font-size: @fs-xs;
        color: hsla(0,0%,100%,.3);
      }
    }
    .control{
       .w(50);
       text-align: center;
       line-height: 35px;
       position: relative;
       z-index: 99;
    }
  }
  @keyframes rotate {
    0% {
     transform: rotate(0deg)
    }
    100%{
      transform: rotate(360deg)
    }
  }
}  
</style>