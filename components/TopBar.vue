<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <v-toolbar-title>
        <!-- <div class="mr-2 d-md-block d-none">
            <v-icon class="mr-2 white--text" small>mdi-phone-outline</v-icon>
            <span class="text-sm mr-5">+966 123 456 7890</span>
            <v-icon class="mr-2 white--text" small>mdi-phone-outline</v-icon>
            <span class="text-sm">+966 123 456 7890</span>
          </div> -->
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn text small v-bind="attrs" v-on="on">
              <v-avatar
                tile
                size="14"
                :class="{
                  'mr-2': $i18n.locale != 'ar',
                  'ml-2': $i18n.locale == 'ar',
                }"
              >
                <img
                  :src="require(`~/assets/images/flags/${$i18n.locale}.svg`)"
                />
              </v-avatar>
              <span  class="  hidden-sm-and-down text-caption text-md-h6 font-weight-bold grey--text text--darken-3">{{ $t($i18n.locale) }}</span>
              <v-icon  class="  hidden-sm-and-down grey--text text--darken-3"  right small>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list flat>
            <v-list-item
              v-for="(locale, index) in $i18n.locales.filter(
                (l) => l.code != $i18n.locale
              )"
              :key="index"
              @click="changeLocale(locale)"
            >
              <v-list-item-title>
                <v-avatar
                  tile
                  size="14"
                  :class="{
                    'mr-2': $i18n.locale != 'ar',
                    'ml-2': $i18n.locale == 'ar',
                  }"
                >
                  <img
                    :src="require(`~/assets/images/flags/${locale.code}.svg`)"
                  />
                </v-avatar>
                <span class="text-caption text-md-h6 font-weight-bold grey--text text--darken-3">{{ $t(locale.code) }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-title>
      <v-toolbar-title>
        <user-info v-if="signedIn" />
        <login v-else />
       <!--  <v-btn text >
          <span  class=" hidden-sm-and-down  mx-1 text-caption text-md-h6 font-weight-bold grey--text text--darken-3">{{ $t('Compare') }}</span>
          <img src="@/assets/ajzal/exchange.svg">
        </v-btn>
        <v-btn text>
          <span  class=" hidden-sm-and-down  mx-1 text-caption text-md-h6 font-weight-bold grey--text text--darken-3">{{ $t('Find Us') }}</span>
          <img src="@/assets/ajzal/pin.svg">
        </v-btn> -->
      </v-toolbar-title>
    </div>
  </v-container>
</template>
<script>
export default {
  computed: {
    signedIn() {
      return this.$store.state.signedIn
    },
  },
  methods: {
    changeLocale(locale) {
      this.$vuetify.rtl = locale.dir === 'rtl'
      this.$router.push(this.switchLocalePath(locale.code))
    },
  },
}
</script>
<style lang="scss" scoped>
.top-bar {
  height: 40px;
  z-index: 2;
  position: relative;
  display: flex;
  align-items: center;
}
</style>
