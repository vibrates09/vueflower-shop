import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: 5
  },
  getters: {
    cartCount: (state) => state.cart
  },
  mutations: {
    addToCart (state) {
      state.count++
    }
  },
  actions: {
    addToCartAsync (payload) {
      
    }
  }
})