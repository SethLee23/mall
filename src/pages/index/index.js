import './index.css'
import 'css/common.css'

import Vue from 'vue'
import url from 'js/api.js'
import Axios from 'axios';
import {
  InfiniteScroll
} from 'mint-ui';

import swiper from '../../components/swiper'
import Footer from '../../components/Footer'
import BackToTop from '../../components/backToTop'
Vue.use(InfiniteScroll);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {
    pageNum: 1,
    pageSize: 6,
    lists: null,
    topLists: null,
    loading: false,
    allLoaded: false,
    imgAndUrl: null
  },
  mounted() {
    // this.createSwiper()
    this.getLists()
    this.getBanner()
  },
  components: {
    swiper,
    's-footer':Footer,
    'back-to-top': BackToTop
  },
  methods: {
    getLists() {
      // 如果全部加载完直接返回
      if (this.allLoaded) return
      // 没加载完，不能动
      this.loading = true
      Axios.get(url.hotLists, {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        let curLists = res.data.lists
        if (curLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          this.lists = this.lists.concat(curLists)
        } else {
          this.lists = curLists
        }
        this.topLists = res.data.topLists
        this.loading = false
        this.pageNum++
      })
    },
    getBanner(){
      Axios.get(url.banner)
      .then((res)=>{
        this.imgAndUrl = res.data.lists
      })
    },
    goodDetail(id){
     location.href = `goods.html?id=${id}`;
    }
  }
})
