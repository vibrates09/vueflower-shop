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
    cart: [],
    orders: []
  },
  getters: {
    cartCount: state => {
      let cartCount = 0
      state.cart.forEach(el => {
        cartCount = el.quantity + cartCount
        return cartCount
      })
      return cartCount
    },
    flowers: state => state.flowers,
    currentComponent: state => state.currentComponent,
    cart: state => state.cart,
    orders: state => state.orders,
    orderCount: state => state.orders.length
  },
  mutations: {
    addToCart (state, payload) {
      const res = state.cart.find(el => el.refs.id === payload.id)
      if (res) {
        res.quantity = res.quantity + 1
      } else {
        state.cart.push({
          refs: payload, // representative
          quantity: 1
        })
      }
    },
    changeComponent (state, payload) {
      state.currentComponent = payload
    },
    proceedToPay (state, payload) {
      state.orders.push({
        id:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        amount: payload.quantity * payload.refs.price,
        ...payload
      })
    },
    reduceCart (state, payload) {
      const res = state.cart.find(el => el.refs.id === payload.id)
      if (res) {
        if (res.quantity > 1) {
          res.quantity--
        }
      }
    },
    removeFromCart (state, payload) {
      const res = state.cart.findIndex(el => el.refs.id === payload)
      if (res >= 0) {
        state.cart.splice(res, 1)
      }
    }
  },
  actions: {
    addToCartAsync ({ commit }, payload) {
      commit('addToCart', payload)
    },
    changeComponentAsync ({ commit }, payload) {
      commit('changeComponent', payload)
    },
    proceedToPayAsync ({ commit }, payload) {
      commit('proceedToPay', payload)
      commit('removeFromCart', payload.refs.id)
    },
    reduceCartAsync ({ commit }, payload) {
      commit('reduceCart', payload)
    },
    removeFromCartAsync ({ commit }, payload) {
      commit('removeFromCart', payload)
    }
  }
})