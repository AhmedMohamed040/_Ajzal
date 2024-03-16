// import colors from 'vuetify/es5/util/colors';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Ajzal',
    title: 'Ajzal-ecommerce',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },

      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_small.svg' },
      {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.2.96/css/materialdesignicons.min.css'
    }
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;900&amp;display=swap',
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/_global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/notifier.js', mode: 'client' },
    { src: '~/plugins/apexcharts', mode: 'client' },
     { src: '~/plugins/moment.js', mode: 'client' },
    { src: '~/plugins/vue-slick', mode: 'client' },
    { src: '~/plugins/vue-svg-inline-plugin.client.js', mode: 'client' },
    { src: '~/plugins/vue-html2pdf', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'nuxt-webfontloader',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.ajzal.sa/api/v1/',
    // baseURL: 'http://localhost:5000/api/v1/',
    // baseURL: 'http://192.168.1.102:5000/api/v1/',
    https: false,
  },
  i18n: {
    locales: [
      {
        code: 'en',
        flag: '@/assets/images/flags/us.svg',
        iso: 'en-US',
        file: 'en.js',
        dir: 'ltr',
      },
      {
        code: 'ar',
        flag: '@/assets/images/flags/sa.svg',
        iso: 'ar-SA',
        file: 'ar.js',
        dir: 'rtl',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ar',
    vueI18n: {
      silentTranslationWarn: true,
      silentFallbackWarn: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],

    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#BD9F34',
          secondary: '#252F3C',
          accent: '#F3F5F6',
          success: '#33D067',
          danger: '#FF5353',
          warning: '#FFCD4E',
          // warning: '#FF8A48',
          info: '#5e5ce6',
          dark: '#242939',
          black: '#242939',
          background: '#f2f3f8',
          color: '#0F3460',
          grey: '#AEB4BE',
        },
      },
    },
  },
  // webfontloader: {
  //   google: {
  //     families: ['Open+Sans:wght@300;400;600;700;800'],
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
    vendor: ['moment', 'moment-timezone']
  },
}
