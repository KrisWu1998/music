// 封装网路请求
import  axios from '../until/axios'
import jsonp from 'jsonp'
/**********************推荐**********************/ 
let getBannerData=()=>{
    let url ='/hehe/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom012845016368453477&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D'
    return new Promise((resolve,reject)=>{
      axios.get(url)
      .then((res)=>{
        resolve(res)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  }
  let getRecommendData =()=>{
      // 获取推荐页面的歌曲数据
      let url ='/hehe/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.3983624931217431'
      return new Promise((resolve,reject)=>{
        axios.get(url)
        .then((res)=>{ resolve(res)})
        .catch((err)=>{reject(err)})
      })
  }
/****   获取歌手接口***/
let getSingerData=()=>{
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&'
       return new Promise((resolve,reject)=>{
        jsonp(url,{param:'jsonpCallback'},(err,data)=>{
          if(err){
              reject(err)
          }else{
            resolve(data)
          }
     })
       })
}
/*****  获取热门搜索的接口 ******/
  let getHotData=()=>{
    let url ='https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp0'
    return new Promise((resolve,reject)=>{
      jsonp(url,{param:'jsonpCallback'},(err,data)=>{
        if(err){
            reject(err)
        }else{
          resolve(data)
        }
    })
    })
  }
  // 获得搜索结果的接口
  let getFindResult=(val)=>{
    let url = `/hehe/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${val}&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`
    return axios.get(url)
  }



  // 获取歌手歌单
  // let getSingerSong=(mid)=>{
  //   let url = `/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${mid}&`
  //   return axios.get(url)
  // }
 // 获取歌手歌单二
 let getSingerSong=(singermid)=>{
  let url ='/xixi/fcj/music/songListById'
  return axios.post(url,{singermid})
}


// 根据mids 获取播放的url地址
let getSongUrlByMid=(mids)=>{
  let url ='/xixi/fcj/music/songurl'
  return axios.post(url,{mids})
}
// 获取歌曲歌词
let getLyricByMid=(songmid)=>{
  let url ='/xixi/fcj/music/lyric'
  return axios.post(url,{songmid})
}
// 获得首页推荐里的歌单
let getRecommendSong=(mid)=>{
    let url = `/hehe/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${mid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`
    return axios.get(url)
}

//获得排行榜单
let getRankList=()=>{
  let url = '/xixi/fcj/music/topRank'
  return axios.get(url)
}

// 获得排行里的歌单
// let getRankSong=(mid)=>{
//   let url = `/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=${mid}&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5&jsonpCallback=jp1`
//   return axios.get(url)
// }
// 排行歌单二
let getRankSong=(topid)=>{
  let url = `/xixi/fcj/music/rankSongList`
  return axios.post(url,{topid})
}


  export {getBannerData,getRecommendData,getSingerData,getHotData,getSingerSong,getSongUrlByMid,getLyricByMid,getRecommendSong,getRankSong,getFindResult,getRankList}  