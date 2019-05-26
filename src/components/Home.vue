<template>
  <div class="row">
    <div
      v-for="flower in flowers"
      :key="flower.id"
      class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3"
    >
      <div class="card">
        <img class="card-img-top" :src="flower.url" alt srcset>
        <div class="card-body">
          <h5
            class="card-title"
          >{{flower.flowerName.length > 21 ? flower.flowerName.slice(0, 20) + '...' : flower.flowerName }}</h5>
          <div class="d-flex justify-content-between">
            <div>
              <h5 class="card-title mt-2">$ {{flower.price}}</h5>
            </div>
            <button class="btn btn-info" @click="addToCartHandle(flower)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../img/flower1.jpg'
import '../img/flower2.jpg'
import '../img/flower3.jpg'
import '../img/flower4.jpg'

export default {
  name: 'home',
  computed: {
    ...mapGetters({
      cartCount: 'cartCount',
      flowers: 'flowers'
    })
  },
  methods: {
    addToCartHandle (flower) {
      this.$store.dispatch('addToCartAsync', flower)
    }
  }
}
</script>
