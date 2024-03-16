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
            v-if="!loading && item"
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
                  <v-avatar tile size="25" class="me-3">
                    <img src="@/assets/images/icons/bag_filled.svg" alt="" />
                  </v-avatar>
                  <h2 class="mb-0">{{ $t('returnOrderDetails') }}</h2>
                </div>
          <!--       <div v-if="String(invoice)">
                  <v-btn
                    v-if="accepted  || returned"
                    text
                    color="primary"
                    class="text-capitalize font-600"
                    @click="$refs.downloadPdf.generateReport()"
                  >
                    {{ $t('Download Invoice') }}
                  </v-btn>
                  <download-pdf ref="downloadPdf" title="invoice">
                      <PdfTemplatesInvoice :item="String('invoice')" :order-items="item.orderItem" />
                  </download-pdf>
                </div> -->
          <!--       <v-btn
                  v-if="returned || canceled"
                  outlined
                  color="primary"
                  class="text-capitalize font-600"
                >
                  {{ $t('Order Again') }}
                </v-btn> -->
              </div>
              <v-row>

                <v-col>
                  <base-card>
                    <div class="mx-auto py-3 text-center">
                      <h2> {{  $t(item.status) }} </h2>
                    </div>
                    <div v-if="rejected">
                      {{ item.reason }}
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12">
                  <base-card>
                    <div
                      class="grey lighten-2 d-flex justify-space-around flex-wrap"
                    >
                      <div class="d-flex my-3 mx-3">
                        <p class="text-14 grey--text text--darken-2 mb-0 mr-2">
                          {{ $t('Order #') }}:
                        </p>
                        <p class="mb-0 grey--text text--darken-4">
                          {{ item.orderNumber }}
                        </p>
                      </div>
                      <div class="d-flex my-3 mx-3">
                        <p class="text-14 grey--text text--darken-2 mb-0 mr-2">
                          {{ $t('Placed on') }}:
                        </p>
                        <p class="mb-0 grey--text text--darken-4">
                          {{ $moment(item.createdAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm') }}
                        </p>
                      </div>

                    </div>
                    <div >
                      <div
                        class="d-flex align-center justify-space-around flex-wrap pa-4"
                      >
                        <div class="d-flex align-center flex-wrap me-4">
                          <v-avatar tile size="64" class="me-4">
                            <img
                              v-if="item.orderItem.product.imageUrl"
                              :src="item.orderItem.product.imageUrl"
                            />
                            <img
                              v-else
                              height="250"
                              src="@/assets/images/product.png"
                            />
                          </v-avatar>
                          <div>
                            <div class="text-14 font-600">
                              {{ String(item.orderItem.product.name) }}
                            </div>
                            <div class="text-14 grey--text text--darken-2">
                              {{ item.orderItem.unitPrice }} {{ $t('SAR') }} &times;
                              {{ item.orderItem.quantity }}
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-2">
                          {{ item.orderItem.product.details }}
                        </p>

                      </div>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12" lg="6">
                  <base-card>
                    <div class="pa-5">
                      <h4 class="mb-3 grey--text text--darken-4">
                        {{ $t('Details') }}
                      </h4>
                      <p class="text-14 mb-0">
                      {{ $t('Reason') +  " : " + item.reason }}
                      </p>
                      <p class="text-14 mb-0">
                      {{ $t('Quantity') +  " : " + item.quantity }}
                      </p>
                <!--       <p  class="text-14 mb-0">
                      {{ item.warehouse ? $t('warehouse') +  " : " + item.warehouse : $t('warehouse') +  " : " + $t('doesNotExist') }}
                      </p>
                      <p class="text-14 mb-0">
                      {{ item.orderItem.product.category ? $t('Category') +  " : " + item.orderItem.product.category : $t('Category') +  " : " + $t('doesNotExist')}}
                      </p> -->
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12" lg="6">
                  <base-card>
                    <div class="pa-5">
                      <h4 class="mb-3 grey--text text--darken-4">
                        {{ $t('Total Summary') }}
                      </h4>
                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 grey--text text--darken-2">
                          {{ $t('Quantity') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ item.quantity }} {{ $t('SAR') }}</p>
                      </div>

                      <div  class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0">
                          {{ $t('price') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ item.orderItem.unitPrice.toFixed(2) }} {{ $t('SAR') }}</p>
                      </div>
                      <div  class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0">
                          {{ $t('Tax') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ vatCalc.toFixed(2) }} {{ $t('SAR') }}</p>
                      </div>
                      <v-divider class="my-3"></v-divider>
                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 font-weight-bold">{{ $t('Total') }}:</p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ (item.orderItem.unitPrice * item.quantity + vatCalc).toFixed(2) }} {{ $t('SAR') }}</p>
                      </div>
                    </div>
                  </base-card>
                </v-col>
              </v-row>
            </div>
          </div>
          <v-col
            v-else-if="!loading && !item"
            align="center"
            align-self="center"
          >
            {{ $t('No Data') }}
          </v-col>
          <v-col v-else align="center" align-self="center">
            <v-progress-circular indeterminate size="200" width="20" />
          </v-col>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import DashbordSidebar from '@/components/DashboardSidebar'
export default {
  components: {
    DashbordSidebar,
  },
  data() {
    return {
      isSidebar: false,
      loading: false,
      item: {},
      invoice: null,
      reviewDialog: false,
      reviewLoading: false,
      reviewForm: {},
      returnRequestDialog: false,
      returnRequestLoading: false,
      returnRequestForm: {},
    }
  },
  head: {
    title: 'Order Details',
  },
  computed: {
    pending() {
      return this.item ? this.item.status === 'Pending': false
    },
    accepted() {
      return this.item ? this.item.status === 'Accepted': false
    },

    returned() {
      return this.item ? this.item.status === 'Returned': false
    },
    rejected() {
      return this.item ? this.item.status === 'Rejected': false
    },
    order() {
      return this.item
    },
    vatCalc() {
      var vat = this.item.vat * this.item.quantity * this.item.orderItem.unitPrice / 100
      console.log(vat)
      return vat;
    }
  },
  watch: {
  /*   reviewDialog(v) {
      if (!v) {
        this.reviewForm = {}
      }
    },
    returnRequestDialog(v) {
      if (!v) {
        this.returnRequestForm = {}
      }
    }, */
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.$route.params.id) return
      this.loading = true
      this.$axios
        .$get('return-order-items/' + this.$route.params.id)
        .then((res) => {
          this.item = res.model
        })
        .finally(() => (this.loading = false))
    },
   /*  getInvoice() {
			this.$axios.$get('invoices/invoice-details/'+ this.item.invoice.id).then((r) => {
        this.invoice = r.model
      });
		},
    openReviewDialog(id) {
      this.reviewForm = { productId: id }
      this.reviewDialog = true
    },
    sendReview() {
      this.reviewLoading = true;
      this.$axios
        .$post('products/review', this.reviewForm)
        .then(() => {
          this.$notifier.showMessage({ content: this.$i18n.t('Submitted Review Successfully') })
          this.getData()
        }).catch(() => {
          this.$notifier.showMessage({ content: this.$i18n.t('Something Gone Wrong'), color: 'error' })
        })
        .finally(() => {
          this.reviewLoading = false;
          this.reviewDialog = false;
        })
    },
    openReturnRequestDialog(id) {
      this.returnRequestForm = { orderItemId: id }
      this.returnRequestDialog = true
    },
    sendReturnRequest() {
      this.returnRequestLoading = true;
      this.$axios
        .$post('return-order-items', this.returnRequestForm)
        .then(() => {
          this.$notifier.showMessage({ content: this.$i18n.t('Submitted Return Successfully') })
        }).catch(() => {
          this.$notifier.showMessage({ content: this.$i18n.t('Something Gone Wrong'), color: 'error' })
        })
        .finally(() => {
          this.returnRequestDialog = false;
          this.returnRequestLoading = false;
        })
    }, */


  },
}
</script>
<style lang="css" scoped>
.w-32 {
  width: 32px;
}
.w-12 {
  width: 12px;
}
.order-details-custom-done {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
