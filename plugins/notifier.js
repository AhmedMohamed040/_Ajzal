export default ({ store }, inject) => {
  inject('notifier', {
    showMessage({
      content = null,
      color = 'primary',
      textColor = 'white',
      timeout = 4000,
    }) {
      if (!content) return;
      
      store.commit('snackbar/showMessage', {
        content,
        color,
        textColor,
        timeout,
      })
    },
  })
}
