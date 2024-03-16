<template>
  <div>
    <top-bar />
    <v-app-bar
      height="72"
      app
      scroll-off-screen
      class="sub-topbar"
      color="primary py-1"
    >
      <v-container>
        <div class="d-flex justify-space-between align-center">
          <v-toolbar-title>
            <nuxt-link :to="localePath('/')">
              <v-img
                class="me-2 logo d-md-block d-none"
                :src="require('@/assets/ajzal/logo.svg')"
                contain
              />
            </nuxt-link>
          </v-toolbar-title>
          <v-col cols="12" md="5">
            <div class="search-bar d-flex p-relative">
              <v-menu offset-y>
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="search"
                    solo
                    dark
                    flat
                    class="rounded-lg"
                    hide-details="auto"
                    :placeholder="$t('Searching for')"
                    color="white"
                    background-color="rgba(244, 230, 181, 0.6)"
                    v-bind="attrs"
                    v-on="on"
                    @keyup.enter="goToSearch"
                    @input="searchProduct"
                  >
                  <template #append>
                    <v-icon large>mdi-magnify</v-icon>
                  </template>
                  </v-text-field>
                </template>
                <v-list v-if="searchProductResults.length > 0">
                  <v-list-item
                    v-for="(item, index) in searchProductResults"
                    :key="index"
                  >
                    <v-list-item-title>
                      <v-btn text block @click="goToSearch(item)">
                        {{ item.name }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
          <div>
            <div class="d-md-flex d-none">
              <!-- Favorite -->
          <!--     <v-btn
                text
              >
                <span class="mx-1 white--text font-weight-bold">{{ $t('WishList') }}</span>
                <v-badge
                  v-show="totalFavorites"
                  :content="totalFavorites"
                  color="error"
                >
                  <img src="@/assets/ajzal/heart.svg">
                </v-badge>
              </v-btn> -->
              <!-- cartCount  -->
              <v-btn
                text
                @click="drawer = true"
              >
                <span class="mx-1 white--text font-weight-bold">{{ $t('Cart') }}</span>
                <v-badge
                  color="error"
                  :content="cartProducts? cartProducts.length : 0"
                >
                  <img src="@/assets/ajzal/cart.svg">
                </v-badge>
              </v-btn>
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <!-- CART DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
      width="320"
      class="z-index-up"
    >
      <div class="secondary-siebar-content">
        <v-list-item>
          <v-list-item-avatar class="mr-0">
            <v-icon>mdi-shopping-outline</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ cartProducts.length }} {{ $t('Items') }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="drawer = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <div v-if="cartProducts.length > 0">
          <div v-for="(cartItem, index) in cartProducts" :key="index">
            <div
              class="cart-item d-flex justify-space-between align-center px-4 py-3"
            >
              <div class="d-flex flex-column align-center">
                <v-btn
                  class="mx-2"
                  fab
                  outlined
                  dark
                  x-small
                  color="primary"
                  @click="addCart(cartItem)"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
                <span>{{ cartItem.quantity }}</span>
                <v-btn
                  class="mx-2"
                  fab
                  outlined
                  dark
                  x-small
                  color="primary"
                  @click="decreaseCart(cartItem)"
                >
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
              </div>
              <v-avatar tile size="76">
                <img
                  v-if="cartItem.product.imageUrl"
                  :src="cartItem.product.imageUrl"
                  @error="handleImageError"
                />
                <img v-else src="~/assets/images/product.png" />
              </v-avatar>
              <div class="col-5">
                <h5 class="text-truncate">{{ cartItem.product.name }}</h5>
                <p class="text-tiny">
                  {{ cartItem.product.salePrice.toFixed(2) }} x {{ cartItem.quantity }}
                </p>
                <h5 class="primary--text">
                  {{ cartItem.product.salePrice.toFixed(2) * cartItem.quantity }}
                </h5>
              </div>
              <v-btn icon @click="deleteCart(cartItem)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            <v-divider />
          </div>
        </div>
        <div v-else>
          <div
            class="empty-cart-sidebar d-flex flex-column justify-center align-center mt-10"
          >
            <v-avatar size="90" tile class="mb-8">
              <img src="@/assets/images/empty-cart.png" alt="" />
            </v-avatar>
            <p class="grey--text text--darken-2 px-5 mx-10 text-center">
              {{ $t('Your shopping bag is empty') }}.
            </p>
          </div>
        </div>
      </div>
      <template v-if="cartProducts.length > 0" #append>
        <div class="pa-2">
          <v-btn
            :to="localePath({ name: 'shop-Cart' })"
            class="text-cappitalise"
            outlined
            block
            color="primary"
          >
            {{ $t('View Cart') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { directive as onClickaway } from 'vue-clickaway'
// import HeaderNavbar from '@/pages/home/header-navbar'
// import Navbar from "@/pages/home/navbar";

export default {
  name: 'BaseAppBar',
  directives: {
    onClickaway,
  },
  components: {
    // HeaderNavbar,
    // Navbar,
  },
  data() {
    return {
      colorNav: false,
      isToggleNavbar: false,
      search: '',
      searchCategory: {
        id: null,
        name: this.$i18n.t('All') + ' ' + this.$i18n.t('Categories'),
      },
      searchProductResults: [],
      drawer: false,
      group: null,
      defaultImage:
        'https://api.ajzal.sa/uploads/ajzal-uploaded-images/default.jpg',
    }
  },
  computed: {
    ...mapGetters({
      cartProducts: 'getCartProducts',
      categories: 'getCategories',
      totalFavorites: 'getFavorites'
    }),
  },
  created() {
    this.$store.dispatch('getFavorites')
  },
  methods: {
    ...mapActions(['addCart', 'decreaseCart', 'deleteCart']),
    selectCategory(id, name) {
      this.searchCategory = { id, name }
    },
    handleImageError(event) {
      event.target.src = this.defaultImage;
    },
    searchProduct() {
      this.searchProductResults = []
      if (!this.search || this.search === '') return
      const params = {
        searchstring: this.search,
        categoryid: this.searchCategory.id,
      }
      this.$axios.$get('products', { params }).then((r) => {
        this.searchProductResults = r.model.products.model
      })
    },
    goToSearch(item = null) {
      if (!this.search || this.search === '') return
      let path = ''
      let query = {}
      if (item.type === 'keyup') {
        query = {
          categoryid: this.searchCategory.id,
          searchstring: this.search,
        }
        path = this.localePath({
          name: 'products',
          query,
        })
      } else {
        const category = this.searchCategory.id
        query = {
          categoryid: category,
          searchstring: item.name,
        }
        path = this.localePath({
          name: 'products',
          query,
        })
      }
      this.searchCategory = {
        id: null,
        name: this.$i18n.t('All Categories'),
      }
      this.search = ''
      this.$store.dispatch('filter', query)
      this.$router.push(path)
    },
    toggleNavbar() {
      if (this.$route.path === this.localePath('/')) {
        this.isToggleNavbar = false
      } else {
        this.isToggleNavbar = !this.isToggleNavbar
      }
    },
    away() {
      this.isToggleNavbar = false
    },
  },
}
</script>
<style lang="scss" scoped>
$z-index-sub-topbar: 2;
$md: 959px;
.z-index-up {
  z-index: 99;
}

.v-list-item {
  min-height: 34px;
}

.sub-topbar {
  position: relative;
  box-shadow: none !important;
  width: 100%;
  height: 80px !important;
  z-index: 99;
  .dropdown-ecommerce {
    display: none;
  }
  &.v-app-bar--fixed {
    position: unset;
  }
  // z-index: $z-index-sub-topbar;

  &.v-app-bar--is-scrolled {
    position: fixed;
    top: 0;
    box-shadow: none !important;
    .dropdown-ecommerce {
      display: block;
    }
  }
  @media (max-width: $md) {
  }
}

.navbar {
  height: 60px;
  width: 100%;
  z-index: 2;
  box-shadow: rgb(43 52 69 / 10%) 0px 16px 16px -16px !important;
  &.v-app-bar--is-scrolled {
    position: relative;
    top: 64px;
    margin-bottom: 64px;
    box-shadow: rgb(43 52 69 / 10%) 0px 16px 16px -16px !important;
    // box-shadow: none !important;
  }
  @media (max-width: 992px) {
    display: none;
  }
}
.search-bar {
  ::v-deep .v-input__slot {
    border: 2px solid rgb(255, 255, 255);
  }
  ::v-deep .v-input__slot input::placeholder {
    color: rgb(255, 255, 255)!important;
    opacity: 1;
  }

  .search-bar-dropdown {
    height: 39px;
    position: relative;
    top: 20px;
    transform: translateY(-50%);
    border-radius: 20px;
    box-shadow: none !important;
    @media (max-width: $md) {
      display: none;
    }
  }
}

// toggleNavbarButton
.navbar-toggle-dropdown {
  z-index: 98;
  display: none;
  &.open {
    display: block;
    top: 64px;
  }
}
.v-hidden {
  visibility: hidden;
}
.empty-cart-sidebar {
  height: 80vh;
}
</style>
