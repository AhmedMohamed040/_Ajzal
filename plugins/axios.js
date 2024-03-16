/* eslint-disable no-console */
export default function ({ app, store, $axios }) {
  $axios.onRequest(config => {
    console.log(app.i18n.localeProperties.iso)
    config.headers['Accept-Language'] = app.i18n.localeProperties.iso;
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token
  });

  $axios.onError(error => {
    const token = localStorage.getItem('accessToken');
    if(error.response.status === 401) {
      if (token) {
        store.commit('setSignedIn', false)
        store.commit('setUser') // emptying user state
        store.commit('setRole') // emptying user state
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        location.reload()
      }
    }
  });

}
