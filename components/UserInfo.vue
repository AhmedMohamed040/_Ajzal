<template>
  <v-menu offset-y open-on-click>
    <template #activator="{ on, attrs }">
      <v-btn
        elevation="0"
        class="font-weight-bold"
        text
        v-bind="attrs"
        v-on="on"
      >
        <span class="mx-1">{{ $t('Welcome') }}</span>
        <img src="@/assets/ajzal/user.svg">
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>
          <v-btn text block :to="item.url">{{ item.name }}</v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <v-btn block text @click="logout">
            {{ $t("LogOut") }}
          </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { name: this.$i18n.t("Profile Info"), url: this.localePath({ name: "profile" }) },
        { name: this.$i18n.t("My Addresses"), url: this.localePath({ name: "Address" }) },
        { name: this.$i18n.t("WishList"), url: this.localePath({ name: "Wishlist" }) },
        { name: this.$i18n.t("Orders"), url: this.localePath({ name: "orders" }) },
        { name: this.$i18n.t("ordersReturn"), url: this.localePath({ name: "return-orders" }) },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      if (this.$route.path === this.localePath('/')) {
        // location.reload()
        this.$notifier.showMessage({ content: this.$i18n.t('Logged out successfully'), color: "grey", textColor: "black" })
        this.$forceUpdate();
      }
      this.$router.push(this.localePath('/'))
    },
  },
};
</script>
