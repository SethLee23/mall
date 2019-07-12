import qs from 'qs'
import $ from "jquery";
import axios from 'axios'
import Address from './addressService'
import url from './api'
import Cart from './cartService'
import Vue from 'vue'
import Velocity from 'velocity-animate'
import Footer from '../../components/footer.vue'
import loading from '../../components/loading'
import swiper from '../../components/swiper'
import BackToTop from '../../components/backToTop'
import member from '../../pages/member/components/member.vue'
import all from '../../pages/member/components/all.vue'
import address from '../../pages/member/components/address.vue'
import form from '../../pages/member/components/form.vue'
import router from '../../pages/member/router/index'

export {
  qs,
  $,
  axios,
  Address,
  url,
  Cart,
  Vue,
  Velocity,
  Footer,
  loading,
  swiper,
  BackToTop,
  member,
  address,
  form,
  router,
  all,
}
