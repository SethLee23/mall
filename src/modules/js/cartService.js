import fetch_g from 'js/fetch_g.js'
import fetch_p from 'js/fetch_p.js'
import url from 'js/api.js'

class Cart {
  static list() {
    return fetch_g(url.cartLists)
  }
  static add(data) {
    return fetch_p(url.add,data)
  }
  static reduce(data) {
    return fetch_p(url.cartReduce,data)
  }
  static remove(id) {
    return fetch_p(url.cartRemove,id)
  }
  static mRemove(ids) {
    return fetch_p(url.cartMremove,ids)
  }
  static update(data) {
    return fetch_p(url.cartUpdate,data)
  }
}

export default Cart
