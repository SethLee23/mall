import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  Address
} from 'js/entrance.js'

const store = new Vuex.Store({
  state: {
    list: null,
  },
  mutations: {
    init(state, list) {
      state.list = list
    },
    add(state, instance) {
      state.list.push(instance)
    },
    remove(state, id) {
      let index = state.list.findIndex(item => {
        return item.id === id
      })
      state.list.splice(index, 1)
    },
    setDefault(state, id) {
      let index = state.list.findIndex(item => {
        return item.id === id
      })
      state.list.forEach(i => {
        i.isDefault = i.id === id ? true : false
      });
    },
    update(state, instance) {
        // 深拷贝数据，修改，最后用深拷贝数据替换原始列表
      let listCopy = JSON.parse(JSON.stringify(state.list))
      let index = listCopy.findIndex(item => {
        return item.id === instance.id
      })
      listCopy[index] = instance
      state.list = listCopy
    }
  },
  actions: {
    getList({commit}) {
      Address.list().then(res => {
        commit('init', res.data.lists)
      })
    },
    addAction({commit}, instance) {
        // 模拟生成id
      instance.id =parseInt( Math.random()*100000)
      Address.add(instance).then(res => {
        commit('add', instance)
      })
    },
    removeAction({commit}, id) {
      Address.remove(id).then(res => {
        commit('remove', id)
      })
    },
    setDefaultAction({commit}, id) {
      Address.setDefault(id).then(res => {
        commit('setDefault', id)
      })
    },
    updateAction({commit}, instance) {
      Address.update(instance).then(res => {
        commit('update', instance)
      })
    }
  }

})

export default store
