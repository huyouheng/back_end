// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import config from './config.js'
import router from './router'
import 'iview/dist/styles/iview.css'
import Iview from 'iview'
import Axios from 'axios'
import store from './store'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(Iview);
Vue.use(VueQuillEditor);
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
