<template>
  <div class="row">
    <h2>Cart</h2>
    <div class="col-12">
      <div class="card mb-3" v-for="(crt, i) in cart" :key="i">
        <div class="row">
          <div class="col-md-4">
            <img :src="crt.url" class="card-img" style="width: 12rem;" :alt="cart.flowerName">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{crt.flowerName}}</h5>
              <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
              <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'cart',
  computed: {
    ...mapGetters({
      cart: 'cart'
    })
  }
}
</script>
