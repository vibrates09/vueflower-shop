<template>
  <div
    v-if="notify"
    class="alert animated faster fadeInRight m-3 mr-3 position-fixed position-top-right fade show"
    :class="`alert-${type}`"
    role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    message: {
      type: String,
      default: 'Something went wrong'
    },
    type: {
      type: String,
      default: 'danger'
    },
    notify: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.position-top-right {
  right: 16px;
  top: 16px;
  z-index: 1
}
</style>
