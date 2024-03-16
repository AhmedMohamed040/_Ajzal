<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div class="box-wrapper">
          <div class="box-overlay" :class="{ open: isSidebar }" @click="isSidebar = !isSidebar" />
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebar />
          </div>
          <div :class="{
              'box-content': $i18n.locale == 'en',
              'box-content-rtl': $i18n.locale == 'ar',
            }">
            <div class="d-flex justify-end pa-2 d-block d-md-none">
              <v-btn icon @click="isSidebar = !isSidebar">
                <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              </v-btn>
            </div>
            <div class="box-container">
              <div class="d-flex align-center mb-5">
                <v-avatar tile size="25" class="me-3">
                  <img src="@/assets/images/icons/bag_filled.svg" alt="" />
                </v-avatar>
                <h2 class="mb-0">{{ $t('My Bills') }}</h2>
              </div>
              <!-- <div class="d-none px-4 d-md-flex mb-5">
                <h4 class="font-600 grey--text text--darken-2 flex-1 px-8" >
                  {{ $t('Invoice #') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1 px-12" >
                  {{ $t('Payment Method') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1" >
                    {{ $t('paymentType') }}
                  </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1" >
                  {{ $t('Debtor') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1" >
                  {{ $t('Creditor') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1" >
                  {{ $t('Date Created') }}
                </h4>
                <h4 class="font-600 grey--text text--darken-2 flex-1" >
                  {{ $t('Balance') }}
                </h4>

                <div class="px-5"></div>
              </div> -->
              <div  class="pa-md-4 pa-sm-2 d-sm-flex justify-sm-center align-center flex-nowrap">
                                <div class="flex-1 d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex px-4">
                  <h4 class="font-600 grey--text text--darken-2 flex-1 " >
                    {{ $t('Invoice #') }}
                  </h4>
                  <h4 class="font-600 grey--text text--darken-2 flex-1 " >
                    {{ $t('Payment Method') }}
                  </h4>
                  <h4 class="font-600 grey--text text--darken-2 flex-1" >
                    {{ $t('Date Created') }}
                  </h4>
                  <h4 class="font-600 grey--text text--darken-2 flex-1" >
                      {{ $t('paymentType') }}
                    </h4>

                  <h4 class="font-600 grey--text text--darken-2 flex-1" >
                    {{ $t('Debtor') }}
                  </h4>
                  <h4 class="font-600 grey--text text--darken-2 flex-1" >
                    {{ $t('Creditor') }}
                  </h4>

                  <h4 class="font-600 grey--text text--darken-2 flex-1" >
                    {{ $t('Balance') }}
                  </h4>
                  </div>
                </div>
              <v-data-iterator
              :items="items"
              :items-per-page.sync="pageSize"
              :page.sync="pageNumber"
               hide-default-footer>
                <template #default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12">
                      <a href="#" class="text-decoration-none">
                        <base-card class="">
                          <div  class="pa-md-4 pa-sm-2 d-sm-flex justify-sm-center align-center flex-nowrap">
                            <div class="flex-1 d-sm-flex ">
                              <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1"
                                    >
                                      {{$t('Invoice #') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <h4 class="font-600 mb-0">
                                      {{ item.invoiceSid }}
                                    </h4>
                                  </v-col>
                                </v-row>
                                <h4
                                  class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex font-600 mb-0"
                                >
                                {{ item.invoiceSid }}
                                </h4>
                            </div>
                            <div class="flex-1 d-sm-flex ">
                              <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1 "
                                    >
                                    {{ $t('Payment Method') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8" >
                                    <v-chip
                                  class="ma-2"
                                  color="grey lighten-2"
                                  small
                                >
                                {{ item.paymentMethod.name }}
                                </v-chip>
                                  </v-col>
                                </v-row>

                                <v-chip
                                  class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex ma-2 "
                                  color=" grey lighten-2"
                                  small
                                >
                                {{ item.paymentMethod.name }}
                                </v-chip>

                            </div>
                            <div class="flex-1 d-sm-flex">
                              <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1 "
                                    >
                                      {{ $t('Date Created') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <p class="mb-0">
                                      {{ $moment(item.createdAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm')}}
                                    </p>
                                  </v-col>
                                </v-row>

                                <p class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex mb-0">
                                  {{ $moment(item.createdAt).tz($moment.tz.guess()).format('HH:mm') }}
                                  <br/>
                                  {{ $moment(item.createdAt).tz($moment.tz.guess()).format('YYYY-MM-DD') }}

                                </p>
                            </div>
                            <div class="flex-1 d-sm-flex ">
                                <v-row class="d-sm-none ma-0">
                                    <v-col cols="4">
                                      <h4
                                        class="font-600 grey--text text--darken-2 flex-1"
                                      >
                                        {{ $t('paymentType') }}
                                      </h4>
                                    </v-col>
                                    <v-col cols="8">
                                      <h4 class="font-600 mb-0" v-if="item.paymentType">
                                        {{ item.paymentType.name }}
                                      </h4>
                                      <h4 class="font-600 mb-0" v-else>
                                        '-'
                                      </h4>
                                    </v-col>
                                  </v-row>
                                  <p
                                  v-if="item.paymentType"
                                    class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex  mb-0"
                                  >
                                  {{ item.paymentType.name }}
                                </p>
                                <p
                                v-else
                                    class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex  mb-0"
                                  >
                                  '-'
                                </p>
                              </div>

                            <div class="flex-1 d-sm-flex ">
                              <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1"
                                    >
                                      {{$t('Debtor') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <h4 class="font-600 mb-0">
                                      {{ item.debtor }}
                                    </h4>
                                  </v-col>
                                </v-row>
                                <p
                                  class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex mb-0"
                                >
                                {{ item.debtor }}
                              </p>
                            </div>

                            <div class="flex-1 d-sm-flex ">
                              <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1"
                                    >
                                      {{$t('Creditor') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <h4 class="font-600 mb-0">
                                      {{ item.creditor }}
                                    </h4>
                                  </v-col>
                                </v-row>
                                <p
                                  class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex  mb-0"
                                >
                                {{ item.creditor }}
                              </p>
                            </div>


                            <div class="flex-1 d-sm-flex ">
                              <v-row class="d-sm-none ma-0">
                                  <v-col cols="4">
                                    <h4
                                      class="font-600 grey--text text--darken-2 flex-1 "
                                    >
                                      {{ $t('Balance') }}
                                    </h4>
                                  </v-col>
                                  <v-col cols="8">
                                    <span v-if="Math.sign(item.balance) == -1" class="mb-0 red--text" >
                                      {{ Math.abs(item.balance).toFixed(2) }} {{ $t('SAR') }}
                                    </span>
                                    <span v-if="Math.sign(item.balance) == 1" class="mb-0 success--text text--darken-2" >
                                      {{ Math.abs(item.balance).toFixed(2) }} {{ $t('SAR') }}
                                    </span>
                                    <span v-if="Math.sign(item.balance) == 0" class="mb-0 deep-orange--text text--darken-4" >
                                      {{ Math.abs(item.balance).toFixed(2) }} {{ $t('SAR') }}
                                    </span>
                                  </v-col>
                                </v-row>
                                <span v-if="Math.sign(item.balance) == -1" class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex mb-0 red--text" >
                                      {{ Math.abs(item.balance).toFixed(2) }} {{ $t('SAR') }}
                                    </span>
                                    <span v-if="Math.sign(item.balance) == 1" class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex mb-0 success--text text--darken-2" >
                                      {{ Math.abs(item.balance).toFixed(2) }} {{ $t('SAR') }}
                                    </span>
                                    <span v-if="Math.sign(item.balance) == 0" class="d-sm-flex d-none d-md-flex d-lg-flex d-xl-flex mb-0  deep-orange--text text--darken-4" >
                                      {{ Math.abs(item.balance).toFixed(2) }} {{ $t('SAR') }}
                                    </span>
                            </div>

                            <!-- <v-btn
                              icon
                              color="grey"
                              :to="localePath({name:'orders-id', params: { id: item.id } })"
                            >
                              <v-icon>mdi-arrow-right</v-icon>
                            </v-btn> -->
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
                      {{ $t('Page') }} {{ pageNumber }} {{ $t('of') }} {{ totalPages }}
                    </span>
                    <v-btn fab :disabled="pageNumber == 1" small color="primary" class="mr-1" @click="formerPage">
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab :disabled="pageNumber == totalPages" small color="primary" class="ml-1" @click="nextPage">
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
      balance: 0,
      total: 0,
      numberOfMovements: 0
    }
  },
  head: {
    title: 'Bill List',
  },
  created() {
    this.getData();
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getData(pageNumber = null) {
      this.loading = true;
      const params = {};
      if (pageNumber) params.pageNumber = pageNumber;
      this.$axios.$get('bills', { params }).then(r => {
        this.items = r.model.payments.model;
        this.balance = r.model.balance;
        this.total = r.model.total;
        this.numberOfMovements = r.model.numberOfMovements;
        this.pageNumber = r.model.payments.currentPage;
        if (r.model.payments.totalPages !== 0) {
          this.totalPages = r.model.payments.totalPages;
        }
      }).finally(() => (this.loading = false));
    },
    nextPage() {
      if (this.pageNumber + 1 <= this.totalPages) this.getData(this.pageNumber + 1);
    },
    formerPage() {
      if (this.pageNumber - 1 >= 1) this.getData(this.pageNumber - 1);
    },
  },
}
</script>
