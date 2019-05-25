<template>
  <div class="row">
    <div class="col-12">
      <h2>Cart</h2>
      <div class="mt-3" v-if="cart.length === 0">
        There are no items in this cart
      </div>
      <div class="card mb-3" v-for="prod in cart" :key="prod.id">
        <div class="row">
          <div class="col-md-3 text-center">
            <img :src="prod.refs.url" class="card-img" style="width: 12rem;" :alt="prod.refs.flowerName">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{prod.refs.flowerName}}</h5>
                <button class="btn btn-danger" @click="removeFromCart(prod.refs.id)">Remove</button>
              </div>
              <div class="mb-3">
                Total: ${{ prod.refs.price * prod.quantity }}
              </div>
              <div class="input-group mb-3" style="width: 110px;">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary text-center" type="button" :disabled="prod.quantity === 1" @click="reduceCart(prod.refs)" id="button-addon1">-</button>
                </div>
                <input type="text" :value="prod.quantity" readonly class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="addCart(prod.refs)" id="button-addon2">+</button>
                </div>
              </div>
              <button class="btn btn-info" @click="proceedToPay(prod)">Proceed to payment</button>
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
  },
  methods: {
    addCart (flower) {
      this.$store.dispatch('addToCartAsync', flower)
    },
    proceedToPay (prod) {
      this.$store.dispatch('proceedToPayAsync', prod)
    },
    reduceCart (flower) {
      this.$store.dispatch('reduceCartAsync', flower)
    },
    removeFromCart (id) {
      this.$store.dispatch('removeFromCartAsync', id)
    }
  }
}
</script>
