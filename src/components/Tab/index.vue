<template>
    <div class="tab">
       <div>
        <router-link to="/recommend" class="nav-v" tag="span" active-class="bor">推荐</router-link>
      </div>
      <div>
      <router-link to="/singer" class="nav-v" tag="span" active-class="bor">歌手</router-link>
      </div>
      <div>
      <router-link to="/rank" class="nav-v" tag="span" active-class="bor">排行</router-link>
      </div>
      <div>
      <router-link to="/search" class="nav-v" tag="span" active-class="bor">搜索</router-link>
      </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.tab{
  .h(44);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #222;
   div{
  flex: 1;
  .h(44);
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsla(0,0%,100%,.5);

   .nav-v{
  font-size: @fs-s;
    }
  }
}
.bor{
  color: #ffcd32;
  border-bottom: 2px solid #ffcd32
}
</style>