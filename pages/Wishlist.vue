<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div class="box-wrapper">
          <div
            class="box-overlay"
            :class="{ open: isSidebar }"
            @click="isSidebar = !isSidebar"
          ></div>
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebar />
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
              <div class="d-flex justify-space-between flex-wrap mb-5">
                <div class="d-flex align-center">
                  <img
                    class="icon mr-3 primary--text"
                    src="@/assets/images/icons/heart_filled.svg"
                    alt=""
                  />
                  <h2 class="mb-0">{{ $t('myWishList') }}</h2>
                </div>
              </div>

              <v-row>
                <v-col cols="12">
                  <v-data-iterator
                    :items="items"
                    :items-per-page.sync="itemsPerPage"
                    :page.sync="pageNumber"
                    hide-default-footer
                  >
                    <template #default="props">
                      <v-row>
                        <v-col
                          v-for="item in props.items"
                          :key="item.id"
                          cols="12"
                          sm="6"
                          md="6"
                          lg="4"
                          xl="4"
                        >
                          <CardCart
                          @favorite="changeFavorite"
                          :product="item.product" />
                        </v-col>
                      </v-row>
                    </template>

                    <template v-if="items.length > 0" #footer>
                      <v-row class="my-5 me-1" align="center" justify="center">
                        <v-spacer />

                        <span class="mr-4 grey--text">
                          {{ $t('Page') }} {{ pageNumber }} of {{ itemsPerPage }}
                        </span>
                        <v-btn
                          fab
                          :disabled="pageNumber == 1"
                          small
                          color="primary"
                          class="mr-1"
                          @click="formerPage"
                        >
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          :disabled="pageNumber >= totalPages"
                          small
                          color="primary"
                          class="ml-1"
                          @click="nextPage"
                        >
                          <v-icon>mdi-chevron-right</v-icon>
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
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashbordSidebar from '@/components/DashboardSidebar.vue'
export default {
  components: {
    DashbordSidebar,
  },
  data() {
    return {
      isSidebar: false,
      pageNumber: 1,
      itemsPerPage: 10,
      totalPages: 0,
      items: [],
    }
  },
  head: {
    title: 'Wishlist',
  },
  created() {
    this.getWishlist()
  },

  methods: {
    nextPage(){
      this.getWishlist(this.pageNumber+1);
    },
    formerPage(){
      if(this.pageNumber >1) return;
      this.getWishlist(this.pageNumber - 1);
    },
    getWishlist(page = 1) {
      this.$axios.$get(`favorites?PageNumber=${page}&PageSize=${this.itemsPerPage}`).then(r => {
        this.items = r.model;
        this.pageNumber = r.currentPage;
        if (r.totalPages !== 0) {
          this.totalPages = r.totalPages;
        }
      })
    },
    changeFavorite(fav, prodId){
      console.log(fav, prodId)
    }
  },
}
</script>
