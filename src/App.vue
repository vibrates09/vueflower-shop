<template>
  <div>
    <alert :notify="notif.notify" :message="notif.message" :type="notif.type" />
    <nav-bar />
    <main>
      <div class="container" style="margin-top: 60px;margin-bottom: 60px;">
        <components :is="currentComponent" />
      </div>
    </main>
    <footer>
      <div class="container">
      </div>
    </footer>
  </div>
</template>

<script>


import NavBar from './components/Nav.vue'
import Home from './components/Home.vue'
import Order from './components/Order.vue'
import Cart from './components/Cart.vue'
import Alert from './components/Alert.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Alert,
    Cart,
    Home,
    NavBar,
    Order
  },
  computed: {
    ...mapGetters({
      currentComponent: 'currentComponent',
      notif: 'notif'
    })
  }
}
</script>
