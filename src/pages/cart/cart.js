import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import Velocity from 'velocity-animate'
import Cart from 'js/cartService'
import loading from '../../components/loading'
new Vue({
  el: '#app',
  data: {
    cartList: [],
    editing: false,
    removePopout: false,
    loading: false,
    loading_1: false,
  },
  created() {
    this.loading = true
    this.loading_1 = true
    this.getCartList()
  },
  computed: {
    // 需要移除的商品列表
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
    // 移除商品呢时候的全选状态
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
      }
    },
    // 选中商品得全选状态
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
    start(e, good) {
      good.startX = e.changedTouches[0].clientX
    },
    end(e, shopIndex, good, goodIndex) {
      let endX = e.changedTouches[0].clientX
      let left
      if (good.startX - endX > 100) {
        left = '-60px'
      }
      if (endX - good.startX > 100) {
        left = '0px'
      }
      Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
        left
      })
    },
    hidePopout() {
      this.removePopout = false
    },
    removeShopTitle(shop, index) {
      if (shop.goodsList.length < 1) {
        // shop.editing = false
        this.cartList.forEach((s, i) => {
          s.editingMsg = '编辑'
        })
        this.cartList.splice(index, 1)
        this.editing = false
      }
      this.removePopout = false
    },
    // 确认移除商品
    confirmRemove() {
      // 移除单个
      if (this.removeData) {
        let {
          shop,
          shopIndex,
          good,
          goodIndex
        } = this.removeData

        Cart.remove(good.id).then(res => {
          if (res.status == 200) {
            shop.goodsList.splice(goodIndex, 1)
            this.removeShopTitle(shop, shopIndex)
          }
        })
      } else {
        // 移除多个
        let ids = []
        // 获取移除的数组的id
        this.removeLists.forEach((item) => {
          ids.push(item.id)
        })
        Cart.mRemove(ids).then(res => {
          this.cartList.forEach((shop, index) => {
            if (shop.editing) {
              // 过滤出剩余
              shop.goodsList = shop.goodsList.filter(item => !ids.includes(item.id))
              this.removeShopTitle(shop, index)
            }
          })
        })
      }
    },
    mRemove() {
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
    },
    removeCheckAll() {
      this.removeAllChecked = !this.removeAllChecked
    },
    reduce(good) {
      if (good.number <= 1) return
      Cart.reduce({
        id: good.id,
        number: good.number + 1
      }).then(res => {
        good.number--
      })
    },
    add(good) {
      Cart.add({
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
    checkShop(shop, shopIndex) {
      let attr = shop.editing ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach((good) => {
        good[attr] = shop[attr]
      })
    },
    checkItem(shop, good, index) {
      let attr = shop.editing ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    checkAll() {
      this.allChecked = !this.allChecked
    },
    getCartList() {
      Cart.list().then((res) => {
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
        this.loading = false
        this.loading_1 = false
      })
    }
  },
  filters: {
    formatPrice(price) {
      return price.toFixed(2)
    }
  },
  components: {
    loading,
  },
})
