import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { Address } from 'js/entrance.js'

const store = new Vuex.Store({
    state: {
      lists: null,
    },
    mutations: {
      init(state, lists){
          state.lists = lists
      }
    },
    actions: {
        
    },
})

export default store 