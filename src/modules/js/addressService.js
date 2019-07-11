import fetch_g from 'js/fetch_g.js'
import fetch_p from 'js/fetch_p.js'
import url from 'js/api.js'

class Address {
  static list() {
    return fetch_g(url.addressLists)
  }

  static add(data) {
    return fetch_p(url.addressAdd, data)
  }

  static remove(id) {
    return fetch_p(url.addressRemove, id)
  }

  static update(data) {
    return fetch_p(url.addressUpdate, data)
  }

  static setDefault(id) {
    return fetch_p(url.addressSetDefault, id)
  }
}

export default Address