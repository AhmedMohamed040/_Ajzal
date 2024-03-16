<template>
  <v-app>
    <base-app-bar />

    <base-view />
    <base-snackbar />
    <footer-view />
    <mobile-navigation />
  </v-app>
</template>

<script>
export default {
  name: "BaseLayout",
  components: {
    BaseAppBar: () => import("./base/AppBar"),
    BaseView: () => import("./base/View"),
    FooterView: () => import("./base/Footer"),
    MobileNavigation: () => import("./base/MobileNavigationBar"),
  },
  mounted() {
    this.$vuetify.rtl = this.$i18n.localeProperties.dir === 'rtl';
    this.$store.dispatch("getCarts");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("checkLogin");
  },
};
</script>
