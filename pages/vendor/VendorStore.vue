<template>
  <v-container class="mt-6">
    <v-row>
      <v-col cols="12">
        <base-card>
          <v-img
            height="202"
            :src="require('@/assets/images/banners/shop-cover.png')"
          ></v-img>
          <v-card-text class="p-relative">
            <div class="d-flex justify-space-between flex-wrap mt--66">
              <div class="d-flex flex-wrap">
                <v-avatar size="120" class="mr-8">
                  <img
                    class="border-4-white"
                    src="@/assets/images/faces/2.jpg"
                    alt=""
                  />
                </v-avatar>
                <div>
                  <v-alert
                    dense
                    color="secondary white--text"
                    class="d-inline-block mb-6"
                  >
                    <span class="font-weight-bold"> Scarlett Beauty </span>
                  </v-alert>
                  <div class="d-flex align-center mb-4">
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="16"
                    ></v-rating>

                    <div class="grey--text text--darken-4 ml-1">(49)</div>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon small class="mr-2" color="grey darken-1"
                      >mdi-map-marker</v-icon
                    >
                    <span class="grey--text text--darken-1"
                      >845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark</span
                    >
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon small class="mr-2" color="grey darken-1"
                      >mdi-phone</v-icon
                    >
                    <span class="grey--text text--darken-1"
                      >(613) 343-9004</span
                    >
                  </div>
                </div>
              </div>
              <div class="text-md-center text-left">
                <div class="d-flex mb-12">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    elevation="0"
                    color="light-blue darken-4"
                  >
                    <v-icon dark> mdi-facebook </v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    elevation="0"
                    color="light-blue lighten-1"
                  >
                    <v-icon dark> mdi-twitter </v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    elevation="0"
                    color="red darken-2"
                  >
                    <v-icon dark> mdi-youtube </v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    elevation="0"
                    color="pink lighten-1"
                  >
                    <v-icon dark> mdi-instagram </v-icon>
                  </v-btn>
                </div>
                <v-btn
                  outlined
                  color="primary"
                  class="text-capitalize font-weight-bold"
                >
                  Contact Vendor
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </base-card>
      </v-col>
      <v-col cols="12">
        <div class="box-wrapper">
          <div
            class="box-overlay"
            :class="{ open: isSidebar }"
            @click="isSidebar = !isSidebar"
          ></div>
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <h5 class="ps-6 mt-6">Categories</h5>
            <v-expansion-panels class="py-0" flat>
              <v-expansion-panel class="pa-0">
                <v-expansion-panel-header
                  class="grey--text text--darken-2 py-0"
                >
                  Bath Preparations
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="mb-2">
                    <a
                      href="#"
                      class="text-decoration-none grey--text text--darken-2 ms-6"
                      >Bubble Path</a
                    >
                  </div>
                  <div>
                    <a
                      href="#"
                      class="text-decoration-none grey--text text--darken-2 ms-6"
                      >Bubble Path</a
                    >
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <div class="ps-6 pb-3">
              <a href="#" class="text-decoration-none grey--text text--darken-2"
                >Eye Makeup Preparations</a
              >
            </div>
            <div class="ps-6 pb-3">
              <a href="#" class="text-decoration-none grey--text text--darken-2"
                >Fragnance</a
              >
            </div>
            <div class="ps-6 pb-3">
              <a href="#" class="text-decoration-none grey--text text--darken-2"
                >Hair Preparations</a
              >
            </div>
            <v-divider class="mx-6 my-1"></v-divider>

            <div class="mx-6 pt-3">
              <h5 class="">Categories</h5>
              <v-range-slider
                class="mt-10"
                :value="[1, 2]"
                min="0"
                max="3"
                tick-size="4"
              >
                <template #thumb-label="props">
                  {{ season(props.value) }}
                </template>
              </v-range-slider>

              <v-divider class="pa-0 ma-0"></v-divider>
              <h5 class="pt-3">Brands</h5>
              <div v-for="(category, index) in getCategories" :key="index">
                <v-checkbox
                  v-model="selected"
                  hide-details
                  class="mt-3"
                  :label="category.title"
                  :value="category.title"
                  @change="filterCategory(category)"
                ></v-checkbox>
              </div>

              <v-divider class="mt-3"></v-divider>
              <h5 class="py-3">Ratings</h5>
              <div v-for="sidebarRating in getRatings" :key="sidebarRating.id">
                <div
                  class="cursor-pointer mb-3"
                  @click="productRate(sidebarRating)"
                >
                  <!-- <v-checkbox
                                    hide-details
                                    class="mt-0"
                                    :value="sidebarRating.rates"
                                    v-model="selected"
                                    @change="filterRatings(sidebarRating)"
                                >  
                                </v-checkbox> -->
                  <v-rating
                    :value="sidebarRating.rates"
                    background-color="amber"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="19"
                  ></v-rating>
                </div>
              </div>

              <v-divider class="mt-3"></v-divider>
              <h5 class="py-3">Colors</h5>
              <div class="d-flex pb-3">
                <a href="#" class="me-2">
                  <div class="black pa-3 rounded-circle"></div>
                </a>
                <a href="#" class="me-2">
                  <div class="primary lighten-2 pa-3 rounded-circle"></div>
                </a>
                <a href="#" class="me-2">
                  <div class="orange lighten-3 pa-3 rounded-circle"></div>
                </a>
                <a href="#" class="me-2">
                  <div class="green lighten-3 pa-3 rounded-circle"></div>
                </a>
                <a href="#" class="me-2">
                  <div class="light-blue lighten-3 pa-3 rounded-circle"></div>
                </a>
                <a href="#" class="me-2">
                  <div class="deep-purple lighten-3 pa-3 rounded-circle"></div>
                </a>
              </div>
            </div>
          </div>
          <div
            :class="{
              'box-content': $i18n.locale == 'en',
              'box-content-rtl': $i18n.locale == 'ar',
            }"
          >
            <div class="d-flex justify-end pa-2 d-block d-md-none">
              <v-btn icon @click="isSidebar = !isSidebar">
                <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              </v-btn>
            </div>
            <div class="box-container">
              <v-row>
                <v-col cols="12">
                  <v-data-iterator
                    :items="items"
                    :items-per-page.sync="itemsPerPage"
                    :page.sync="page"
                    hide-default-footer
                  >
                    <template #default="props">
                      <v-row>
                        <v-col
                          v-for="(item, index) in props.items"
                          :key="index"
                          cols="12"
                          sm="6"
                          md="6"
                          lg="4"
                          xl="3"
                        >
                          <LazyCardCart
                            :content-img="item.img"
                            :content-text="item.title"
                            :amount="item.amount"
                            :content-rating="item.rating"
                            :counter="item.qty"
                          />
                        </v-col>
                      </v-row>
                    </template>

                    <template v-if="items.length > 0" #footer>
                      <v-row class="my-5 me-1" align="center" justify="center">
                        <v-spacer></v-spacer>

                        <span class="mr-4 grey--text">
                          Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn
                          fab
                          :disabled="page == 1"
                          small
                          color="primary"
                          class="mr-1"
                          @click="formerPage"
                        >
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          :disabled="page == numberOfPages"
                          small
                          color="primary"
                          class="ml-1"
                          @click="nextPage"
                        >
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-row>
                    </template>
                  </v-data-iterator>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isSidebar: false,
      page: 1,
      itemsPerPage: 8,

      range: [0, 100, 500, 1000],
      itemsTwo: ['Low to High', 'High to Low'],
      select: '',
      cartCount: 0,
      filterProductList: [],
      filterProduct: [],
      selected: [],
    }
  },
  head: {
    title: 'Vendor Store',
  },
  computed: {
    ...mapGetters(['getProducts', 'getCategories', 'getRatings']),

    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  created() {
    this.items = this.getProducts
    // this.items = this.getProducts.slice(0, 15).map(n => n);
  },

  methods: {
    relevance(amount) {
      if (this.select == 'Low to High') {
        this.items = this.items.sort((a, b) => (a[amount] < b[amount] ? -1 : 1))
      } else {
        this.items = this.items.sort((a, b) => (a[amount] > b[amount] ? -1 : 1))
      }
    },
    // fullProducts () {
    //   this.items = this.getProducts
    // },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    season(val) {
      return this.range[val]
    },

    filterCategory(category) {
      this.items = this.getProducts.filter((x) =>
        this.selected.includes(x.category)
      )
      if (this.selected.length <= 0) {
        this.items = this.getProducts
      }
    },
    filterRatings(rating) {
      this.items = this.getProducts.filter((x) =>
        this.selected.includes(x.rating)
      )
      if (this.selected.length <= 0) {
        this.items = this.getProducts
      }
    },
    productRate(rate) {
      this.items = this.getProducts.filter((x) => x.rating == rate.rates)
      // this.items = this.filterProduct.sort((a, b) => a[rate.rates] < b[rate.rates] ? -1 : 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.box-sidebar {
  .sidebar-slider {
    .v-messages {
      display: none;
    }
  }
}
</style>
