export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    v: {
      get: function () {
        return this.visible
      },
      set: function (value) {
        this.$emit('update:visible', value)
      }
    }
  }
}
