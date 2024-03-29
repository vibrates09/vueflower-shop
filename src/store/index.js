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
          quantity: 1,
          selected: false
        })
      }
    },
    changeComponent (state, payload) {
      state.currentComponent = payload
    },
    proceedToPay (state, payload) {
      state.orders.push(payload)
    },
    notifyUser (state, payload) {
      state.notif.notify = false

      clearTimeout(state.notifTimeout)

      setTimeout(() => {
        state.notif = payload
      }, 200)

      state.notifTimeout = setTimeout(() => {
        state.notif.notify = false
        clearTimeout(state.notifTimeout)
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
    },
    removeSelectedFromCart (state, payload) {
      payload.forEach(el => {
        const res = state.cart.findIndex(crt => crt.refs.id === el)
        state.cart.splice(res, 1)
      })
      // state.cart.map(el => el.refs.id === )
    },
    toggleSelectItem (state, payload) {
      const res = state.cart.find(el => el.refs.id === payload)
      res.selected = !res.selected
    },
    toggleSelectAll (state, payload) {
      state.cart.forEach(el => el.selected = payload)
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
      const overall = []
      payload.map(el => {
        overall.push({
          product_id: el.refs.id,
          flowerName: el.refs.flowerName,
          price: el.refs.price,
          quantity: el.quantity,
          image: el.refs.url,
          amount: el.refs.price * el.quantity
        })
      })
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const order = {
        order_id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        products: overall,
        amountToPay: overall.map(el => el.amount).reduce(reducer)
      }
      commit('proceedToPay', order)
      commit('removeSelectedFromCart', payload.map(el => el.refs.id))
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
    },
    toggleSelectAllAsync ({ commit }, payload) {
      commit('toggleSelectAll', payload)
    },
    toggleSelectItemAsync ({ commit }, payload) {
      commit('toggleSelectItem', payload)
    }
  }
})