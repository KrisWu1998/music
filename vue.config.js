const path = require("path")
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports={
    publicPath:'./',
    lintOnSave:false,//关闭eslint
    devServer:{
      proxy:{    //配置代理服务器
        // 接口小暗号
        '/hehe':{
          target:'http://ustbhuangyi.com', //要转发的目标网址目标网址 
          changeOrigin:true,
          pathRewrite:{
            "^/hehe":''  //将路径中多余的暗号 删除
          },
        },
          '/v8':{
            target:'https://c.y.qq.com', //要转发的目标网址目标网址 
            changeOrigin:true,

          },
          '/xixi':{
            target:'http://47.95.207.1:3000',
            changeOrigin:true,
            pathRewrite:{
              "^/xixi":''  //将路径中多余的暗号 删除
            }
          }       
        }
      },
      chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))  //src的绝对路径起一个别名叫@
        .set('api',resolve('./src/api'))
        .set('style',resolve('./src/style'))
        .set('components',resolve('./src/components'))
    }
}