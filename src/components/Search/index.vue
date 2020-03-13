<template>
    <div class="search">
       <div class="wrapper" >
           <div class="content">
                <!--  搜索栏  -->
                <div class="search-box">  
                   <div class="search-find">
                        <span class="iconfont icon-sousuo"></span>
                        <input type="text" width="289" class="ipt" placeholder="搜索歌曲、歌手" v-model="iptVal" >
                   </div>
                </div>
                <div ref="searchWrapper" class="scrolls">
                <!-- 热门搜索 - 历史 -->
                <div class="hot-search" v-show="content">
                     <!-- 热门 -->
                     <div class="hots">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                          <li class="item" v-for="(item,index) in list" :key="index" @click="searchSinger(item)"><span>{{item.k}}</span></li>
                         
                        </ul>
                     </div>
                     <!-- 历史 -->
                     <div class="history">
                         <h1 class="title">
                           <span style="color: hsla(0, 0%, 100%, 0.5)">搜索历史</span>
                           <span class="iconfont icon-lajitong" style=" color: hsla(0,0%,100%,.3);"></span>
                         </h1>
                          <ul>
                            <li><span>我们的歌</span><span class="iconfont icon-cha"></span>
                            </li>
                            
                          </ul>
                     </div>
                </div>
                    <!-- 搜索后出现的结果 -->
                    <div class="find-result" v-if="show" ref="find">
                        <div class="find-content">
                        <ul>
                          <li v-for="(item,index) in listResult" :key="index" @click='openPlay(index)'>
                            <div>
                              <span class="iconfont icon-yinyue"></span>
                            </div>          
                            <span>{{item.songname}} - {{item.singer[0].name}}</span>
                          </li>
                        </ul>
                        </div>
                    </div>
                </div>
           </div>
       </div>
    </div>
</template>
<script>
import BS from 'better-scroll'
import {getHotData,getSongUrlByMid,getFindResult} from '../../api/api'
import {mapMutations} from 'vuex'
export default {
  name:'search',
  data(){
   return{
     list:[],
     content:true,
     show:false,
     listResult:[],
     iptVal:''
   }
  },
    methods:{
      inits(){
        let wrapper = this.$refs.find
        new BS(wrapper,{probeType:3,click:true,})
      },
      handleList(data){
       let result = []
       let mids = []
       result = data.map((item)=>{
         let {albummid,albumname,singer,songmid,songname} = item
         let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
         mids.push(songmid)
         return {albummid,albumname,singer,songmid,songname,albumUrl}
       })
       return {result,mids}
    },
      searchSinger(item){
        this.iptVal = item.k
      },
      ...mapMutations(['addListSong','changeScreen','changeCurIndex']),
      openPlay(index){
        this.addListSong(this.listResult)
        this.changeScreen(true)
        this.changeCurIndex(index) 
      },
    },
    mounted(){
        getHotData().then((res)=>{
           for (let index = 0; index < res.data.hotkey.length; index++) {
             if(index<10){
                this.list.push(res.data.hotkey[index])
             }
             
           }
        })
    },
    watch:{
       iptVal(val){         
           if(val == ''){
               this.content = true,
               this.show = false,
               this.iptVal = ''
           }else{ 
              this.listResult = []
               this.content = false
               this.show = true
               getFindResult(val).then((res)=>{
                 let {result,mids} = this.handleList(res.data.song.list)
                 getSongUrlByMid(mids).then((res)=>{
                   let {urls} = res
                 let finalData=[]
        for (let index = 0; index < result.length; index++) {
         result[index].audioUrl = urls[index]
           if(urls[index]){
          // 将不能播放的歌曲去除
           finalData.push(result[index])
         }

        }
                  this.listResult = finalData
                   
                 })
                 this.$nextTick(()=>{
                      this.inits()
                   })
               })
        //        let url = `/hehe/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${val}&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`
        //        this.$axios(url).then((res)=>{
        //         //  res.data.song.list.forEach(item => {
        //         //     this.listResult.push(item)
        //         //  });
        //         let {result,mids} = this.handleList(res.data.song.list)
                
        // // for (let index = 0; index < result.length; index++) {
        // //  result[index].audioUrl = urls[index]
        // // }
        //          this.listResult = result
        //         console.log(result,mids)
        //        })
              //  let {urls} = getSongUrlByMid(mids)
              //  console.log(urls)
           }
       }
    }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.search{
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
    display: flex;
    flex-direction: column;
    // 搜索栏样式
.search-box{
  .w(335);
  height: 40px;
  padding: 20px;
  .search-find{
    .w(323);
    height: 40px;
    padding: 0 6px;
    border-radius: 6px;
    background: #333;
    display: flex;
    align-items: center;
    .ipt{
      .w(289);
      margin: 0 5px;
      background: #333;
      border: 0;
      outline:none;
      caret-color: #fff;
      color: #fff;
    }
  }
}
.scrolls{
  height: 100%;
  overflow: hidden;
  //  热门搜索 - 历史 样式
  .hot-search{
    .w(375);
    height: 489px;
      //  热门
    .hots{
      .w(335);
      margin: 0 20px 20px 20px;
.title{
    height: 14px;
    margin-bottom: 20px;
    font-size: 14px;
    color: hsla(0,0%,100%,.5);
    display: inline-block;
      };

      ul{
          margin: 0;
          padding: 0;
          font-size: @fs-s;
        .item{
          height: 14px;
          padding: 5px 10px;
          margin: 0 20px 10px 0px;
              border-radius: 6px;
    background: #333;
    font-size: @fs-xs;
    color: hsla(0,0%,100%,.3);
    display: inline-block;
    text-align: center;
    line-height: 14px;
    font-weight: 400;
        }
      }
    }
       //  历史
      .history{
        .w(335);
        
        margin: 0px 20px;
      .title{
          height: 40px;
          font-size: @fs-s;
        display: flex;
        justify-content: space-between;
      };
      ul{
        li{
          height: 40px;
        font-size: @fs-m;
        color: hsla(0,0%,100%,.3);
        display: flex;
        justify-content: space-between;
        align-items: center
        }
      }
      }
  }
  // 搜索结果样式
  .find-result{
    height: 100%;
    overflow: hidden;
    .find-content{
        .w(375);
         ul{
      padding: 0px 30px;
      li{
        width: 100%;
        padding: 0 0 20px 0;
        display: flex; 
        font-size: @fs-s;
        color: hsla(0,0%,100%,.3);
        div{
          .w(30);
          height: 16px;
        }
      }
    }
    }
    
   
  }
}
}
};
}
</style>