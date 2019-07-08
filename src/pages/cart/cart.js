import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
new Vue({
  el: '#app',
  data: {
    cartList: [],
    goodList: [],
    curShop: [],
    curIndex: -1,
    checked: false,
    editing: false,
    total: 0,
    // editingMsg: '编辑',
  },
  mounted() {
    this.getCartList() 
  },
  computed: {
    removeAllChecked(){
      return false
    },
    allChecked: {
      get() {
        if (this.cartList && this.cartList.length) {
          return this.cartList.every(shop => {
            return shop.checked
          })
        }
      },
      set(newVal) {
        this.cartList.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    totalPrice() {
      if (this.cartList && this.cartList.length) {
        console.log(1)
        let total = 0
        this.cartList.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              total += good.number * good.price
            }
          })
        })
        return total
      }
      return 0
    }
  },
  methods: {
    removeShop(shop, shopIndex) {
      console.log("removeShop")
    },
    removeItem(shop, good, index) {
      console.log("removeItem")
    },
    removeCheckAll() {
      console.log("removeAll")
    },
    reduce(good) {
      if (good.number <= 1) return
      axios.post(url.cartReduce, {
        id: good.id,
        number: good.number - 1
      }).then(res => {
        good.number--
      })
    },
    add(good) {
      axios.post(url.add, {
        id: good.id,
        number: good.number + 1
      }).then(res => {
        good.number++
      })
    },
    edit(shop, index) {
      this.editing = !this.editing
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.cartList.forEach((item, i) => {
        if (i !== index) {
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
    },
    checkShop(shop, index) {
      shop.checked = !shop.checked
      shop.goodsList.forEach((good) => {
        good.checked = shop.checked
      })
    },
    checkItem(shop, good, index) {
      good.checked = !good.checked
      shop.checked = shop.goodsList.every(good => {
        return good.checked
      })
    },
    checkAll() {
      this.allChecked = !this.allChecked
    },
    getCartList() {
      axios.get(url.cartLists).then((res) => {
        let cartList = res.data.cartList
        cartList.forEach((shop) => {
          shop.checked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach((list) => {
            list.checked = false
          })
        })
        this.cartList = cartList
      })
    }
  },
  components: {},
})
