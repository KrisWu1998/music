function nomalData(data){
    let obj = {hot:[]}
    //  把数据给归纳起来，按findex开头的字母归纳
    for (let index = 0; index < data.length; index++) {
      let {Findex,Fother_name,Fsinger_mid,Fsinger_name} = data[index] 
      let avator =`https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`
      let singerItem = {Findex,Fother_name,Fsinger_mid,Fsinger_name,avator} // 这里是把当前这条数据相应的内容提取出来
      if(index<10){
          obj.hot.push(singerItem)
      }
      if(!obj[Findex]){
          obj[Findex] = [singerItem]
      }else{
         obj[Findex].push(singerItem)
      }
    }
   //  把数据换转为 热门 和 字母分类的格式
   let hot = []
   let other = []
   for (const key in obj) {
     if (key === 'hot') {
        hot.push({Findex:key,list:obj[key]})
     }else if(key != 9){
       other.push({Findex:key,list:obj[key]})
     }
   }
   //  最后把 热门 和字母分类的数据结合在一起
   other.sort((a,b)=>{return a.Findex.charCodeAt()-b.Findex.charCodeAt()})
   let result = hot.concat(other);
   return result
}
export {nomalData}