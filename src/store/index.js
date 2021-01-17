import Vue from 'vue'
import Vuex from 'vuex'
import searchPhotos from '@/store/modules/searchPhotos'
import history from '@/store/modules/history'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    searchPhotos,
    history
  }
})
