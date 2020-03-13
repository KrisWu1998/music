<template>
    <div class="Lyric">
        <h4>{{text}}</h4>
    </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import Lyric from "lyric-parser"
import {Base64 } from 'js-base64'
import {getLyricByMid} from '../../api/api'
export default {
    data(){
    return{
        text:'正在缓冲中',
    }
    },
    props:['seekTime','play'],
    computed:{
        ...mapGetters(['currentSong']),
      
    },
    watch:{
        currentSong(newdata,olddata){
           let {songmid} = newdata
           this.getLyric(songmid)
        },
        seekTime(newValue,oldValue){
            // if(this.text != '正在缓冲中'){
            //   this.lyricObj.seek(this.nowTime*1000)
            //   return
            // }
          this.lyricObj.seek(newValue*1000)
        },
        play(newValue,oldValue){
            if(this.lyricObj){
                this.lyricObj.togglePlay()
            }
        },
    },
    methods:{
        getLyric(songmid){
            getLyricByMid(songmid).then((data)=>{
               let  decode=Base64.decode(data.lyric)    
                if(this.lyricObj){
                //  将之前的歌词播放停止
                 this.lyricObj.stop()
                }
               this.lyricObj = new Lyric(decode,({txt})=>{          
                      this.text = txt
                      
               })
                this.lyricObj.play()     
            })
        }
    },
    mounted(){
        let {songmid}=this.currentSong
        this.getLyric(songmid)
        
    }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.Lyric{
    text-align: center;
    h4{
        width: 80%;
        font-size: @fs-s;
        margin: 0 auto;
        height: 60px;
    }
}



</style>