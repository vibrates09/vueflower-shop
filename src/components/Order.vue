<template>
  <div class="row">
    <div class="col-12">
      <h2>Orders</h2>
      <div class="mt-3" v-if="orders.length === 0">There are no orders to delivered</div>

      <div class="card mb-3" v-for="order in orders" :key="order.order_id">
        <div class="card-header d-flex justify-content-between">
          <div>
            Order:
            <a href="javascript:void(0)">{{order.order_id}}</a>
          </div>
          <div>
            <h5>Amount to Pay: ${{order.amountToPay}}</h5>
          </div>
        </div>
        <div class="card-body">
          <div class="card mb-3" v-for="odr in order.products" :key="odr.id">
            <div class="row">
              <div class="col-md-3 text-center">
                <img :src="odr.image" class="card-img" style="width: 12rem;" :alt="odr.flowerName">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">{{odr.flowerName}}</h5>
                  <p class="card-text">Quantity: {{ odr.quantity }}</p>
                  <h4>Amount to Pay: ${{odr.amount}}</h4>
                </div>
              </div>
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
