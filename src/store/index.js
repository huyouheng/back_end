import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import oss from './modules/oss'
import article from './modules/article'
 

const store = new Vuex.Store({
  	modules:{
      oss,article
    }
})
export default store