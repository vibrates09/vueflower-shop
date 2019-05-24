<template>
  <div class="example">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">VueFlower Shop </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">My Orders</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">My Cart
              <span class="badge badge-info">{{cartCount}}</span>
            </a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li> -->
        </ul>
      </div>
    </nav>

    <main>
      <div class="container mt-3">
        <div class="row">
          <div v-for="idx in 4" :key="idx" class="col-sm-12 col-md-4 mb-3">
            <div class="card">
              <div class="text-center">
                <img class="img-fluid" src="./img/flower1.jpg" alt="" srcset="">
              </div>
              <button class="btn btn-info mt-3">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="container">
      </div>
    </footer>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from './img/flower1.jpg'
export default {
  computed: {
    ...mapGetters({
      cartCount: 'cartCount'
    })
  },
  data () {
    return {
      msg: 'Hello world!!!!!!!!!!!!!!!!!!!!!!!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>