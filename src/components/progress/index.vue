<template>
    <div class="progress">
        <span>{{startTime|handleTime}}</span>
     <div class='wrapper' @click='clickProgress' ref="wrapper">
       <div class='content' ref='content'></div>
       <div class='dot' ref="dot"
            @touchstart='touchStart'
            @touchmove= 'touchMove'
            @touchend= 'touchEnd'
       >
         <div class='red'>

         </div>
       </div>
     </div>
     <span>{{endTime|handleTime}}</span>
     <!-- <button @click='jump'>跳转</button> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed:{ 
        ...mapState(['curIndex','fullScreen'])
    },
  methods:{
    jump(precent){
      // 调用父组件的方法控制播放时间
      let time =precent*this.endTime/100
      this.$emit('seekFa',time)
    },
    touchStart(){
         this.touch = true
         this.distance = 0
    },
    touchMove(e){
            let left = this.$refs.wrapper.getBoundingClientRect().left
            let width = this.$refs.wrapper.clientWidth
            this.distance = e.touches[0].pageX -left
            if(this.distance>0&&this.distance<=width){
                    this.offsetMove(this.distance)
            }
    },
    touchEnd(){
            this.touch = false
            this.offsetMove(this.distance)
    },
    clickProgress(e){
        let x = e.pageX  // 获得点击的地方在歌曲进度栏中离左边屏幕的距离
        let left = this.$refs.wrapper.getBoundingClientRect().left // 获得进度栏离左边屏幕的距离
        let distance  =x - left  // 此处为点击歌曲进度栏的坐标
        this.offsetMove(distance)
    },
    offsetMove(distance){
       let precent = (distance/this.$refs.wrapper.clientWidth)*100
       this.$refs.content.style.width = precent + '%'
       // 小圆点移动
       this.$refs.dot.style.transform= `translateX(${distance}px)`
       if(this.touch){ return false}
       this.jump(precent)
      
    }
    
  },
  props:{
    startTime:{type:Number,default:0},
    endTime:{type:Number,default:0},
    nowTime:{type:Number,default:0}
  },
  filters:{
    handleTime(data){
      let time = parseInt(data)
      let m =parseInt(time/60)
      //秒数  01 02 11
      let s =time%60
      s=s<=9?`0${s}`:s
      return  m+':'+s
    }
  },
  watch:{
    startTime(newValue,oldValue){
      // 当前播放时间所占的百分比
      if(this.touch){ return false}
      let precent = (this.startTime/this.endTime)*100 
      // 控制进度条长度变化
    //   console.log(precent)
      this.$refs.content.style.width = precent+'%'
      let width=this.$refs.wrapper.clientWidth*precent/100  
      this.$refs.dot.style.transform= `translateX(${width}px)`
    },
    curIndex(newValue,oldValue){
       this.$refs.dot.style.transform= 'translateX(0px)'
    },
  }  
  
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.progress{
  .w(375);
  .h(30);
  display: flex;
  font-size: @fs-s;
  align-items: center;
  justify-content: center;
  span{
    display: inline-block;
    // background: red;
    width: 30px;
  }
  .wrapper{
    margin: 0px 10px;
    .w(270);
    height: 4px;
    background: rgba(0,0,0,.3);
    position: relative;
    .content{
      height: 4px;
      width: 0%;
      background: @yellow;
    }
    .dot{
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius:50%; 
      position: absolute;
      transform: translateX(-8px);
      top: -6px;
 
      .red{
        position: absolute;
        top:2px;
        left:2px;
        height: 12px;
        width: 12px;
        background: @yellow;
        border-radius:50%;
      }
    }
  }
}
</style>