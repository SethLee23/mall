import 'css/common.css'
import './search.css'
import 'vant/lib/index.css';

import { Vue, axios, BackToTop, url, loading, qs} from 'js/entrance.js'
import {InfiniteScroll} from 'mint-ui';
import { PullRefresh } from 'vant';

Vue.use(InfiniteScroll);
Vue.use(PullRefresh);
Vue.config.productionTip = false

let { keyword, id } = qs.parse(location.search.substr(1))
new Vue({
  el: '#app1',
  data: {
    keyword: '',
    searchList: null,
    isLoading: false,
    pageNum: 1,
    pageSize: 6,
    allLoaded: false,
    busy: false,
    loading_1: false,
  },
  created() {
    this.loading_1 = true
    this.keyword = keyword
    this.getLists(undefined)
  },
  mounted() {

  },
  methods: {
    say(){
      console.log('scroll')
    },
    toSearch(e){
      e.preventDefault()
      location.href = `search.html?keyword=${this.keyword}&id=${this.subId||null}`
    },
    onRefresh() {
      this.isLoading = true
      this.getLists()
    },
    getLists(flag) {
      // if(flag)return 
      axios.get(url.searchList, {
        params: {
          keyword,
          id,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then((res) => {
        console.log(this.searchList)
        if (flag === undefined) {
          // 第一次加载数据
          this.searchList = res.data.lists;
          // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
        } else if (flag === true) {
          // 多次加载数据
          this.searchList = this.searchList ? this.searchList.concat(res.data.lists) : null
          if (this.pageNum >= this.pageSize) {
            this.allLoaded = true
          }
        }
        this.busy = false;
        this.isLoading = false
        this.loading_1 = false
      })

    },
    loadmore() {
      this.busy = true;
      if (this.allLoaded) return
      this.pageNum++;
      this.getLists(true);
    }
  },
  components: {
    'back-to-top': BackToTop,
    loading,
  }
})
