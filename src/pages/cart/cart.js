import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
new Vue({
  el: '#app',
  data: {
    cartList: null,
    goodList: [],
    curShop: [],
    curIndex: -1,
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    check(item, index) {
      console.log(item, index)
    },
    checkItem(item, index) {
      item.checked = !item.checked
    },
    getCartList() {
      axios.get(url.cartLists).then((res) => {
        let cartList = res.data.cartList
        cartList.forEach((item) => {
          item.goodsList.forEach((list) => {
            list.checked = false
          })
        })
        this.cartList = cartList
      })
    }
  },
  components: {},
})
