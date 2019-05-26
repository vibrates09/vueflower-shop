<template>
  <div class="row">
    <div class="col-12 col-xs-12 col-sm-12 col-md-8">
      <Modal
        @handle="args => handleAction(args)"
        :warningMsg="warningMsg"
        :actionType="actionType"
        :productId="productId"
        :order="order"
      />

      <h2>Cart</h2>

      <div class="mt-3" v-if="cart.length === 0">There are no items in this cart</div>

      <div class="card border-light mb-3">
        <div class="row">
          <div class="offset-md-3 col-md-9">
            <div class="card-body pt-0 pb-0">
              <div>
                <div v-if="cart.length > 0" class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="customCheckbox"
                    class="custom-control-input"
                    v-model="selectAll"
                  >
                  <label for="customCheckbox" class="custom-control-label">
                    <h5>Select all</h5>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template v-for="(prod, idx) in cart">
        <div :key="idx" class="card mb-3" :class="prod.selected ? 'border-info' : ''">
          <div class="row">
            <div class="col-md-3 text-center">
              <img :src="prod.refs.url" class="img-fluid" :alt="prod.refs.flowerName">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      :id="`custom-${prod.refs.id}`"
                      class="custom-control-input"
                      v-model="cart[idx].selected"
                    >
                    <label :for="`custom-${prod.refs.id}`" class="custom-control-label">
                      <h5>{{prod.refs.flowerName}}</h5>
                    </label>
                  </div>

                  <button
                    type="button"
                    class="btn btn-danger"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    @click="setProductId(prod.refs.id)"
                  >Remove</button>
                </div>

                <div class="mb-3">Total: ${{ prod.refs.price * prod.quantity }}</div>

                <div class="input-group mb-3" style="width: 110px;">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-secondary text-center"
                      type="button"
                      :disabled="prod.quantity === 1"
                      @click.stop="reduceCart(prod.refs)"
                      id="button-addon1"
                    >-</button>
                  </div>
                  <input
                    type="text"
                    :value="prod.quantity"
                    readonly
                    class="form-control"
                    placeholder
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click.stop="addCart(prod.refs)"
                      id="button-addon2"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="col-12 col-xs-12 col-sm-12 col-md-4" v-if="cart.length > 0">
      <h2>Order Summary</h2>
      <div class="card order-details">
        <div class="card-body">
          <div class="d-flex mb-3 justify-content-between">
            <div>Subtotal ({{ orderSummary.totalQuantity }} item(s))</div>
            <div>
              <strong>₱{{ orderSummary.total }}.00</strong>
            </div>
          </div>

          <div class="d-flex mb-3 justify-content-between">
            <div>Total</div>
            <div>
              <strong>₱{{ orderSummary.total }}.00</strong>
            </div>
          </div>

          <button
            @click="setOrder"
            type="button"
            :disabled="!validToProceed"
            class="btn btn-info btn-block"
            data-target="#exampleModalCenter"
            data-toggle="modal"
          >Proceed to payment</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import Modal from './Modal.vue'

export default {
  name: 'cart',
  components: {
    Modal
  },
  computed: {
    ...mapGetters({
      cart: 'cart'
    }),
    orderSummary () {
      const res = this.cart.filter(el => el.selected === true)
      if (res.length > 0) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue

        const total = res.map(el => el.refs.price * el.quantity).reduce(reducer)
        const totalQuantity = res.map(el => el.quantity).reduce(reducer)
        return {
          total,
          totalQuantity
        }
      }
      return 0
    },
    validToProceed () {
      return this.cart.map(el => el.selected).includes(true)
    },
    unselect () {
      return this.cart.map(el => el.selected).includes(false)
    }
  },
  data: () => ({
    actionType: null,
    order: null,
    productId: null,
    selectAll: false,
    selectedItem: [],
    exceptUncheck: true,
    warningMsg: {
      headerText: 'Warning',
      body: 'Something went wrong',
      btnType: 'damger'
    }
  }),
  watch: {
    selectAll (val) {
      if (val) {
        this.$store.dispatch('toggleSelectAllAsync', val)
      }
      if (this.exceptUncheck) {
        this.$store.dispatch('toggleSelectAllAsync', val)
      } else {
        this.exceptUncheck = true
      }
    },
    unselect (val) {
      if (val) {
        this.exceptUncheck = false
        this.selectAll = false
      }
    }
  },
  methods: {
    addCart (flower) {
      this.$store.dispatch('addToCartAsync', flower)
    },
      handleAction (args) {
      switch (args.actionType) {
        case 'remove-from-cart':
          this.removeFromCart(args.id)
          break
        case 'proceed-payment':
          this.proceedToPay()
        default:
          break
      }
    },
    proceedToPay () {
      const res = this.cart.filter(el => el.selected === true)
      this.$store.dispatch('proceedToPayAsync', res)
    },
    reduceCart (flower) {
      this.$store.dispatch('reduceCartAsync', flower)
    },
    removeFromCart (id) {
      this.$store.dispatch('removeFromCartAsync', id)
    },
    selectItem (id) {
      this.$store.dispatch('toggleSelectItemAsync', id)
    },
    setModalText (args) {
      this.warningMsg = Object.assign({}, args)
    },
    setProductId (id) {
      this.actionType = 'remove-from-cart'
      this.productId = id
      this.setModalText({
        headerText: 'Remove from cart',
        body: 'Are you sure you want to delete this item?',
        btnType: 'danger'
      })
    },
    setOrder () {
      this.actionType = 'proceed-payment'
      // this.order = prod
      this.setModalText({
        headerText: 'Proceed to order',
        body: 'Make sure you check your order before confirming it',
        btnType: 'info'
      })
    }
  }
}
</script>
