<template>
  <v-container class="mt-6">
    <v-row>
      <v-col cols="12">
        <base-card>
          <v-card-text class="ps-6 d-flex justify-space-between align-center flex-wrap">
            <div class="my-2">
              <h4 v-if="filters.searchstring">
                {{ $t("Searching for") }} {{ filters.searchstring }}
              </h4>
              <a v-show="filters.searchstring" @click="clearFilter('searchstring')">
                {{ $t("clear") }}
              </a>
              <p class="gray--text text--darken-1 mb-0">
                {{
                  $t("Found") + " " + (itemCount ? itemCount : "0") + " " + $t("Results")
                }}
              </p>
            </div>
            <div class="d-flex align-center flex-wrap">
              <div class="grey--text text--darken-1 me-2 my-2">{{ $t("Sort by") }} :</div>
              <v-select
                :value="filters.orderby"
                class="me-5"
                :items="sortBy"
                :label="$t('Relevance')"
                menu-props="offset-y"
                item-text="name"
                item-value="value"
                dense
                outlined
                hide-details
                flat
                @input="orderFilter"
              />
              <!-- <div class="grey--text text--darken-1 me-2 my-2">View :</div>
              <v-btn icon>
                <img class="icon" src="@/assets/images/icons/grid.svg" alt="" />
              </v-btn>
              <v-btn icon>
                <img class="icon" src="@/assets/images/icons/menu.svg" alt="" />
              </v-btn> -->
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
          />
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <div class="mx-6 mt-3">
              <v-row dense no-gutters>
                <v-col cols="6">
                  <h5>{{ $t("Categories") }}</h5>
                </v-col>
                <v-col
                  v-show="filters.categoryid"
                  cols="6"
                  align-self="center"
                  align="end"
                >
                  <a @click="clearFilter('categoryid')">{{ $t("clear") }}</a>
                </v-col>
                <v-col cols="12">
                  <v-treeview
                    dense
                    expand-icon="mdi-chevron-down"
                    :items="categories"
                    item-children="subCategories"
                  >
                    <template #label="{ item }">
                      <a @click="categoryFilter(item.id)">
                        <span v-if="item.subCategories.length > 0"
                          >{{ $t("All") }} {{ item.name }}</span
                        >
                        <span v-else>{{ item.name }}</span>
                      </a>
                    </template>
                  </v-treeview>
                </v-col>
              </v-row>
              <v-divider class="my-1" />
              <v-row dense no-gutters>
                <v-col cols="6" class="text-h5">
                  <h5 class="pt-3">
                    {{ $t("Price Range") }}
                    <span>{{ range[0] +":"+ range[1] }}</span>
                  </h5>
                </v-col>
                <v-col
                  cols="6"
                  align-self="center"
                  align="end"
                >
                  <a
                    v-show="filters.minprice && filters.maxprice"
                    @click="
                      clearFilter('minprice');
                      clearFilter('maxprice');
                      range = [minPrice, maxPrice]
                    "
                  >
                    {{ $t("clear") }}
                  </a>
                </v-col>
                <v-col cols="2" align="center" align-self="center">
                  {{ $i18n.locale === 'ar' ? maxPrice:minPrice }}
                </v-col>
                <v-col cols="8">
                  <v-range-slider
                    :value="[filters.minprice ? filters.minprice : range[0], filters.maxprice?filters.maxprice:range[1]]"
                    hide-details
                    :min="minPrice"
                    :max="maxPrice"
                    class="d-inline"
                    @input="setPriceFilter"
                    @mouseup="priceFilter"
                  />
                </v-col>
                <v-col cols="2" align="center" align-self="center">
                  {{ $i18n.locale === 'ar' ? minPrice:maxPrice }}
                </v-col>
              </v-row>
              <v-divider class="my-1" />
              <v-row dense no-gutters>
                <v-col cols="6">
                  <h5>{{ $t("Brands") }}</h5>
                </v-col>
                <v-col
                  v-show="filters.manufacturerid"
                  cols="6"
                  align-self="center"
                  align="end"
                >
                  <a @click="clearFilter('manufacturerid')">
                    {{ $t("clear") }}
                  </a>
                </v-col>
                <v-col cols="12">
                  <v-radio-group
                    :value="filters.manufacturerid"
                    @change="manufacturerFilter"
                  >
                    <v-radio
                      v-for="manufacturer in manufacturers"
                      :key="manufacturer.id"
                      :label="manufacturer.name"
                      :value="manufacturer.id"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider class="my-1" />
              <v-row no-gutters dense>
                <v-col class="py-3 text-h5" cols="6">
                  <span>{{ $t("Ratings") }}</span>
                </v-col>
                <v-col v-show="filters.rating" cols="6" align-self="center" align="end">
                  <a @click="clearFilter('rating')">{{ $t("clear") }}</a>
                </v-col>
                <v-col class="cursor-pointer mb-3">
                  <v-rating
                    :value="filters.rating"
                    hover
                    background-color="amber"
                    color="amber"
                    size="19"
                    hide-details="auto"
                    @input="ratingFilter"
                  />
                </v-col>
              </v-row>
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
                <v-col v-if="!loading" cols="12">
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
                          <LazyCardCart :product="item" />
                        </v-col>
                      </v-row>
                    </template>
                    <template #no-data>
                      <v-row>
                        <v-col
                          class="my-16 text-md-h4 text-lg-h2 grey--text text--darken-1"
                          cols="12"
                          align-self="center"
                          align="center"
                        >
                          {{ $t("No Data Found") }}
                        </v-col>
                      </v-row>
                    </template>
                    <template v-if="items.length > 0" #footer>
                      <v-row class="my-5 me-1" align="center" justify="center">
                        <v-spacer />
                        <span
                          class="grey--text"
                          :class="{
                            'mr-4': $i18n.locale != 'ar',
                            'ml-4': $i18n.locale == 'ar',
                          }"
                        >
                          {{
                            $t("Page") + " " + page + " " + $t("of") + " " + numberOfPages
                          }}
                        </span>
                        <v-btn
                          fab
                          :disabled="!hasNext"
                          small
                          color="primary"
                          :class="{
                            'mr-1': $i18n.locale != 'ar',
                            'ml-1': $i18n.locale == 'ar',
                          }"
                          @click="nextPage"
                        >
                          <v-icon>
                            mdi-chevron-{{ $i18n.locale == "ar" ? "right" : "left" }}
                          </v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          :disabled="!hasPervious"
                          small
                          color="primary"
                          class="ml-1"
                          @click="formerPage"
                        >
                          <v-icon>
                            mdi-chevron-{{ $i18n.locale == "ar" ? "left" : "right" }}
                          </v-icon>
                        </v-btn>
                      </v-row>
                    </template>
                    <template #no-data>
                  <v-row>
                    <v-col cols="12" align-self="center" align="center">
                      <h1 class="primary--text text--darken-4">
                        {{ $t('No Data Found') }}
                      </h1>
                      <v-icon size="100" color="primary">mdi-home-alert</v-icon>
                    </v-col>
                  </v-row>
                </template>
                  </v-data-iterator>
                </v-col>
                <v-col v-else align="center">
                    <v-progress-circular color="primary" size="250" width="15" indeterminate />
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isSidebar: false,
      loading: false,
      sortBy: [
        { name: this.$i18n.t("Low to High"), value: "price_asc" },
        { name: this.$i18n.t("High to Low"), value: "price_desc" },
        { name: this.$i18n.t("Newest"), value: "date_desc" },
        { name: this.$i18n.t("Oldest"), value: "date_asc" },
      ],
      cartCount: 0,
      range: [0, Number.MAX_SAFE_INTEGER],
    };
  },
  head: {
    title: "Products",
  },
  computed: {
    page() {
      return this.products ? this.products.currentPage : 1;
    },
    itemCount() {
      return this.products ? this.products.totalCount : 0;
    },
    itemsPerPage() {
      return this.products ? this.products.pageSize : 10;
    },
    numberOfPages() {
      return this.products ? this.products.totalPages : 1;
    },
    hasNext() {
      return this.products ? this.products.hasNextPage : false;
    },
    hasPervious() {
      return this.products ? this.products.hasPreviousPage : false;
    },
    items() {
      return this.products ? this.products.model : [];
    },
    ...mapGetters({
      products: "getProducts",
      categories: "getProductCategories",
      manufacturers: "getProductManufacturers",
      minPrice: "getMinPrice",
      maxPrice: "getMaxPrice",
      filters: "getFilters",
    }),
  },
  async mounted() {
    await this.getItems(this.$route.query, false);
  },
  methods: {
    ...mapActions(["filter", "getProducts"]),
    getItems(data = {}, push=true) {
      this.loading = true;
      this.$store.dispatch("filter", data).finally(()=> (this.loading = false));
      // data = Object.keys(data).reduce((p, c) => {
      //   if (data[c] && data[c] != null) p[c] = data[c];
      //   return p;
      // }, {});
      if(push){
        this.$router.push(this.localePath({ name: "products", query: this.filters }));
      } else {
        this.setPriceFilter([this.minPrice, this.maxPrice]);
      }
    },
    orderFilter(e) {
      this.getItems({ orderby: e });
    },
    categoryFilter(id) {
      this.getItems({ categoryid: id });
    },
    setPriceFilter(e) {
      if (e[1] !== 0) {
        this.range = e;
      }
    },
    priceFilter() {
      this.getItems({
        minprice: this.range[0],
        maxprice: this.range[1],
      });
    },
    manufacturerFilter(id) {
      this.getItems({ manufacturerid: id });
    },
    ratingFilter(e) {
      this.getItems({ rating: e });
    },
    clearFilter(filter) {
      const obj = {};
      obj[filter] = null;
      this.getItems(obj);
    },
    nextPage() {
      if (!this.hasNext) return;
      this.getItems({ PageNumber: this.page + 1 });
    },
    formerPage() {
      if (!this.hasPervious) return;
      this.getItems({ PageNumber: this.page - 1 });
    },
  },
};
</script>
