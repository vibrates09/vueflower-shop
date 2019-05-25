<template>
  <div class="example">
    <nav-bar />
    <main>
      <div class="container" style="margin-top: 60px;">
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
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Cart,
    Home,
    NavBar,
    Order
  },
  computed: {
    ...mapGetters({
      currentComponent: 'currentComponent'
    })
  }
}
</script>
