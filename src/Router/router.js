import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Recommend =()=>import('../components/Recommend')
const Singer = ()=>import('../components/Singer')
const Rank =()=>import('../components/Rank')
const Search = ()=>import('../components/Search')
import Detail from '../components/detail/detail'
import recomDetail from '../components/recomDetail'
import rankDetail from '../components/rankDetail'
import My from '../components/My'
const router = new VueRouter({
    routes:[
        {    
           path:'/recommend',
           component:Recommend,
           children:[
            {
              path:':id',
              name:'recomdetail',
              component:recomDetail
            }
          ] 
        },
        {
            path:'/singer',
            component:Singer,
            children:[
                {
                  path:'detail/:id',
                  name:'detail',
                  component:Detail
                }
              ]
         },
         {
            path:'/rank',
            component:Rank,
            children:[
              {
                path:':id',
                name:'rankDetail',
                component:rankDetail
              }
            ]
         },
         {
            path:'/search',
            component:Search,
         },
         {
          path:'/my',
          component:My,
         },
         {
            path:'/',
            redirect:'/recommend'
         }
    ]
})

export default router