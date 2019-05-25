import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentComponent: 'home',
    cartCount: 0,
    flowers: [
      { id: 1, url: './img/flower1.jpg', stockCount: 50, flowerName: 'Beautiful Mom', price: 15 },
      { id: 2, url: './img/flower2.jpg', stockCount: 75, flowerName: 'Elegance White Roses', price: 12 },
      { id: 3, url: './img/flower3.jpg', stockCount: 42, flowerName: 'Contessa Seasonal Flowers', price: 21 },
      { id: 4, url: './img/flower4.jpg', stockCount: 25, flowerName: 'Red With Love', price: 18 }
    ],
    cart: []
  },
  getters: {
    cartCount: state => state.cart.length,
    flowers: state => state.flowers,
    currentComponent: state => state.currentComponent,
    cart: state => state.cart

  },
  mutations: {
    addToCart (state, payload) {
      state.cart.push(payload)
    },
    changeComponent (state, payload) {
      state.currentComponent = payload
    }
  },
  actions: {
    addToCartAsync ({ commit }, payload) {
      commit('addToCart', payload)
    },
    changeComponentAsync ({ commit }, payload) {
      commit('changeComponent', payload)
      // commit('updateInventory')
    }
  }
})