export const state = () => ({
  content: null,
  color: 'primary',
  textColor: 'white',
  timeout: 4000,
})

export const mutations = {
  showMessage (state, payload) {
    state.content = payload.content
    state.color = payload.color
    state.textColor = payload.textColor
    state.timeout = payload.timeout
  }
}
