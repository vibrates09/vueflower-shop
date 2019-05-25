<template>
  
  <div class="row">
    <div class="col-12">
      <h2>Orders</h2>
      <div class="mt-3" v-if="orders.length === 0">
        There are no orders to delivered
      </div>
      <div class="card mb-3" v-for="order in orders" :key="order.id">
        <div class="row">
          <div class="col-md-3 text-center">
            <img :src="order.refs.url" class="card-img" style="width: 12rem;" :alt="order.refs.flowerName">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">{{order.refs.flowerName}}</h5>
              <p class="card-text">Order <a href="javascript:void(0)">{{order.id}}</a></p>
              <p class="card-text">
                Quantity: {{ order.quantity }}
              </p>
              <h4>Amount to Pay: ${{order.amount}}</h4>
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
  name: 'order',
  computed: {
    ...mapGetters({
      orders: 'orders'
    })
  }
}
</script>
