import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentComponent: 'home',
    cart: [],
    flowers: [
      { id: 1, url: './img/flower1.jpg', stockCount: 50, flowerName: 'Beautiful Mom', price: 15 },
      { id: 2, url: './img/flower2.jpg', stockCount: 75, flowerName: 'Elegance White Roses', price: 12 },
      { id: 3, url: './img/flower3.jpg', stockCount: 42, flowerName: 'Contessa Seasonal Flowers', price: 21 },
      { id: 4, url: './img/flower4.jpg', stockCount: 25, flowerName: 'Red With Love', price: 18 }
    ],
    orders: [],
    notif: {
      message: 'Something went wrong',
      notify: false,
      type: 'danger'
    }
  },

  getters: {
    cart: state => state.cart,
    cartCount: state => {
      let cartCount = 0
      state.cart.forEach(el => {
        cartCount = el.quantity + cartCount
        return cartCount
      })
      return cartCount
    },
    currentComponent: state => state.currentComponent,
    flowers: state => state.flowers,
    notif: state => state.notif,
    notifTimeout: state => state.notifTimeout,
    orderCount: state => state.orders.length,
    orders: state => state.orders
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
    notifyUser (state, payload) {
      state.notif.notify = false

      clearTimeout(state.notifTimeout)

      setTimeout(() => {
        state.notif = payload
      }, 200)

      state.notifTimeout = setTimeout(() => {
        state.notif.notify = false
      }, 3000)
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
      commit('notifyUser', {
        type: 'success',
        message: 'Added to cart',
        notify: true
      })
    },
    changeComponentAsync ({ commit }, payload) {
      commit('changeComponent', payload)
    },
    proceedToPayAsync ({ commit }, payload) {
      commit('proceedToPay', payload)
      commit('removeFromCart', payload.refs.id)
      commit('notifyUser', {
        type: 'success',
        message: 'Successfully ordered',
        notify: true
      })
    },
    reduceCartAsync ({ commit }, payload) {
      commit('reduceCart', payload)
    },
    removeFromCartAsync ({ commit }, payload) {
      commit('removeFromCart', payload)
      commit('notifyUser', {
        type: 'danger',
        message: 'Successfully removed from cart',
        notify: true
      })
    }
  }
})