<template>
  <div :style="{ width: width  }" class="text-center">
    <input
      v-show="edit"
      ref='editableInput'
      style="text-align:center;width: 85%"
      type="number"
      :min="min"
      :max="max"
      :value="valueLocal"
      @blur="setValue"
      @keyup.enter="setValue"
    />
    <div v-show="!edit" ref='editableText' @click="edit = true" >
      {{ valueLocal }}
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  props: {
    value: { type: String, default: null },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    width: { type: String, default: "100px" },
    fontSize: {type: String, default: "16px"}
  },
  data() {
    return {
      edit: false,
      valueLocal: this.value,
    }
  },
  watch: {
    value() {
      this.valueLocal = this.value
    },
    edit(v) {
      if (v) {
        this.$refs.editableInput.focus()
        this.$nextTick(() => this.$refs.editableInput.focus())
      } else {
        this.$refs.editableText.focus()
        this.$nextTick(() => this.$refs.editableInput.focus())
      }
    }
  },
  methods: {
    setValue(event) {
      // reset invalid values to 1
      let value = event.target.value ? event.target.value : this.valueLocal
      if(this.max < event.target.value) {
        value = this.valueLocal;
        this.$notifier.showMessage({
                  content: this.$i18n.t('QuantitNotAvailable'),
                  color: 'error',
                })
      }
      this.valueLocal = value
      this.edit = false
      this.$emit('input', parseInt(value))
    }
  },
}
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>