<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="timeout"
    right
    rounded
  >
    <span class="text-p" :class="textColor+'--text'">{{ message }}</span>
    <template #action="{ attrs }">
      <v-btn
        :color="textColor"
        text
        v-bind="attrs"
        @click="show = false"
      >
        {{ $t('Close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: null,
      color: 'primary',
      textColor: 'white',
      timeout: -1,
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.textColor = state.snackbar.textColor
        this.timeout = state.snackbar.timeout
        this.show = true
      }
    })
  },
}
</script>
