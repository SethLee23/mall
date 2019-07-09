import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
  
 export default new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })