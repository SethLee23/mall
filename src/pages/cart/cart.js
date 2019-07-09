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
    removePopout: false,
    // editingMsg: '编辑',
  },
  mounted() {
    this.getCartList()
  },
  computed: {
    removeLists() {
      if (this.editing) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []

    },
    removeAllChecked: {
      get() {
        return this.cartList.some(shop => {
          if (shop.editing) {
            return shop.removeChecked
          }
        })
      },
      set(newVal) {
        this.cartList.forEach(shop => {
          if (shop.editing) {
            shop.removeChecked = newVal
            shop.goodsList.forEach(good => {
              good.removeChecked = newVal
            })
          }
        })
        // return false
      }
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
    hidePopout() {
      this.removePopout = false
    },
    removeShopTitle(shop,index){
      if (shop.goodsList.length < 1) {
        // shop.editing = false
        this.cartList.forEach((s, i) => {
            s.editingMsg = '编辑'
        })
        this.cartList.splice(index, 1)
      }
      this.removePopout = false
    },
    confirmRemove() {
      // 移除单个
      if (this.removeData) {
        let {shop,shopIndex,good,goodIndex} = this.removeData
        shop.goodsList.splice(goodIndex, 1)
        this.removeShopTitle(shop,shopIndex)
      } else {
        // 移除多个
        let ids = []
        // 获取移除的数组的id
        this.removeLists.forEach((item) => {
          ids.push(item.id)
        })
        this.cartList.forEach((shop, index) => {
          if (shop.editing) {
            // 过滤出剩余
            shop.goodsList = shop.goodsList.filter(item => !ids.includes(item.id))
            this.removeShopTitle(shop,index)
          }
        })
      }
      this.editing = false
    },
    mRemove() {
      console.log(this.removeLists)
      this.removePopout = true
    },
    deleteGoods(shop, shopIndex, good, goodIndex) {
      this.removePopout = true
      this.removeData = {
        shop,
        shopIndex,
        good,
        goodIndex
      }
      console.log(this.removeData)
    },
    removeShop(shop, shopIndex) {
      shop.removeChecked = !shop.removeChecked
      shop.goodsList.forEach(good => {
        good.removeChecked = shop.removeChecked
      })
    },
    removeItem(shop, good, index) {
      console.log("removeItem")
      good.removeChecked = !good.removeChecked
      shop.removeChecked = shop.goodsList.every(good => {
        return good.removeChecked
      })
      console.log('shop.removeChecked')
      console.log(shop.removeChecked)
    },
    removeCheckAll() {
      console.log("removeAll")
      this.removeAllChecked = !this.removeAllChecked
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
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? index : -1
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
          shop.removeChecked = false
          shop.goodsList.forEach((list) => {
            list.checked = false
            list.removeChecked = false
          })
        })
        this.cartList = cartList
        console.log(this.cartList)
      })
    }
  },
  components: {},
})
