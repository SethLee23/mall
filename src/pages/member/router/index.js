import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import member from '../components/member.vue'
import all from '../components/all.vue'
import address from '../components/address.vue'
import form from '../components/form.vue'
const routes = [{
    path: '/',
    component: member,
  },
  {
    path: '/address',
    name: 'address',
    component: address,

    children: [{
        path: '',
        redirect: 'all',
      }, 
      {
        path: 'all',
        name: 'all',
        component: all,
      },
      {
        path: 'form',
        name: 'form',
        component: form,
      }
    ]
  }
]
export default new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
