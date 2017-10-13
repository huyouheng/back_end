// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import config from './config.js'
import 'iview/dist/styles/iview.css'
import Iview from 'iview'
Vue.use(Iview);
import router from './router'

import Axios from 'axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.prototype.$axios=Axios
Vue.config.productionTip = false
Vue.prototype.$config = config

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
