<template>
    <div class="header">
       <div></div>
      <h1 class="title">Small Pig Music</h1>
      <router-link to="/my" tag="svg" class="icon" aria-hidden="true">
          <use xlink:href="#icon-yonghu"></use>
      </router-link>
      <!-- <svg class="icon" aria-hidden="true" @click='changeMy'>
        <use xlink:href="#icon-yonghu"></use>
      </svg> -->
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.header {
  height: 44px;
  background: #222;
  display: flex;
  justify-content:space-around;
  align-items: center;
  .icon {
  .w(30);
  .h(30);
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
};
  .title{
  color: #ffcd32;
  font-size: 18px;
  font-weight: bold;
}
}


</style>