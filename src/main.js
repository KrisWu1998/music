import Vue from 'vue'
import App from './App.vue'

import router from './Router/router'
import axios from './until/axios'
import VueLazyload from  'vue-lazyload'
import './style/icon/font/iconfont'
import './style/icon/font/iconfont.css'
import './style/reset.css'
import store from './store/index'
import 'animate.css/animate.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 1
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
