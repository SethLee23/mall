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
import footer from '../../components/Footer'
import url from 'js/api.js'
import 'vant/lib/index.css';
import swiper from '../../components/swiper'
import qs from 'qs'
let {
  id
} = qs.parse(location.search.substr(1))
import {
  PullRefresh
} from 'vant';

Vue.use(PullRefresh);

new Vue({
  el: '#goodsContainer',
  data: {
    lists: null,
    imgList: null,
    detailsLists: null
  },
  created() {
    this.getGoodDetails()
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
        console.log(this.detailsLists)
        this.formatImgList()
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
      }).then(() => {

      })
    },
    formatImgList() {
      let obj = {}
      let arr = []
      this.imgList.forEach((item) => {
        obj['img'] = item
        arr.push(obj)
      })
      this.lists = arr
    }
  },
  components: {
    // 's-footer': footer,
    swiper
  },
  filters: {
    formatPrize(prize) {
      return '￥' + prize.toFixed(2)
    }
  }
  // mixins:[mixin]
})
