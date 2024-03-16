// state
export const state = () => ({
  phone: null,
})
// getters
export const getters = {
  phone: (state) => state.phone,
  
}
// actions
export const actions = {
  async sendOtp({ commit }, data) {
    const form = new FormData();
    form.append('phone', data)
    const res = await this.$axios.$post(`auth/phone/reset-password-and-send-otp`, form);
    // setPhone(data)
    return res;
  },
  async verifyOtp({ commit }, data) {
    const form = new FormData();
    form.append('phone', data.phone)
    form.append('otp', data.otp)
    const res = await this.$axios.$post(`auth/phone/verify-reset-password`, form);
    // setPhone(data)
    return res;
  },
  async resetPassword({ commit }, data) {
    const form = new FormData();
    form.append('phone', data.phone)
    form.append('password', data.password)
    form.append('token', data.token)
    const res = await this.$axios.$post(`auth/phone/reset-new-password`, form);
    // setPhone(data)
    return res;
  },
}
// mutations
export const mutations = {
  setPhone(state, data) {
    state.phone = data
  },
}
