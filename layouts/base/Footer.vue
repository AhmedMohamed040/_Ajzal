<template>
  <v-footer dark color="secondary">
    <v-container>
      <v-row>
        <v-col  cols="12" xl="4" lg="4" md="4" sm="6" align="center">
          <img width="200" src="@/assets/ajzal/logo_footer.svg"/>
          <div v-if="getAbout">
            <p v-if="getAbout.value" v-html=" getAbout.value" class="footer-text mb-5">
            </p>
          </div>

          <!-- <div class="d-flex flex-sm-nowrap flex-wrap">
            <a href="#" class="me-3 mb-3">
              <v-img
                max-width="130"
                :src="require('@/assets/images/app-store/google-play.png')"
              ></v-img>
            </a>
            <a href="#">
              <v-img
                max-width="130"
                :src="require('@/assets/images/app-store/app-store.png')"
              ></v-img>
            </a>
          </div> -->
        </v-col>

        <v-col cols="12" xl="2" lg="2" md="4" sm="6">
          <h2 class="mb-5">{{ $t('aboutUs') }}</h2>
          <div v-for="(n, index) in aboutUs" :key="index" class="my-1">
            <span @click="goToPage(n.to)" class="text-decoration-none footer-link-hover">{{ $t(`${n.name}`) }}</span>
          </div>
        </v-col>
        <v-col v-if="role == null && signedIn == false" cols="12" xl="3" lg="3" md="4" sm="6">
          <h2 class="mb-5">{{ $t('customCare') }}</h2>
          <div v-for="(n, index) in customerCare" :key="index" class="my-1">
            <span @click="goToPage(n.to)" class="text-decoration-none footer-link-hover">{{ $t(n.name) }}</span>
          </div>
        </v-col>
        <v-col v-else cols="12" xl="3" lg="3" md="4" sm="6">
          <h2 class="mb-5">{{ $t('customCare') }}</h2>
          <div v-for="(n, index) in customerCareForUser" :key="index" class="my-1">
            <span @click="goToPage(n.to)" class="text-decoration-none footer-link-hover">{{ $t(n.name) }}</span>
          </div>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="4" sm="6">
          <h2 class="mb-5">{{ $t('contactUs') }}</h2>
          <p class="footer-text">
            {{ getAddress.value }}
          </p>
          <p class="footer-text">Email: {{ getMail.value }}</p>
          <p class="footer-text mb-5">Phone: {{ getPhone.value }}</p>
          <v-btn class="me-2 white--text" :href="getFacebook.value"  target="_blank" elevation="0" x-small fab dark
            color="secondary darken-1">

              <v-icon small size="24px">
                mdi-facebook
            </v-icon>

          </v-btn>
          <v-btn class="me-2 white--text" :href="getTwitter.value" target="_blank" elevation="0" x-small fab dark
            color="secondary darken-1">

              <v-icon small size="24px">
                mdi-twitter
            </v-icon>

          </v-btn>
          <v-btn class="me-2 white--text" :href="getInstagram.value"  target="_blank" elevation="0" x-small fab dark
            color="secondary darken-1">

              <v-icon small size="24px">
                mdi-instagram
            </v-icon>

          </v-btn>
          <v-btn class="me-2 white--text" :href="`mailto:${getEmail.value}`"  target="_blank" elevation="0" x-small fab dark
            color="secondary darken-1">

              <v-icon small size="24px">
                mdi-email
            </v-icon>

          </v-btn>
          <v-btn class="me-2 white--text" aria-label="Chat on WhatsApp" :href="`https://wa.me/${getWhatsapp.value}`"  target="_blank" elevation="0" x-small fab dark
            color="secondary darken-1">

              <v-icon small size="24px">
                mdi-whatsapp
            </v-icon>

          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-youtube", "mdi-google", "mdi-instagram"],
    aboutUs: [
      { name: "about", to: 'about-us' },
      { name: "Privacy", to: 'privacy-policy' },
      { name: "terms", to: 'terms-and-conditions' },
    ],

    customerCare: [
      { name: "faq", to: 'FAQ' },
      { name: "complaints", to: 'complaints' },

    ],
    customerCareForUser: [
      { name: "faq", to: 'FAQ' },
      { name: "complaints", to: 'users-complaints' },

    ],
  }),
  computed: {
    ...mapGetters({ getFooter: 'getFooter', role: 'getRole', signedIn: 'getSignedIn' }),

    getAddress() {
      if (this.getFooter.contact) {
        return this.getFooter.contact.find((item) => {
          return item.key.toLowerCase() ==="CONTACT_ADDRESS".toLowerCase()
        })
      }else return ''
    },
    getPhone() {
      if (this.getFooter.contact) {
        return this.getFooter.contact.find((item) => {
          return item.key.toLowerCase() ==="CONTACT_PHONE".toLowerCase()
        })
      }else return ''
    },
    getMail() {
      if (this.getFooter.contact) {
        return this.getFooter.contact.find((item) => {
          return item.key.toLowerCase() ==="CONTACT_EMAIL".toLowerCase()
        })
      }else return ''
    },
    getAbout() {
      if (this.getFooter.about) {
        return this.getFooter.about.find((item) => {
          return item.key.toLowerCase() === "SHORT_ABOUT_INFO".toLowerCase()
        })
      }else return ''
    },

    getTwitter() {
      if (this.getFooter.social) {
        return this.getFooter.social.find((item) => {
          return item.key.toLowerCase() === "TWITTER_LINK".toLowerCase()
        })
      }else return ''
    },
    getEmail() {
      if (this.getFooter.social) {
        return this.getFooter.social.find((item) => {
          return item.key.toLowerCase() === "CONTACT_EMAIL".toLowerCase()
        })
      }else return ''
    },
    getInstagram() {
      if (this.getFooter.social) {
        return this.getFooter.social.find((item) => {
          return item.key.toLowerCase() === "INSTAGRAM_LINK".toLowerCase()
        })
      }else return ''
    },

    getFacebook() {
      if (this.getFooter.social) {
        return this.getFooter.social.find((item) => {
          return item.key.toLowerCase() == "FACEBOOK_LINK".toLowerCase()
        })
      }else return ''
    },
    getWhatsapp() {
      if (this.getFooter.social) {
        return this.getFooter.social.find((item) => {
          return item.key.toLowerCase() == "WHATSAPP".toLowerCase()
        })
      }else return ''
    },
  },
  async mounted() {
    await this.fetchFooter()

  },
  methods: {
    ...mapActions({ fetchFooter: 'fetchFooter' }),
    goToPage(path) {
      this.$router.replace(this.localePath({ name: path }))
    },

  }
};
</script>
<style lang="scss">
span.footer-link-hover {
  color: #bdbdbd !important;


  &:hover {
    color: #fff !important;
    cursor: pointer;
  }
}

.v-footer {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
</style>
