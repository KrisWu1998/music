<template>
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" 
            v-for = '(item,index) in banners'
            :key = 'index'
          >
          <img :src="item.picUrl" alt="">
          </div>
          
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  props:{
    'banners':{ type :Array ,default:[] }
  },
  methods:{
    initBanner(){
      new Swiper('.swiper-container',{
        loop: true,
        // 如果需要分页器
        pagination:{
          el:'.swiper-pagination',
          clickable:true,
        },
        autoplay:{
            delay:2000,
            disableOnInteraction:false
          },

      })
    }
  },
  watch:{
    banners(){
      //banners 改变 网络请求数据ok 之后进行初始化操作
      this.$nextTick(()=>{
        this.initBanner()
      })
    }
  }  
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
@import '~swiper/css/swiper.min.css';
.swiper-container{
  .w(375);
  .h(150);
  margin: 0;
  background: @black2;
  img{
    .w(375);
    .h(150);
  }
}
</style>