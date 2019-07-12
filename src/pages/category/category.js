import 'css/common.css'
import './category.css'
import 'vant/lib/index.css';
// import mixin from 'js/mixin'

import {Vue,axios,Footer,url,loading} from 'js/entrance.js'
import {PullRefresh} from 'vant';
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
    keyword: '',
    value: '',
    loading_1: false,
  },
  created() {
    this.loading_1 = true
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
        this.loading_1 = false
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
        this.isLoading = false;
      })
    },
    changeView(item, index) {
      this.curIndex = index
      if (this.curIndex === 0) {
        // this.getRank()
      } else {
        this.getSublist(item.id)
      }
    },
    toSearch(e, name, id) {
      e.preventDefault()
      if (name, id) {
        location.href = `search.html?keyword=${name}&id=${id}`
      } else {
        location.href = `search.html?keyword=${this.keyword}&id=${this.subId||null}`
      }
    }

  },
  components: {
    's-footer': Footer,
    loading,
  },
  filters: {
    formatPrize(prize) {
      return '￥' + prize.toFixed(2)
    }
  }
  // mixins:[mixin]
})
