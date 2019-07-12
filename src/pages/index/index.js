import 'css/common.css'
import './index.css'
import { Vue, url, axios, swiper, Footer, BackToTop, loading } from 'js/entrance.js'
import { InfiniteScroll } from 'mint-ui';

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
    loading_1:false,
    allLoaded: false,
    imgAndUrl: null,
  },
  created() {
    this.loading_1 = true
    this.getLists()
    this.getBanner()
  },
  components: {
    swiper,
    's-footer':Footer,
    'back-to-top': BackToTop,
    loading
  },
  methods: {
    getLists() {
      // 如果全部加载完直接返回
      if (this.allLoaded) return
      // 没加载完，不能动
      this.loading = true
      axios.get(url.hotLists, {
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
        this.loading_1 = false
      })
    
    },
    getBanner(){
      axios.get(url.banner)
      .then((res)=>{
        this.imgAndUrl = res.data.lists
      })
    },
    goodDetail(id){
     location.href = `goods.html?id=${id}`;
    }
  }
})
