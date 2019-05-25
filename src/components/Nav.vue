<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="javascript:void(0)" @click="changeComponent('home')">VueFlower Shop</a>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)" @click="changeComponent('order')">My Orders
            <span class="badge badge-info">{{orderCount > 0 ? orderCount : '' }}</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)" @click="changeComponent('cart')">
            My Cart
            <span class="badge badge-info">{{cartCount > 0 ? cartCount : '' }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      cartCount: 'cartCount',
      orderCount: 'orderCount'
    })
  },
  methods: {
    changeComponent (componentName) {
      this.$store.dispatch('changeComponentAsync', componentName)
    }
  }
}
</script>

