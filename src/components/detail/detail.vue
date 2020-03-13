<template>
  <div class='detail'>
    <!-- 头部导航 -->
     <div class='top'>
       <span @click='back' class="title">
         <svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-fanhui-copy
"></use>
</svg>
       </span>
       <span>{{name}}</span>
       <span></span>
     </div>
     <!-- 头像 -->
     <div class='avator' 
     :style="{'background-image':`url(${avator})`}" 
     ref='img'
     >
       <div class='shadow'></div>
     </div>
     <!-- 歌曲列表 -->
     <div class='songlist' ref='wrapper'>
        <div class='content'>
          <ul>
            <li v-for='(item,index) in list' :key='index' @click='openPlay(index)'>
               <h2>{{item.songname}}</h2>
               <p>{{name}}.{{item.albumname}}</p>
            </li>
          </ul>
        </div>
     </div>
  </div>
</template>
<script>
import {getSingerSong,getSongUrlByMid} from '../../api/api'
import BS from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
    data(){
    return{
      list:[],
      name:'暂无数据',
      avator:''
    }
  },
  methods:{
     ...mapMutations(['addListSong','changeScreen','changeCurIndex']),
    openPlay(index){
      this.addListSong(this.list)
      this.changeScreen(true)
      this.changeCurIndex(index) 
    },
    back(){
      this.$router.go(-1)
    },
    initBs(){
      let img = this.$refs.img
      let imgH= img.clientHeight 
      let wrapper = this.$refs.wrapper
      this.bs = new BS(wrapper,{probeType:3,click:true})
      this.bs.on('scroll',({y})=>{
        // 获取图片的元素和高度
        if(y>=0){
          //下拉放大
          let precent =1+(y/imgH)
          img.style.transform=`scale(${precent})`
          img.style.zIndex=1
        }else{
          //向上滚动
          // 没有到顶部 滚动层的层级高
          // 到达顶部额时候 图片的层级高
          if(Math.abs(y)>imgH-40){
            img.style.zIndex=1
            img.style.paddingTop='0%'
            img.style.height='40px'
          }else{ 
             img.style.zIndex=-1
             img.style.paddingTop='70%'
             img.style.height=0
          }
        }
      })
    },
    handleList(data){
       let result = []
       let mids = []
       result = data.map((item)=>{
         let {albummid,albumname,singer,songmid,songname} = item.musicData
         let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
         mids.push(songmid)
         return {albummid,albumname,singer,songmid,songname,albumUrl}
       })
       return {result,mids}
    }
  },
 async created(){
    let {id} = this.$route.params
    let data = await getSingerSong(id)
    let {result,mids} = this.handleList(data.data.list)
    let {urls} =  await getSongUrlByMid(mids)
    let finalData=[]
    for (let index = 0; index < result.length; index++) {
     result[index].audioUrl = urls[index]
      if(urls[index]){
      // 将不能播放的歌曲去除
       finalData.push(result[index])
     }
    }
      this.list = finalData
      this.name = data.data.singer_name
      this.avator =`https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
      this.$nextTick(()=>{
        this.initBs()
      })
    
  }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.detail{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #222;
  left:0px;
  right: 0px;
  // 头部
  .top{
    .w(340);
    height: 40px;
    color: #fff;
    position: absolute;
    top:0;
    left: 10px;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    font-size: @fs-l;
    line-height: 40px;
      .icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
    
      
  }
  // 头像
  .avator{
    .w(375);
    padding-top: 70%;
    background-size:cover; 
    position: absolute;
    top: 0px;
    z-index: -1;
    .shadow{
      position: absolute;
      top: 0;
      background: rgba(7,17,27,0.3);
      width: 100%;
      height: 100%;
    }
  }
  // 歌曲列表
  .songlist{
   position: fixed;
   background: #222;
  //  overflow: hidden;
   top:285px;
   bottom: 0px;
   left:0;
   right: 0;
   .content{
     padding: 10px 30px;
     background: #222;
     li{
       font-size: @fs-s;
       color: #fff;
       height: 61px;
       h2{
        height: 20px;
        font-size: @fs-s;
       }
       p{
        margin-top:3px; 
        height:20px ;
        color: hsla(0,0%,100%,.3);
       }
     }
   }
  }

}
</style>