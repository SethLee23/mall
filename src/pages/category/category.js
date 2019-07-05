import 'css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'axios'
import footer from '../../components/Footer'
// import mixin from 'js/mixin'
import url from 'js/api.js'

// import Vant from 'vant';
// Vue.use(Vant);
import 'vant/lib/index.css';


import {
  PullRefresh
} from 'vant';

Vue.use(PullRefresh);
new Vue({
  el: '#app',
  data: {
    topList: null,
    subList: null,
    curIndex: 0,
    rank: null,
    hotGoods: null,
    hotShops: null,
    hotKeywords: null,
    isLoading: false,
    allLoaded: false,
    subId: '',
  },
  created() {
    this.getTopList()
    this.getRank()
    this.getSublist()
  },
  methods: {
    onRefresh() {
      this.isLoading = true
      if (this.curIndex === 0) {
        this.getRank()
      } else {
        this.getSublist(this.subId)
      }
    },
    getTopList() {
      axios.get(url.topList).then((res) => {
        this.topList = res.data.lists
      })
    },
    getSublist(id) {
      axios.get(url.subList, {
        id
      }).then((res) => {
        this.subList = res.data.data
        this.isLoading = false;
      })
    },
    getRank() {
      axios.get(url.rank).then((res) => {
        let r = res.data.data
        this.rank = r
        this.hotGoods = r.hotGoods
        this.hotShops = r.hotShops
        this.hotKeywords = r.hotKeywords
        // this.allLoaded = true
        console.log('ok')
        this.isLoading = false;
      })
    },
    changeView(item, index) {
      this.curIndex = index
      if (this.curIndex === 0) {
        this.getRank()
      } else {
        this.getSublist(item.id)
      }

    }
  },
  components: {
    's-footer': footer,
  },
  // mixins:[mixin]
})
