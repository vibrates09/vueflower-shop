<template>
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">{{warningMsg.headerText}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">{{warningMsg.body}}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button
            type="button"
            data-dismiss="modal"
            class="btn"
            :class="`btn-${warningMsg.btnType}`"
            @click="confirmAction"
          >Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    warningMsg: {
      type: Object
    },
    actionType: {
      type: String,
      default: null
    },
    productId: {
      type: String|Number,
      default: null
    },
    order: {
      type: Object,
      default: null
    }
  },
  methods: {
    confirmAction () {
      switch (this.actionType) {
        case 'remove-from-cart':
          this.$emit('handle', {
            id: this.productId,
            actionType: this.actionType
          })
          break
        case 'proceed-payment':
          this.$emit('handle', {
            order: this.order,
            actionType: this.actionType
          })
        default:
          break
      }
    }
  }
}
</script>
