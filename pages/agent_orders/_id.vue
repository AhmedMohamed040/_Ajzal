<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div class="box-wrapper">
          <div class="box-overlay" :class="{ open: isSidebar }" @click="isSidebar = !isSidebar" />
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebar />
          </div>
          <div v-if="!loading && item" :class="{
            'box-content': $i18n.locale == 'en',
            'box-content-rtl': $i18n.locale == 'ar',
          }">
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
                <!--       <div v-if="invoice">
                  <v-btn
                    v-if="accepted || prepared || delivered"
                    text
                    color="primary"
                    class="text-capitalize font-600"
                    @click="$refs.downloadPdf.generateReport()"
                  >
                    {{ $t('Download Invoice') }}
                  </v-btn>
                  <download-pdf ref="downloadPdf" title="invoice">
                      <PdfTemplatesInvoice :item="invoice" :order-items="item.orderItems" />
                  </download-pdf>
                </div> -->
                <div>

                  <v-dialog v-if="pending" v-model="dialogReject" max-width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn outlined color="error" class="text-capitalize font-600" v-bind="attrs" v-on="on">
                        {{ $t('orders.rejectOrder') }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="primary white--text">
                        <span class="text-h5">{{ $t('orders.rejectOrder') }}</span>
                      </v-card-title>

                      <v-card-text class="mt-2">
                        <v-container>
                          <v-row class="my-3 d-flex justify-space-send">
                            <v-col cols="12" sm="12" class="d-flex align-end">
                              <v-textarea v-model="reason" outlined name="input-7-43" :label="$t('orders.rejectReason')"
                                :value="reason.text"></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-4" dark class="my-2 px-3 py-3" @click="retjectOrder()">
                          {{ $t('send') }}
                        </v-btn>

                        <v-btn color="red darken-4" dark class="my-2 mx-2 px-3 py-3" @click="close()">
                          {{ $t('cancel') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-if="pending" v-model="dialogAccept" max-width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn outlined color="primary" class="text-capitalize font-600" v-bind="attrs" v-on="on">
                        {{ $t('orders.acceptOrder') }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="primary white--text">
                        <span class="text-h5">{{ $t('orders.acceptOrder') }}</span>
                      </v-card-title>

                      <v-card-text class="mt-2">
                        <v-container>
                          <v-row class="my-3 d-flex justify-space-send">
                            <v-col cols="12" sm="12" class="d-flex align-end">
                              <p>
                                {{ $t('orders.areYouSureYouWantToAcceptThisOrder') }}
                              </p>
                            </v-col>
                            <v-col cols="12" sm="12" class="d-flex align-end">
                              <v-textarea v-model="notes" outlined name="input-7-43" :label="$t('notes')"
                                ></v-textarea>

                            </v-col>
                            <v-col cols="12" sm="12" class="d-flex align-end">

                    <div class="pa-5">
                      <h6 class="mb-4">{{ $t('Choose') }} {{ $t('Shipping Address') }}</h6>

                      <v-data-iterator
                        :items="addresses.items"
                        :items-per-page.sync="addresses.items.length"
                        hide-default-footer
                      >
                        <template #default="props">
                          <v-radio-group v-model="addresses.selected" mandatory hide-details="auto">
                            <v-row>
                              <v-col
                                v-for="item in props.items"
                                :key="item.id"
                                cols="12"
                              >
                                <base-card>
                                  <div
                                    class="pa-4 d-flex align-center text-center flex-wrap"
                                  >
                                    <dir>
                                      <v-radio :value="item.id" />
                                    </dir>
                                    <div class="flex-1">
                                      <p>
                                        {{ item.name }}
                                      </p>
                                    </div>
                                    <div class="flex-1">
                                      <p>
                                        {{
                                          item.street
                                            ? `${$t('Street')} ${item.street}`
                                            : ''
                                        }}
                                        {{
                                          item.buildingNumber
                                            ? `${$t('Building Number')} ${
                                                item.buildingNumber
                                              }`
                                            : ''
                                        }}
                                        {{
                                          item.office
                                            ? `${$t('Office')} ${item.office}`
                                            : ''
                                        }}
                                        {{
                                          item.floor
                                            ? `${$t('Floor')} ${item.floor}`
                                            : ''
                                        }}
                                        {{
                                          item.apartmentNumber
                                            ? `${$t('Apartment Number')} ${
                                                item.apartmentNumber
                                              }`
                                            : ''
                                        }}
                                        {{
                                          item.landmark
                                            ? `${$t('Landmark')} ${
                                                item.landmark
                                              }`
                                            : ''
                                        }}
                                      </p>
                                    </div>
                                    <!-- <div class="mr-3">
                                      <lazy-edit-address
                                        :item="item"
                                        @success="editAddress"
                                      />
                                    </div> -->
                                  </div>
                                </base-card>
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </template>

                        <template
                          v-if="
                           addresses.items.length > 0 &&
                            addresses.pageNumber < addresses.totalPages
                          "
                          #footer
                        >
                          <v-row
                            class="my-5 me-1"
                            align="center"
                            justify="center"
                          >
                            <v-col>
                              <v-btn
                                :loading="addresses.loading"
                                color="primary"
                                @click="getAddresses(addresses.pageNumber + 1)"
                              >
                                {{ $t('Show More') }}
                              </v-btn>
                            </v-col>
                          </v-row>
                        </template>

                        <template #no-data>
                          <v-row>
                            <v-col v-if="!addresses.loading" cols="12" align-self="center" align="center">
                              <h1 class="primary--text text--darken-4">
                                {{ $t('No Data Found') }}
                              </h1>
                              <v-icon size="100" color="primary"
                                >mdi-home-alert</v-icon
                              >
                            </v-col>
                            <v-col
                              v-else
                              cols="12"
                              class="text-center"
                            >
                              <v-progress-circular indeterminate color="primary" size="200" width="20" />
                            </v-col>
                          </v-row>
                        </template>
                      </v-data-iterator>
                    </div>

                </v-col>

                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-4" dark class="my-2 px-3 py-3" @click="acceptOrder()">
                          {{ $t('send') }}
                        </v-btn>

                        <v-btn color="red darken-4" dark class="my-2 mx-2 px-3 py-3" @click="close()">
                          {{ $t('cancel') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>

              </div>
              <v-row>

                <v-col>
                  <base-card>
                    <div class="mx-auto py-3 text-center">
                      <div v-if="accepted" class="d-flex flex-row justify-center align-center ">
                        <h2 class="text-h6 font-weight-bold "> {{ $t(`agentOrdersStatus.${item.status}`) }} </h2>

                        <v-btn
                                icon
                                class="px-4 mx-5 mb-2 center-icon"
                                color="grey"
                                :to="
                                  localePath({
                                    name: 'orders',
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
                      <h2 v-else class="text-h6 font-weight-bold"> {{ $t(`agentOrdersStatus.${item.status}`) }} </h2>
                    </div>

                  </base-card>
                </v-col>
                <v-col cols="12">
                  <base-card>
                    <div
                      class="grey lighten-2 align-center d-flex justify-space-between flex-nowrap flex-sm-row flex-column">

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
                          {{ $t('Date Purchased') }}:
                        </p>
                        <p class="mb-0 grey--text text--darken-4">
                          {{  $moment(item.createdAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm')}}
                        </p>
                      </div>
                    </div>
                    <div v-for="(itm, index) in item.orderRequestItems" :key="index">
                      <div
                        class="d-flex align-center justify-space-between flex-nowrap pa-4 flex-sm-row flex-column"
                      >
                        <div class="d-flex align-center flex-wrap me-2">
                          <v-avatar tile size="64" class="me-4">
                            <img
                              v-if="itm.product.imageUrl"
                              :src="itm.product.imageUrl"
                            />
                            <img
                              v-else
                              height="250"
                              src="@/assets/images/product.png"
                            />
                          </v-avatar>
                          <div>
                            <div class="text-14 font-600">
                              {{ itm.product.name }}
                            </div>
                            <div class="text-14 grey--text text--darken-2">
                              {{ itm.price }} {{ $t('SAR') }} &times;
                              {{ itm.quantity }}
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </base-card>
                </v-col>

                <v-col cols="12" >
                  <base-card>
                    <div class="pa-5">
                      <h4 class="mb-3 grey--text text--darken-4">
                        {{ $t('Total Summary') }}
                      </h4>
                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 grey--text text--darken-2">
                          {{ $t('Price before discount') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ item.totalPrice }} {{ $t('SAR') }}</p>
                      </div>
                      <!-- <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 grey--text text--darken-2">
                          {{ $t('Shipping Cost') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold">$10 {{ $t('SAR') }}</p>
                      </div>v-if="item.invoice.customDiscount"  v-if="item.invoice.totalPrice !== item.invoice.totalPriceNoTax" v-if="item.invoice.paymentMethod" -->
                      <div class="d-flex justify-space-between mb-2 red--text">
                        <p class="tex-14 mb-0">
                          {{ $t('Discount') }}:
                        </p>
                        <p class="tex-14 mb-0 font-weight-bold"> {{ item.customDiscount}} {{ $t('SAR') }}</p>
                      </div>
                      <div class="d-flex justify-space-between mb-2">

                      </div>
                      <v-divider class="my-3"></v-divider>
                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 font-weight-bold">{{ $t('Total') }}:</p>
                        <p class="tex-14 mb-0 font-weight-bold">{{ item.customPrice }} {{ $t('SAR') }}</p>
                      </div>
                    </div>
                  </base-card>
                </v-col>
              </v-row>
            </div>
          </div>
          <v-col v-else-if="!loading && !item" align="center" align-self="center">
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
      reason: '',
      notes: '',
      addresses: {
        loading: false,
        items: [],
        pageNumber: 1,
        totalPages: 1,
        selected: null,
      },
      isSidebar: false,
      loading: false,
      isloding: true,
      item: null,
      dialogAccept: false,
      dialogReject: false,
      invoice: null,

      returnRequestForm: {
        quantity: ''
      },
      retunedItem: {},
      min: 1,
      rules: {
        required: value => !!value || this.$t('required'),
        min: (v) => v >= this.min || '1 ' + this.$t('min'),
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
      return this.item ? this.item.status === 'Pending' : false
    },
    accepted() {
      return this.item ? this.item.status === 'Accepted' : false
    },

    rejected() {
      return this.item ? this.item.status === 'Rejected' : false
    },


  },
  watch: {

  },
  created() {
    this.getData()
    this.getAddresses()
  },
  methods: {
    getData() {
      if (!this.$route.params.id) return
      this.loading = true
      this.$axios
        .$get('order-requests/' + this.$route.params.id)
        .then((res) => {
          this.item = res.model
        })
        .finally(() => (this.loading = false))
    },

    acceptOrder() {
      const formData = new FormData();
      formData.append('rejectReason', this.reason)
      formData.append('Notes', this.notes)
      formData.append('AddressId', this.addresses.selected)

      this.$axios
        .$put(`order-requests/${this.$route.params.id}/accept`, formData)
        .then((res) => {
          this.item = res.model
        })
        .finally(() => {
          this.getData()

          this.loading = false
        });
    },
    retjectOrder() {
      const formData = new FormData();
      formData.append('rejectReason', this.reason)
      this.$axios
        .$put(`order-requests/${this.$route.params.id}/decline`, formData)
        .then((res) => {
          this.item = res.model
        })
        .finally(() => {
          this.getData()

          this.loading = false
        })
    },
    close() {
      this.reason = '';
      this. addresses = {
        loading: false,
        items: [],
        pageNumber: 1,
        totalPages: 1,
        selected: null,
      };
      this.notes = '';
      this.dialogReject = false;
      this.dialogAccept = false;
    },
    getAddresses(pageNumber = null) {
      this.addresses.loading = true;
      const params = {};
      if (pageNumber) {
        params.pageNumber = pageNumber;
      }
      this.$axios.$get('addresses', { params }).then((r) => {
        this.addresses.items = r.model;
        this.addresses.pageNumber = r.currentPage;
        if (r.totalPages !== 0) {
          this.addresses.totalPages = r.totalPages;
        }
      }).finally(() => (this.addresses.loading = false));
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
.center-icon{
  text-align: center;
}
.order-details-custom-done {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
