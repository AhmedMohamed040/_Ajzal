<template>
  <div>
    <div v-if="role === 'Merchant' && signIn === true">
      <p class="text-sm grey--text text--darken-2 px-5 pt-6">
      {{ $t('Dashboard') }}
    </p>
    <nuxt-link v-for="page in agentDashboard" :key="page.name" :to="page.url" class="dashboard-nav-link px-4">
      <div class="d-flex align-center">
        <img v-svg-inline class="icon" :class="{ 'mr-2': $i18n.locale != 'ar', 'ml-2': $i18n.locale == 'ar' }"
          :src="page.img" alt="" />
        <span>{{ page.name }}</span>
      </div>
    <!--   <p class="mb-0">0</p> -->
    </nuxt-link>
    </div>
    <div v-else>
      <p class="text-sm grey--text text--darken-2 px-5 pt-6">
      {{ $t('Dashboard') }}
    </p>
    <nuxt-link v-for="page in dashboard" :key="page.name" :to="page.url" class="dashboard-nav-link px-4">
      <div class="d-flex align-center">
        <img v-svg-inline class="icon" :class="{ 'mr-2': $i18n.locale != 'ar', 'ml-2': $i18n.locale == 'ar' }"
          :src="page.img" alt="" />
        <span>{{ page.name }}</span>
      </div>
    <!--   <p class="mb-0">0</p> -->
    </nuxt-link>
    </div>

    <p class="text-sm grey--text text--darken-2 px-5 pt-6">
      {{ $t('Account Settings') }}
    </p>
    <nuxt-link v-for="page in accountSettings" :key="page.name" :to="page.url" class="dashboard-nav-link px-4">
      <div class="d-flex align-center">
        <img v-svg-inline class="icon" :class="{ 'mr-2': $i18n.locale != 'ar', 'ml-2': $i18n.locale == 'ar' }"
          :src="page.img" alt="" />
        <span>{{ page.name }}</span>
      </div>
      <!--       <p class="mb-0">0</p>-->
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {

      dashboard: [

        {
          name: this.$i18n.t('Orders'),
          url: this.localePath({ name: 'orders' }),
          img: require('@/assets/images/icons/bag.svg'),
        },
        {
          name: this.$i18n.t('ordersReturn'),
          url: this.localePath({ name: 'return-orders' }),
          img: require('@/assets/images/icons/bag.svg'),
        },
        {
          name: this.$i18n.t('Bills'),
          url: this.localePath({ name: 'bills' }),
          img: require('@/assets/images/icons/bag.svg'),
        },
        {
          name: this.$i18n.t('WishList'),
          url: this.localePath({ name: 'Wishlist' }),
          img: require('@/assets/images/icons/heart.svg'),
        },
        /*  {
           name: this.$i18n.t('Ticket'),
           url: this.localePath({ name: 'supportTickets-AllTickets' }),
           img: require('@/assets/images/icons/customer-service.svg'),
         }, */
        /*   {
            name: this.$i18n.t('faq'),
            url: this.localePath({ name: 'FAQ' }),
            img: require('@/assets/images/icons/customer-service.svg'),
          }, */
        {
          name: this.$i18n.t('complaints'),
          url: this.localePath({ name: 'users-complaints' }),
          img: require('@/assets/images/icons/customer-service.svg'),
        },
      ],
      agentDashboard: [
      {
          name: this.$i18n.t('agentOrders'),
          url: this.localePath({ name: 'agent_orders' }),
          img: require('@/assets/images/icons/bag.svg'),
        },
        {
          name: this.$i18n.t('Orders'),
          url: this.localePath({ name: 'orders' }),
          img: require('@/assets/images/icons/bag.svg'),
        },
        {
          name: this.$i18n.t('ordersReturn'),
          url: this.localePath({ name: 'return-orders' }),
          img: require('@/assets/images/icons/bag.svg'),
        },
        {
          name: this.$i18n.t('Bills'),
          url: this.localePath({ name: 'bills' }),
          img: require('@/assets/images/icons/bag.svg'),
        },
        {
          name: this.$i18n.t('WishList'),
          url: this.localePath({ name: 'Wishlist' }),
          img: require('@/assets/images/icons/heart.svg'),
        },
        /*  {
           name: this.$i18n.t('Ticket'),
           url: this.localePath({ name: 'supportTickets-AllTickets' }),
           img: require('@/assets/images/icons/customer-service.svg'),
         }, */
        /*   {
            name: this.$i18n.t('faq'),
            url: this.localePath({ name: 'FAQ' }),
            img: require('@/assets/images/icons/customer-service.svg'),
          }, */
        {
          name: this.$i18n.t('complaints'),
          url: this.localePath({ name: 'users-complaints' }),
          img: require('@/assets/images/icons/customer-service.svg'),
        },
      ],
      accountSettings: [
        {
          name: this.$i18n.t('Profile Info'),
          url: this.localePath({ name: 'profile' }),
          img: require('@/assets/images/icons/user.svg'),
        },
        {
          name: this.$i18n.t('Addresses'),
          url: this.localePath({ name: 'Address' }),
          img: require('@/assets/images/icons/pin.svg'),
        },
       /*  {
          name: this.$i18n.t('Payment Methods'),
          url: this.localePath({ name: 'shop-CheckoutAlternative' }),
          img: require('@/assets/images/icons/credit-card-1.svg'),
        }, */
      ],
    }
  },
  computed: {
    ...mapGetters({signIn:'getSignedIn', role:'getRole'})
  },

}
</script>

<style lang="scss">
.dashboard-nav-link {
  color: #2b3445 !important;
  text-decoration: none;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-left: 4px solid #fff;
  margin-bottom: 20px;

  svg {
    width: 20px;
  }

  &.router-link-exact-active {
    color: #d23f57 !important;
    border-left: 4px solid #d23f57;
  }

  &:hover {
    color: #d23f57 !important;
    border-left: 4px solid #d23f57;
  }
}
</style>
