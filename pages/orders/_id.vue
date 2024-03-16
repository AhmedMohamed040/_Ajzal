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
                  <h2 class="mb-0">{{ $t('Order Details') }}</h2>
                </div>
                <div v-if="invoice">
                  <v-btn
                    v-if="accepted || prepared || delivered"
                    text
                    color="primary"
                    class="text-capitalize font-600"
                    @click="$refs.downloadPdf.generateReport(); show(invoice, item.orderItems)"
                  >
                    {{ $t('Download Invoice') }}
                  </v-btn>
                  <download-pdf ref="downloadPdf" title="invoice">
                      <PdfTemplatesInvoice :item="invoice" :order-items="item.orderItems" />
                  </download-pdf>
                </div>
          <!--       <v-btn
                  v-if="delivered || canceled"
                  outlined
                  color="primary"
                  class="text-capitalize font-600"
                >
                  {{ $t('Order Again') }}
                </v-btn> -->
              </div>
              <v-row>
                <v-col cols="12">
                  <base-card>
                    <div class="px-6 py-14">
                      <div class="d-flex align-center">
                        <div class="p-relative">
                          <v-avatar
                            v-if="!pending"
                            class="order-details-custom-done"
                            size="22"
                            color="grey lighten-2"
                          >
                            <img
                              class="w-12 icon secondary--text text--darken-1 mr-0"
                              src="@/assets/images/icons/done.svg"
                              alt=""
                            />
                          </v-avatar>
                          <v-avatar size="64" color="primary">
                            <img
                              class="w-32 icon secondary--text text--darken-1 mr-0"
                              src="@/assets/images/icons/package-box.svg"
                              alt=""
                            />
                          </v-avatar>
                        </div>
                        <v-sheet
                          :color="prepared || delivered || canceled ? 'primary': 'grey lighten-2'"
                          elevation="0"
                          height="4"
                          class="flex-grow-1"
                        />
                        <div>
                          <v-avatar size="64" :color="prepared || delivered || canceled ?'primary' : 'grey lighten-2'">
                            <img
                              v-svg-inline
                              class="w-32 icon white--text mr-0"
                              src="@/assets/images/icons/truck-1.svg"
                              alt=""
                            />
                          </v-avatar>
                        </div>
                        <v-sheet
                          :color="delivered || canceled ?'primary' : 'grey lighten-2'"
                          elevation="0"
                          height="4"
                          class="flex-grow-1"
                        />
                        <div>
                          <v-avatar size="64" :color="delivered || canceled ?'primary' : 'grey lighten-2'">
                            <img
                              v-svg-inline
                              class="w-32 icon white--text mr-0"
                              src="@/assets/images/icons/delivery.svg"
                              alt=""
                            />
                          </v-avatar>
                        </div>
                      </div>
                      <!-- <div class="d-flex justify-end mt-10">
                        <div
                          class="py-2 px-5 primary--text primary lighten-5 text-center text-wrap rounded-pill"
                        >
                          <p class="mb-0">
                            {{ $t('Estimated Delivery Date') }}
                            <span class="font-weight-bold">4th October</span>
                          </p>
                        </div>
                      </div> -->
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12">
                  <base-card>
                    <div class="mx-auto py-3 text-center">
                      <h2> {{ $t(`orderStatus.${item.status}`) }} </h2>
                    </div>

                  </base-card>
                </v-col>
                <v-col v-if="item.reason" cols="12">
                  <base-card>
                    <div class="mx-auto py-3 px-2 text-center">
                      <h2> {{ String(item.reason) }} </h2>
                    </div>

                  </base-card>
                </v-col>
                <v-col cols="12">
                  <base-card>
                    <div
                      class="grey lighten-2 align-center d-flex justify-space-between flex-nowrap flex-sm-row flex-column"
                    >

                      <div class="d-flex my-3 mx-3">
                        <p class="text-14 grey--text text--darken-2 mb-0 mr-2">
                          {{ $t('Order #') }}:
                        </p>
                        <p class="mb-0 grey--text text--darken-4">
                          {{ item.number }}
                        </p>
                      </div>
                      <div class="d-flex my-3 mx-3">
                        <p class="text-14 grey--text text--darken-2 mb-0 mr-2">
                          {{ $t('Placed on') }}:
                        </p>
                        <p class="mb-0 grey--text text--darken-4">
                          {{ $moment(item.orderedAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm')}}
                        </p>
                      </div>
                      <div v-if="delivered" class="d-flex my-3 mx-3">
                        <p class="text-14 grey--text text--darken-2 mb-0 mr-2">
                          {{ $t('Delivered on') }}:
                        </p>
                        <p class="mb-0 grey--text text--darken-4">
                          {{  $moment(item.deliveredAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm')}}
                        </p>
                      </div>
                    </div>
                    <div v-for="(itm, index) in item.orderItems" :key="index">
                      <div
                        class="d-flex align-center justify-space-between flex-nowrap pa-4 flex-sm-row flex-column"
                      >
                        <div class="d-flex align-center flex-wrap me-2">
                          <v-avatar tile size="64" class="me-4">
                            <img
                              v-if="itm.product.imageUrl"
                              :src="itm.product.imageUrl"
                              @error="itm.product.imageUrl = defaultImage"

                            />
                            <img
                              v-else
                              height="250"
                              :src="defaultImage"
                            />
                          </v-avatar>
                          <div>
                            <div class="text-14 font-600">
                              {{ itm.product.name }}
                            </div>
                            <div class="text-14 grey--text text--darken-2">
                              {{ itm.unitPrice }} {{ $t('SAR') }} &times;
                              {{ itm.quantity }}
                            </div>
                          </div>
                        </div>


                        <v-btn
                          v-if="delivered"
                          text
                          color="primary"
                          class="text-capitalize font-weight-bold"
                          @click="openReturnRequestDialog(itm)"
                        >
                          {{ $t('Request Return') }}
                        </v-btn>
                        <v-btn
                          v-if="itm.product.productReview === null && (delivered || canceled)"
                          text
                          color="primary"
                          class="text-capitalize font-weight-bold"
                          @click="openReviewDialog(itm.product.id)"
                        >
                          {{ $t('Write a Review') }}
                        </v-btn>
                      </div>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12" lg="6">
                  <base-card>
                    <div class="pa-5">
                      <h4 class="mb-3 grey--text text--darken-4">
                        {{ $t('Shipping Address') }}
                      </h4>
                      <p class="text-14 mb-0">
                        {{
                          item.shipping.street
                            ? `${$t('Street')} ${item.shipping.street}`
                            : ''
                        }}
                        {{
                          item.shipping.buildingNumber
                            ? `${$t('Building Number')} ${
                                item.shipping.buildingNumber
                              }`
                            : ''
                        }}
                        {{
                          item.shipping.office
                            ? `${$t('Office')} ${item.shipping.office}`
                            : ''
                        }}
                        {{
                          item.shipping.floor
                            ? `${$t('Floor')} ${item.shipping.floor}`
                            : ''
                        }}
                        {{
                          item.shipping.apartmentNumber
                            ? `${$t('Apartment Number')} ${
                                item.shipping.apartmentNumber
                              }`
                            : ''
                        }}
                        {{
                          item.shipping.landmark
                            ? `${$t('Landmark')} ${item.shipping.landmark}`
                            : ''
                        }}
                      </p>
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
                          {{ $t('Subtotal') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ item.invoice.totalPriceNoTax.toFixed(2) }} {{ $t('SAR') }}</p>
                      </div>
                      <!-- <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 grey--text text--darken-2">
                          {{ $t('Shipping Cost') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">$10 {{ $t('SAR') }}</p>
                      </div> -->
                      <div v-if="item.invoice.customDiscount" class="d-flex justify-space-between mb-2 red--text">
                        <p class="tex-14 mb-0">
                          {{ $t('Discount') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">- {{ item.invoice.customDiscount }} {{ $t('SAR') }}</p>
                      </div>
                      <div v-if="invoice" class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0">
                          {{ $t('Tax') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ (invoice.vat).toFixed(2) }} {{ $t('SAR') }}</p>
                      </div>
                      <v-divider class="my-3"></v-divider>
                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 font-weight-bold">{{ $t('Total') }}:</p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ item.invoice.customPrice }} {{ $t('SAR') }}</p>
                      </div>
                      <p v-if="item.invoice.paymentMethod">{{ $t('Paid by') }} {{ item.invoice.paymentMethod.name }}</p>
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
    <v-dialog v-model="reviewDialog" max-width="500">
      <v-container class="white pa-8" fluid>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="reviewForm.comment"
              outlined
              auto-grow
              hide-details="auto"
              :loading="reviewLoading"
              :label="$t('Comment')"
            />
          </v-col>
          <v-col cols="12">
            {{ $t('Rating') }}
            <v-rating
              v-model="reviewForm.rate"
              color="primary"
              large
              size="16"
            />
          </v-col>
          <v-col cols="12">
            <v-btn block color="primary" :loading="reviewLoading" @click="sendReview">
              {{ $t('Submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
    <v-dialog v-model="returnRequestDialog" max-width="500">
      <v-container class="white pa-8" fluid>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="returnRequestForm.reason"
              :loading="returnRequestLoading"
              outlined
              auto-grow
              :label="$t('Reason')"
            />
          </v-col>
          <v-col
          cols="12"
          sm="6"
          md="5"
        >
          <v-text-field
            ref="quantity"
            v-model="returnRequestForm.quantity"
            :label="$t('Quantity')"
            :error-messages="errors.quantity"
            :rules="[rules.required, rules.min, rules.max]"
            outlined
            dense

          ></v-text-field>
        </v-col>
          <v-col cols="12">
            <v-btn block color="primary" :loading="returnRequestLoading" @click="sendReturnRequest">
              {{ $t('Submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
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
      item: null,
      imagesUrl: 'https://api.ajzal.sa/',
      defaultImage: 'https://api.ajzal.sa/uploads/ajzal-uploaded-images/default.jpg',
      invoice: null,
      reviewDialog: false,
      reviewLoading: false,
      reviewForm: {},

      returnRequestDialog: false,
      returnRequestLoading: false,
      returnRequestForm: {
        quantity: ''
      },
      retunedItem: {},
      min: 1,
      rules: {
        required: value => !!value || this.$t('required'),
        min: (v) => v >= this.min|| '1 ' + this.$t('min'),
        max: (v) => v <= this.retunedItem.quantity || `${this.retunedItem.quantity} ` + this.$t('max'),
      },
      errors: {}
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
    prepared() {
      return this.item ? this.item.status === 'Prepared': false
    },
    delivered() {
      return this.item ? this.item.status === 'Delivered': false
    },
    rejected() {
      return this.item ? this.item.status === 'Rejected': false
    },
    canceled() {
      return this.item ? this.item.status === 'Canceled': false
    },
  },
  watch: {
    reviewDialog(v) {
      if (!v) {
        this.reviewForm = {}
      }
    },
    returnRequestDialog(v) {
      if (!v) {
        this.returnRequestForm = {}
      }
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.$route.params.id) return
      this.loading = true
      this.$axios
        .$get('orders/' + this.$route.params.id)
        .then((res) => {
          this.item = res.model
          this.getInvoice()
        })
        .finally(() => (this.loading = false))
    },
    getInvoice() {
			this.$axios.$get('invoices/invoice-details/'+ this.item.invoice.id).then((r) => {
        console.log(r)
        this.invoice = r.model
      });
		},
    show(a,b) {
      console.log(a, b)
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
    openReturnRequestDialog(item) {
      this.retunedItem = item
      this.returnRequestForm = { orderItemId: item.id }
      this.returnRequestDialog = true

    },
    sendReturnRequest() {
      if(this.$refs.quantity.valid ){

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
      }

    },

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
