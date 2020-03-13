<template>
  <div id="app">
    <!-- 公用头部 -->
    <Header></Header>
    <!-- 公用选项切换 -->
    <Tab></Tab>
    <!-- 切换的视图 -->
    <keep-alive include="index,singer,rank,search">
    <router-view></router-view>
    </keep-alive>
    <!-- 大小屏 -->
    <play></play>
    <!-- 我的界面 -->
  </div>
</template>

<script>
import Header from './components/Header'
import Tab from './components/Tab'
import play from './components/Player/player'
export default {
   components:{Header,Tab,play}
}
</script>

<style lang="less" scoped>
@import './style/index.less';
#app{
  background: @black2;
  // .w(375);
  height: 100vh;
}
</style>
