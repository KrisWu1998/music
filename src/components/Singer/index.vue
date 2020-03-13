<template>
  <div class='singers'>
    <!-- 内容滚动列表 -->
     <div class="wrapper" ref="singerWrapper">
       <div class="content">
          <ul>
            <li v-for="(item,index) in singers" :key='index' :ref='item.Findex' >
              <h3>{{item.Findex}}</h3>
              <ol>
                <li v-for="(sItem,sIndex) in item.list" :key="sIndex" @click='goDetail(sItem.Fsinger_mid)'>
                  <img v-lazy="sItem.avator" alt="">
                  <span>{{sItem.Fsinger_name}}</span>
                </li>
              </ol>
            </li>
          </ul>
       </div>
     </div>

         <!-- 快速列表 -->
    <div class='quicklist'>
      <ul 
        @touchstart='touchStart'
        @touchmove='touchMove'
      >
        <li v-for="(item,index) in quickData" 
            :key="index"
            @click='quickJump(item)'
            :class='selFindex==item?"sel":""'>

          {{item}}
        </li>
      </ul>
    </div>
          <!--嵌套路由 -->
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <router-view></router-view>
      </transition>
  </div>
</template>
<script>
// import jsonp from 'jsonp'
import BS from 'better-scroll'
import {getSingerData} from '../../api/api'
import {nomalData} from './singerdata/singerdata'
export default {
  name:'singer',
  data(){
    return{
      singers:[],
      selFindex:'hot'
    }
  },
   methods:{
     goDetail(index){
      this.$router.push(`/singer/detail/${index}`)
    },
         // 手指按下事件，e获取按下的dom信息
    touchStart(e){
      let y = e.touches[0].pageY
      this.touch.y=y
      this.quickJump(e.path[0].innerText)
     
    },
    // 手指离开事件
    touchMove(e){
      if(e.touches[0].pageY>144&&e.touches[0].pageY<565){  //判断鼠标移动的最高点和最低点
let moveY =e.touches[0].pageY
      let moveDis=moveY-this.touch.y //计算出移动过的距离
      let count =parseInt(moveDis/18) //获取移动过的格子数
      // console.log('移动',moveDis,count)
      let index = e.path[0].innerText  // 获取开始移动的dom文本内容
     
      let counts = this.quickData.indexOf(index) // 通过文本内容去quickDate数据中找这个内容的索引
        let moveIndex =counts + count  //获取下标
      let moveFindex =this.quickData[moveIndex]
      this.quickJump(moveFindex)
      }
    },
     // initBs内容为实现内容滚动效果 和 滚动后 右边字母跟着关键字变动发亮
        initBS(){
          let wrapper = this.$refs.singerWrapper
          this.Bs = new BS(wrapper,{probeType:3,click:true}) // probeType默认0，监听不到页面滚动的距离
      // 实现屏幕滑动对应字母栏停留顶部  第一步：    
          let distance = []; // 创建一个空数组
          for (const key in this.$refs) {  // 遍历每个歌手li
            if(key!='singerWrapper'){   // 排除掉singerwrapper
              distance.push(this.$refs[key][0].offsetTop)
            }
          }
      // 实现屏幕滑动对应字母栏停留顶部  第二步：
          // 监听页面滚动
          this.Bs.on('scroll',(pos)=>{
             let y = Math.abs(pos.y)
             //  判断每一次屏幕滚动在distance数组中哪2个值的范围内
             let scrollIndex = 0 // 滚动所在区域的下标
             for (let index = 0; index < distance.length; index++) {
               if(y>=distance[index]&&y<distance[index+1]){
                   scrollIndex=index
               }else if(y>=distance[distance.length-1]){
                  //最后一个的判断
                  scrollIndex = distance.length-1
               } 
             }
            // 实现屏幕滑动对应字母栏停留顶部  第三步：
               // 根据scrollIndex下标换selFindex的字母值
               let scrollFindex = this.quickData[scrollIndex]
                this.selFindex = scrollFindex
          })
        },
        // quickJump内容为实现右边点击关键字字母后内容跟着跳转
        quickJump(item){
          let dom = this.$refs[item][0] // 根据传过来的字母，去屏幕绑定了ref的里面找第item个里面的第0个
          this.Bs.scrollToElement(dom) // 此处为better-scroll第三方插件的方法
        }
   },
  computed: {
    quickData(){
      // 快速入口数据和歌手数据做关联
      let result = this.singers.map((item)=>{
        return item.Findex
      })
      return result
    }
  },
   created(){
     //初始化事据，把移动距离挂载到实例里this对象下
      this.touch={y:0}
     // 请求数据
     getSingerData().then((res)=>{
       let data = nomalData(res.data.list)
       this.singers = data
        this.$nextTick(()=>{
          this.initBS()
        })
     })    
   },
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.singers{
  position: fixed;
  top:88px;
  bottom: 0px;
  left:0px;
  right: 0px;
  background: #222;
  .quicklist{
    position: absolute;
    right: 10px;
    top:40px;
    width: 20px;
    background: rgba(0,0,0,.3);
    font-Size:@fs-xs;
    padding: 20px 0 20px;
    color:rgba(255,255,255,.5);
    border-radius:10px; 
    text-align: center;
    ul{
      li{
        width: 20px;
        height: 18px;
      }
      .sel{
        color: @yellow;
      }
    }
  }
  .wrapper{
    height: 100%;  
    // background: red;
    overflow: hidden;
    .content{
      .w(375);
      h3{
        height: 30px;
        line-height: 30px;
        background: #333;
        color:rgba(255,255,255,0.5);
        font-size: @fs-s;
        padding-left:20px;
         

      }
      ol{
        li{
          .w(375);
          height: 70px;
          // background: pink;
          box-sizing: border-box;
          padding: 20px 0px 0px 30px;
          display: flex;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border-radius:25px; 
          }
          span{
            padding-left:20px; 
            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-size: @fs-s;
            color:rgba(255,255,255,.5);
          }
        }
      }
    }
    }
}
</style>