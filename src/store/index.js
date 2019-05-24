import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: 0,
    flowers: [
      { id: 1, url: './img/flower1.jpg', stockCount: 50 },
      { id: 2, url: './img/flower2.jpg', stockCount: 75 },
      { id: 3, url: './img/flower3.jpg', stockCount: 42 },
      { id: 4, url: './img/flower4.jpg', stockCount: 25 }
    ]
  },
  getters: {
    cartCount: (state) => state.cart,
    flowers: (state) => state.flowers
  },
  mutations: {
    addToCart (state, payload) {
      state.cart = state.cart + payload
    }
  },
  actions: {
    addToCartAsync ({ commit }, payload) {
      commit('addToCart', payload)
    }
  }
})