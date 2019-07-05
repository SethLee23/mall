import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import footer from '../../components/Footer'
import {
  InfiniteScroll
} from 'mint-ui';

//   import Footer from '../../components/Footer'
  import BackToTop from '../../components/backToTop'
Vue.use(InfiniteScroll);

// import mixin from 'js/mixin'
import url from 'js/api.js'
import 'vant/lib/index.css';

import {
  PullRefresh
} from 'vant';

Vue.use(PullRefresh);
Vue.config.productionTip = false
import qs from 'qs'
let {
  keyword,
  id
} = qs.parse(location.search.substr(1))
new Vue({
    el: '#app1',
    data: {
        keyword: '',
    searchList: null,
    isLoading: false,
    allLoaded: false,
    busy:false,
      pageNum: 1,
      pageSize: 6,
      lists: null,
      topLists: null,
      loading: false,
      allLoaded: false,
      imgAndUrl: null,
    },
    created() {
        this.keyword = keyword
      },
    mounted() {
      // this.createSwiper()
      this.getLists()
      this.getBanner()
    },
    components: {
    },
    methods: {
      getLists() {
        // 如果全部加载完直接返回
        if (this.allLoaded) return
        // 没加载完，不能动
        this.loading = true
        axios.get(url.searchList, {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
        //   let curLists = res.data.lists
        //   if (curLists.length < this.pageSize) {
        //     this.allLoaded = true
        //   }
        //   if (this.searchList) {
        //     this.searchList = this.searchList.concat(curLists)
        //   } else {
        //     this.searchList = curLists
        //   }
        // //   this.topLists = res.data.topLists
        //   this.loading = false
        //   this.pageNum++
        })
      },
      onRefresh() {
              this.isLoading = true
              this.getLists()
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
  
// new Vue({
//   el: '#app1',
//   data: {
//     keyword: '',
//     searchList: null,
//     isLoading: false,
//     pageNum: 1,
//     pageSize: 6,
//     allLoaded: false,
//     busy:false
//   },
//   created() {
//     this.keyword = keyword
//   },
//   mounted() {
//     this.getLists()
//   },
//   methods: {
//     onRefresh() {
//       this.isLoading = true
//       this.getLists()
//     },
//     getLists(flag) {
//         console.log(123)
//         // if(flag)return 
//       axios.get(url.searchList, {
//         params: {
//           keyword,
//           id,
//           pageNum: this.pageNum,
//           pageSize: this.pageSize
//         }
//       }).then((res) => {
//         if(flag){
//             // 多次加载数据
//             this.searchList = this.searchList.concat(res.data.lists);
//             if(res.data.lists.length == 0){
//                 this.allLoaded = true
//                 this.busy = true;
//             }else{
//                 this.busy = false;
//             }
//         }else{
//             // 第一次加载数据
//             this.searchList = res.data.lists;
//             // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
//             this.busy = false;
//         }
//         this.isLoading = false
//       })
//     },
//     loadmore() {
//         this.busy = true;
//         if(this.allLoaded)return
//             // this.pageNum ++;
//             // this.getLists(true);
//     }
//   },
//   components: {
//       'back-to-top': BackToTop
//   }
// })
