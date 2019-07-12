// import 'css/common.css'
import './goods_base.css'
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import 'vant/lib/index.css';
import swiper from '../../components/swiper'
import qs from 'qs'
import BackToTop from '../../components/backToTop'
import loading from '../../components/loading'
let {id} = qs.parse(location.search.substr(1))
import {
  PullRefresh
} from 'vant';

Vue.use(PullRefresh);
let navConfig = [{
  "type": "goods",
  "content": "商品详情"
}, {
  "type": "sales",
  "content": " 本店成交"
}]
new Vue({
  el: '#app',
  data: {
    lists: [],
    imgList: null,
    detailsLists: null,
    dealLists: null,
    curIndex: 0,
    navConfig: navConfig,
    showPopout: false,
    // addCart: true,
    itemNumber: 1,
    showToast: false,
    cart: false,
    type: 0,
    loading_1: false,
  },
  created() {
    this.loading_1 = true
    this.getGoodDetails()
    this.getGoodDeal()
  },
  methods: {
    getGoodDetails() {
      axios.get(url.details, {
        params: {
          id
        }
      }).then((res) => {
        this.imgList = res.data.data.img
        this.detailsLists = res.data.data
        this.formatImgList()
        this.loading_1 = false
      })
    },
    getGoodEvaluation() {
      axios.get(url.evaluation, {
        params: {
          id
        }
      }).then(() => {

      })
    },
    getGoodDeal() {
      axios.get(url.deal, {
        params: {
          id
        }
      }).then((res) => {
        this.dealLists = res.data.data.lists
      })
    },
    formatImgList() {
      this.imgList.forEach(item => {
        this.lists.push({
            clickUrl:'',
            img: item
        })
        })
    },
    changeNav(index) {
      this.curIndex = index
    },
    chooseType(type) {
      this.showPopout = true
      this.type = type
      console.log(this.type)
    },
    hide() {
      this.showPopout = false
    },
    changeItem(n) {
      if (this.itemNumber <= 1 && n == '-1') return
      this.itemNumber = (this.itemNumber - 0) + (n - 0)
    },
    addToCart() {
      axios.post(url.add, {
        params: {
          id,
          numbwr: this.itemNumber
        }
      }).then((res) => {
        if (res.status === 200) {
          console.log('ok')
          this.showPopout = false
          this.cart = true
          this.showToast = true
          setTimeout(() => {
            this.showToast = false
          }, 1000)
        }
      })
    }
  },
  components: {
    swiper,
    'back-to-top': BackToTop,
    loading,
  },
  filters: {
    formatPrize(prize) {
      return prize.toFixed(2)
    }
  }
  // mixins:[mixin]
})
