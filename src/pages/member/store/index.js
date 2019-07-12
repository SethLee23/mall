import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { Address } from 'js/entrance.js'

const store = new Vuex.Store({
    state: {
      list: null,
    },
    mutations: {
      init(state, list){
          state.list = list
      }
    },
    actions: {
      getList({commit}){
        Address.list().then(res=>{
            commit('init',res.data.lists)
        })
      }
    },
})

export default store 