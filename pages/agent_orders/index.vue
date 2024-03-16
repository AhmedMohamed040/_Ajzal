<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div class="box-wrapper">
          <div
            class="box-overlay"
            :class="{ open: isSidebar }"
            @click="isSidebar = !isSidebar"
          />
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebar />
          </div>
          <div
            :class="{
              'box-content': $i18n.locale == 'en',
              'box-content-rtl': $i18n.locale == 'ar',
            }"
          >
            <div class="d-flex justify-end pa-2 d-block d-lg-none">
              <v-btn icon @click="isSidebar = !isSidebar">
                <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              </v-btn>
            </div>
            <div class="box-container">
              <div class="d-flex align-center mb-5">
                <v-avatar tile size="25" class="me-3">
                  <img src="@/assets/images/icons/bag_filled.svg" alt="" />
                </v-avatar>
                <h2 class="mb-0">{{ $t('agentOrders') }}</h2>
              </div>
              <div class="d-none px-4 d-md-flex d-sm-flex mb-5">
                <h4 class="font-600 grey--text text--darken-2 flex-1 ">
                  {{ $t('Order #') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1 ">
                  {{ $t('Status') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1 ">
                  {{ $t('productsNumber') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1 ">
                  {{ $t('Date Purchased') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1 ">
                  {{ $t('price') }}
                </h4>
                <div class="px-5"></div>
              </div>
              <v-data-iterator
                :items="items"
                :items-per-page.sync="pageSize"
                :page.sync="pageNumber"
                hide-default-footer
              >
                <template #default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12">
                      <a href="#" class="text-decoration-none">
                        <base-card class="">
                            <div
                              class="pa-md-4 pa-sm-2 d-sm-flex justify-sm-center align-center flex-wrap"
                            >
                              <div class="flex-1 d-sm-flex px-2">
                                <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1"
                                    >
                                      {{ $t('Order #') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <h4 class="font-600 mb-0">
                                      {{ item.number }}
                                    </h4>
                                  </v-col>
                                </v-row>
                                <h4
                                  class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex font-600 mb-0"
                                >
                                  {{ item.number }}
                                </h4>
                              </div>
                              <div class="flex-1  d-sm-flex px-2">
                                <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">

                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1 "
                                    >
                                    {{ $t('Status') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8" >
                                    <v-chip
                                  class="ma-2"
                                  color="grey lighten-2"
                                  small
                                >
                                  {{ $t(`agentOrderStatus.${item.status}`) }}
                                </v-chip>
                                  </v-col>
                                </v-row>

                                <v-chip
                                  class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex ma-2 "
                                  color=" grey lighten-2"
                                  small
                                >
                                  {{ $t(`agentOrderStatus.${item.status}`) }}
                                </v-chip>
                              </div>
                              <div class="flex-1 d-sm-flex px-2">
                                <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1"
                                    >
                                      {{ $t('productsNumber') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <h4 class="font-600 mb-0">
                                      {{ item.totalItems }}
                                    </h4>
                                  </v-col>
                                </v-row>
                                <h4
                                  class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex font-600 mb-0"
                                >
                                  {{ item.totalItems }}
                                </h4>
                              </div>
                              <div class="flex-1  d-sm-flex px-2">
                                <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1 "
                                    >
                                      {{ $t('Date Purchased') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <p class="mb-0">
                                      {{ $moment(item.createdAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm') }}
                                    </p>
                                  </v-col>
                                </v-row>

                                <p class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex mb-0">
                                  {{ $moment(item.createdAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm') }}
                                </p>
                              </div>
                              <div class="flex-1  d-sm-flex px-2">
                                <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1 "
                                    >
                                      {{ $t('price') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <p class="mb-0">
                                      {{ item.customPrice }} {{ $t('SAR') }}
                                    </p>
                                  </v-col>
                                </v-row>

                                <p class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex mb-0">
                                  {{ item.customPrice }} {{ $t('SAR') }}
                                </p>

                              </div>
                              <v-btn
                                icon
                                class="px-4 mx-5 mb-2"
                                color="grey"
                                :to="
                                  localePath({
                                    name: 'agent_orders-id',
                                    params: { id: item.id },
                                  })
                                "
                              >
                                <v-icon
                                  >mdi-arrow-{{
                                    $vuetify.rtl ? 'left' : 'right'
                                  }}</v-icon
                                >
                              </v-btn>
                            </div>
                        </base-card>
                      </a>
                    </v-col>
                  </v-row>
                </template>

                <template v-if="items.length > 0" #footer>
                  <v-row class="my-5 me-1" align="center" justify="center">
                    <v-spacer />

                    <span class="mr-4 grey--text">
                      {{ $t('Page') }} {{ pageNumber }} {{ $t('of') }}
                      {{ totalPages }}
                    </span>
                    <v-btn
                      fab
                      :disabled="pageNumber == 1"
                      small
                      color="primary"
                      class="mr-1"
                      @click="formerPage"
                    >
                      <v-icon
                        >mdi-chevron-{{
                          $vuetify.rtl ? 'right' : 'left'
                        }}</v-icon
                      >
                    </v-btn>
                    <v-btn
                      fab
                      :disabled="pageNumber == totalPages"
                      small
                      color="primary"
                      class="ml-1"
                      @click="nextPage"
                    >
                      <v-icon
                        >mdi-chevron-{{
                          $vuetify.rtl ? 'left' : 'right'
                        }}</v-icon
                      >
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
      loading: false,
      pageNumber: 1,
      totalPages: 1,
      pageSize: 10,
      totalCount: 0,
      items: [],
    }
  },
  head: {
    title: 'Order List',
  },
  created() {
    this.getData()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getData(pageNumber = null) {
      this.loading = true
      const params = {}
      if (pageNumber) params.pageNumber = pageNumber
      this.$axios
        .$get('order-requests', { params })
        .then((r) => {
          this.items = r.model
          this.pageNumber = r.currentPage
          if (r.totalPages !== 0) {
            this.totalPages = r.totalPages
          }
        })
        .finally(() => (this.loading = false))
    },
    nextPage() {
      if (this.pageNumber + 1 <= this.totalPages)
        this.getData(this.pageNumber + 1)
    },
    formerPage() {
      if (this.pageNumber - 1 >= 1) this.getData(this.pageNumber - 1)
    },
  },
}
</script>
