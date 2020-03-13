import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    fullScreen: false, //大屏小屏
    songList: [], // 总歌曲数目
    curIndex: -1, // 选中后复制得索引
    loop: 0, // 0:不循环 1：单曲 2：列表循环 3：随机
  },
  getters: {
    currentSong(state) {
      // 当前正在播放的那首歌
      if (state.songList[state.curIndex]) {
        return state.songList[state.curIndex]
      } else {
        return state.songList[0]
      }
      // return state.songList[state.curIndex]||null
    }
  },
  mutations: {
    // 改变大小屏判断值
    changeScreen(state, pramas) {
      state.fullScreen = pramas
    },
    // 获得歌手所有歌曲列表  
    addListSong(state, pramas) {
      state.songList = pramas
    },
    // 获得当前点击的歌曲索引值，并复制给curIndex 
    changeCurIndex(state, pramas) {
      state.curIndex = pramas
    },
    // 下一首
    nextCurrendIndex(state) {
      if (state.curIndex < state.songList.length) {
        state.curIndex++
      } else {
        state.curIndex = 0
      }
    },
    //上一首
    prevCurrendIndex(state) {
      if (state.curIndex != -1) {
        state.curIndex--
      }else{
        state.curIndex = 0
      }
    },
    changeLoop(state) {
      if (state.loop == 3) {
        state.loop = 0
      } else {
        state.loop++
      }
    },
  }
})
export default store
