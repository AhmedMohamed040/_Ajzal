<template>
  <v-container class="my-6">
    <v-row>
      <v-col v-if="cartItems.length > 0" cols="12">
        <v-stepper v-model="stepper" rounded alt-labels flat>
          <v-stepper-header>
            <v-stepper-step :complete="stepper > 1" step="1">
              {{ $t('Cart') }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepper > 2" step="2">
              {{ $t('Shipping Address') }}
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              {{ $t('Chechkout') }}
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row>
                <v-col cols="12" md="6" lg="8" xl="8">
                  <div v-for="(cartItem, index) in cartItems" :key="index">
                    <base-card class="d-flex flex-wrap mb-6">
                      <nuxt-link
                        :to="
                          localePath({
                            name: 'products-id',
                            params: { id: cartItem.product.id },
                          })
                        "
                      >
                        <v-avatar tile size="140">
                          <img
                            v-if="cartItem.product.imageUrl"
                            :src="cartItem.product.imageUrl"
                            @error="handleImageError"
                          />
                          <v-img
                            v-else
                            :src="
                              imagesUrl +
                              '/uploads/ajzal-uploaded-images/default.jpg'
                            "
                          />
                        </v-avatar>
                      </nuxt-link>
                      <div
                        class="d-flex flex-column flex-grow-1 flex-wrap pa-4 mw-0"
                      >
                        <div class="d-flex justify-space-between w-100 mb-3">
                          <div>
                            <nuxt-link
                              class="text-decoration-none black--text"
                              :to="
                                localePath({
                                  name: 'products-id',
                                  params: { id: cartItem.product.id },
                                })
                              "
                            >
                              <div class="d-flex">
                                <h4 class="font-600 text-truncate mb-4">
                                  {{ cartItem.product.name }}
                                </h4>
                              </div>
                            </nuxt-link>
                            <div>
                              <p class="grey--text text--darken-1">
                                <span class="text-h6">
                                  {{
                                    (
                                      cartItem.qtyPrice / cartItem.quantity
                                    ).toFixed(2)
                                  }}
                                  {{ $t('SAR') }}
                                </span>
                                <v-icon>mdi-close</v-icon>
                                <span class="text-h6">
                                  {{ cartItem.quantity }}
                                </span>
                                <span class="mx-2 text-h6">=</span>
                                <span class="primary--text text-h6">
                                  {{ cartItem.qtyPrice.toFixed(2) }}
                                  {{ $t('SAR') }}
                                </span>
                              </p>
                            </div>
                          </div>
                          <v-btn icon @click="deleteCart(cartItem)">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </div>
                        <div>
                          <v-row dense no-gutters>
                            <v-col cols="12" class="d-flex align-center mb-3">
                              <v-btn
                                class="rounded"
                                outlined
                                fab
                                x-small
                                tile
                                color="primary"
                                @click="decreaseFromCart(cartItem)"
                              >
                                <v-icon>mdi-minus</v-icon>
                              </v-btn>
                              <base-editable-element
                                :min="0"
                                :value="`${cartItem.quantity}`"
                                :max="cartItem.product.quantity"
                                @input="setQuantity($event, cartItem)"
                              />
                              <v-btn
                                class="rounded"
                                outlined
                                fab
                                x-small
                                tile
                                color="primary"
                                @click="addToCart(cartItem)"
                              >
                                <v-icon>mdi-plus</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </base-card>
                  </div>
                </v-col>
                <v-col cols="12" md="6" lg="4" xl="4">
                  <base-card>
                    <div class="pa-5">
                      <div class="d-flex justify-space-between">
                        <p class="mb-0 grey--text text--darken-1">
                          {{ $t('Total') }}
                        </p>
                        <h4 class="font-600">
                          {{ total.toFixed(2) }} {{ $t('SAR') }}
                        </h4>
                      </div>
                    </div>
                  </base-card>
                </v-col>
                <v-col>
                  <v-btn color="primary" @click="validateAndContinue">
                    {{ $t('Continue') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row>
                <v-col cols="12" xl="9" lg="8" md="6">
                  <base-card>
                    <div class="pa-5">
                      <h6 class="mb-4">
                        {{ $t('Choose') }} {{ $t('Shipping Address') }}
                      </h6>

                      <v-data-iterator
                        :items="addresses.items"
                        :items-per-page.sync="addresses.items.length"
                        hide-default-footer
                      >
                        <template #default="props">
                          <v-radio-group
                            v-model="addresses.selected"
                            hide-details="auto"
                          >
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
                            items.length > 0 &&
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
                            <v-col
                              v-if="!addresses.loading"
                              cols="12"
                              align-self="center"
                              align="center"
                            >
                              <h1 class="primary--text text--darken-4">
                                {{ $t('No Data Found') }}
                              </h1>
                              <v-icon size="100" color="primary"
                                >mdi-home-alert</v-icon
                              >
                            </v-col>
                            <v-col v-else cols="12" class="text-center">
                              <v-progress-circular
                                indeterminate
                                color="primary"
                                size="200"
                                width="20"
                              />
                            </v-col>
                          </v-row>
                        </template>
                      </v-data-iterator>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12" xl="3" lg="4" md="6">
                  <base-card>
                    <div class="pa-5">
                      <div class="d-flex justify-space-between mb-2">
                        <p class="mb-0 grey--text text--darken-1">
                          {{ $t('Subtotal') }}:
                        </p>
                        <h4 class="font-600 mb-0">
                          {{ summary.subtotal }} {{ $t('SAR') }}
                        </h4>
                      </div>
                      <!-- <div class="d-flex justify-space-between mb-2">
                        <p class="mb-0 grey--text text--darken-1">{{ $t('Shipping') }}:</p>
                        <h4 class="font-600">{{ summary.shipping }} {{ $t('SAR') }}</h4>
                      </div> -->
                      <div
                        v-if="summary.tax"
                        class="d-flex justify-space-between mb-2"
                      >
                        <p class="mb-0 grey--text text--darken-1">
                          {{ $t('Tax') }}:
                        </p>
                        <h4 class="font-600">
                          {{ summary.tax.toFixed(3) }} {{ $t('SAR') }}
                        </h4>
                      </div>
                      <div
                        v-if="summary.discount"
                        class="d-flex justify-space-between mb-2"
                      >
                        <p class="mb-0 grey--text text--darken-1">
                          {{ $t('Discount') }}:
                        </p>
                        <h4 class="font-600">
                          {{ summary.discount }} {{ $t('SAR') }}
                        </h4>
                      </div>
                      <v-divider class="my-3" />
                      <div class="d-flex justify-end">
                        <h2 class="mb-3">
                          {{ summary.total }} {{ $t('SAR') }}
                        </h2>
                      </div>
                      <v-divider v-if="theRole == 'User'" class="my-3" />
                      <div v-if="theRole == 'User1'">
                        <v-text-field
                          v-model="voucher.value"
                          :label="$t('Voucher')"
                          :loading="voucher.loading"
                          :disabled="voucher.valid"
                          :color="voucher.valid ? 'success' : 'primary'"
                          outlined
                          dense
                          :reverse="$i18n.locale == 'ar'"
                          hide-details="auto"
                          class="mb-4"
                        />
                        <v-btn
                          v-if="voucher.valid"
                          outlined
                          class="text-capitalize font-600"
                          :loading="voucher.loading"
                          color="primary"
                          block
                          @click="removeVoucher"
                        >
                          {{ $t('Remove') }}
                        </v-btn>
                        <v-btn
                          v-else
                          outlined
                          class="text-capitalize font-600"
                          :loading="voucher.loading"
                          color="primary"
                          block
                          @click="getSummary"
                        >
                          {{ $t('Apply') }}
                        </v-btn>
                      </div>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="primary"
                    :disabled="!addresses.selected"
                    @click="goToCheckOut"
                  >
                    {{ $t('Select Payment Method') }}
                  </v-btn>
                  <v-btn color="secondary" @click="stepper = 1">
                    {{ $t('Back') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row>
                <v-col cols="12" xl="9" lg="8" md="6">
                  <base-card>
                    <div class="pa-5">
                      <v-radio-group
                        v-model="paymentMethods.selected"
                        mandatory
                        class="mt-0 pt-0"
                        hide-details="auto"
                      >
                        <v-row>
                          <v-col
                            v-for="item in paymentMethods.items"
                            :key="item.id"
                            cols="12"
                          >
                            <v-radio
                              :value="item.normalizedName"
                              color="secondary"
                            >
                              <template #label>
                                <h6 class="black--text font-600">
                                  {{ item.name }}
                                </h6>
                              </template>
                            </v-radio>
                            <v-expand-transition>
                              <v-row
                                v-if="
                                  item.normalizedName == 'BANK_TRANSFER' &&
                                  paymentMethods.selected == 'BANK_TRANSFER'
                                "
                                class="mt-4"
                              >
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    v-model="bankPaymentInfo.bankName"
                                    :label="$t('Bank Name')"
                                    outlined
                                    hide-details="auto"
                                  />
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    v-model="bankPaymentInfo.transferNumber"
                                    :label="$t('Transfer Number')"
                                    outlined
                                    hide-details="auto"
                                    type="number"
                                  />
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    ref="tranAmount"
                                    v-model="bankPaymentInfo.transferAmount"
                                    :error-messages="errors.PaymentMethod"
                                    :rules="[rules.required, rules.max]"
                                    :label="$t('Transfer Amount')"
                                    outlined
                                    hide-details="auto"
                                    type="number"
                                  />
                                </v-col>
                                <v-col cols="12" md="6">
                                  <file-select
                                    :text="$t('Attachment')"
                                    @returnFile="
                                      (file) =>
                                        (bankPaymentInfo.attachment = file)
                                    "
                                  />
                                </v-col>
                              </v-row>
                            </v-expand-transition>
                          </v-col>
                        </v-row>
                      </v-radio-group>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12" xl="3" lg="4" md="6">
                  <base-card>
                    <div class="pa-5">
                      <div class="d-flex justify-space-between mb-2">
                        <p class="mb-0 grey--text text--darken-1">
                          {{ $t('Subtotal') }}:
                        </p>
                        <h4 class="font-600 mb-0">
                          {{ summary.subtotal }} {{ $t('SAR') }}
                        </h4>
                      </div>
                      <!-- <div class="d-flex justify-space-between mb-2">
                        <p class="mb-0 grey--text text--darken-1">{{ $t('Shipping') }}:</p>
                        <h4 class="font-600">{{ summary.shipping }} {{ $t('SAR') }}</h4>
                      </div> -->
                      <div
                        v-if="summary.tax"
                        class="d-flex justify-space-between mb-2"
                      >
                        <p class="mb-0 grey--text text--darken-1">
                          {{ $t('Tax') }}:
                        </p>
                        <h4 class="font-600">
                          {{ summary.tax.toFixed(3) }} {{ $t('SAR') }}
                        </h4>
                      </div>
                      <div
                        v-if="summary.discount"
                        class="d-flex justify-space-between mb-2"
                      >
                        <p class="mb-0 grey--text text--darken-1">
                          {{ $t('Discount') }}:
                        </p>
                        <h4 class="font-600">
                          {{ summary.discount }} {{ $t('SAR') }}
                        </h4>
                      </div>
                      <v-divider class="my-3"></v-divider>
                      <div class="d-flex justify-end">
                        <h2 class="mb-3">
                          {{ summary.total }} {{ $t('SAR') }}
                        </h2>
                      </div>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="12">
                  <!--    <ul v-if="Object.keys(errors).length > 0" class="error--text text--darken-2">
                       <li v-for="(error, index) in Object.keys(errors)" :key="index">
                        {{ error }}
                        <ul v-if="errors[error].length > 0" class="error--text">
                          <li v-for="(spcErr, i) in errors[error]" :key="i">
                            {{ spcErr }}
                          </li>
                        </ul>
                      </li>
                    </ul> -->
                  <v-btn color="primary" @click="completeOrder">
                    {{ $t('Complete Order') }}
                  </v-btn>
                  <v-btn text @click="stepper -= 1"> {{ $t('Back') }} </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col
        v-if="cartItems.length === 0 && !initialLoading"
        cols="12"
        class="text-center primary--text"
      >
        <div class="text-h3">!! {{ $t('Your Cart is Empty') }} !!</div>
        <br />
        <v-icon size="200" color="primary">mdi-emoticon-sad-outline</v-icon>
      </v-col>
      <v-col v-if="initialLoading" cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="150"
          width="20"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      items: [],
      initialLoading: false,
      stepper: 1,
      errors: {},
      imagesUrl: 'https://api.ajzal.sa/',
      imageSrc: this.imagesUrl+ 'uploads/ajzal-uploaded-images/default.jpg',
      defaultImage:
        'https://api.ajzal.sa/uploads/ajzal-uploaded-images/default.jpg',

      radios: null,
      rules: {
        required: (value) => !!value || this.$t('required'),
        max: (v) =>
          v <= this.summary.total || `${this.summary.total} ` + this.$t('max'),
      },
      radiosTwo: null,
      addresses: {
        loading: false,
        items: [],
        pageNumber: 1,
        totalPages: 1,
        selected: null,
      },
      summary: {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        discount: 0,
        total: 0,
      },
      voucher: {
        loading: false,
        value: null,
        valid: false,
      },
      paymentMethods: {
        items: [],
        selected: null,
      },

      bankPaymentInfo: {
        transferNumber: null,
        bankName: null,
        attachment: null,
        transferAmount: null,
      },
    }
  },
  head: {
    title: 'Cart',
  },
  computed: {
    theRole() {
      const role = localStorage.getItem('role')
      return role
    },
    total() {
      let total = 0
      const token = localStorage.getItem('accessToken')
      if (token) {
        return this.cartTotal
      } else {
        this.cartItems.forEach((c) => {
          total += c.product.salePrice * c.quantity
        })
      }
      return total
    },
    ...mapGetters({
      cartItems: 'getCartProducts',
      cartTotal: 'cartTotal',
      role: 'getRole',
    }),
  },
  watch: {
    'paymentMethods.selected'() {
      this.bankPaymentInfo = {
        transferNumber: null,
        bankName: null,
        attachment: null,
        transferAmount: null,
      }
    },
  },
  async created() {
    this.initialLoading = true
    await this.getAddresses()
    await this.$store.dispatch('getCarts').finally(() => {
      this.initialLoading = false
    })
  },
  methods: {
    handleImageError(event) {
      event.target.src = this.defaultImage;
    },
    setQuantity(e, item) {
      let quantity = e
      const newItem = { ...item }
      if (typeof quantity === 'object') {
        quantity = e.target.value
      }
      if (quantity <= 0) {
        newItem.quantity = 1
      } else if (quantity > item.product.quantity) {
        newItem.quantity = item.product.quantity
        this.$notifier.showMessage({
          content: this.$i18n.t('QuantityExcceeded'),
          color: 'error',
        })
      } else {
        newItem.quantity = quantity
      }
      this.$store.dispatch('setCartQuantity', newItem)
    },
    validateAndContinue() {
      const token = localStorage.getItem('accessToken')
      if (token) {
        this.stepper = this.stepper + 1
        this.getAddresses()
        this.getSummary()
        return
      }
      this.setLoginDialog(1)
    },
    getAddresses(pageNumber = null) {
      this.addresses.loading = true
      const params = {}
      if (pageNumber) {
        params.pageNumber = pageNumber
      }
      this.$axios
        .$get('addresses', { params })
        .then((r) => {
          this.addresses.items = r.model
          this.addresses.pageNumber = r.currentPage
          if (r.totalPages !== 0) {
            this.addresses.totalPages = r.totalPages
          }
        })
        .finally(() => (this.addresses.loading = false))
    },
    getSummary() {
      this.voucher.loading = true
      const params = { couponCode: this.voucher.value }
      this.$axios
        .$get('orders/order-summary', { params })
        .then((r) => {
          this.summary.subtotal = r.model.subtotal
          this.summary.shipping = r.model.shipping
          this.summary.tax = r.model.tax
          this.summary.discount = r.model.discount
          if (r.model.isCopounValid) {
            this.voucher.valid = true
          } else {
            this.voucher.valid = false
          }
          this.summary.total = r.model.totalAmount
        })
        .finally(() => (this.voucher.loading = false))
    },
    removeVoucher() {
      this.voucher.value = null
      this.voucher.valid = false
    },
    goToCheckOut() {
      this.getPaymentMethods()
      this.stepper = 3
    },
    getPaymentMethods() {
      this.$axios.$get('payments/payment-methods').then((r) => {
        this.paymentMethods.items = r.model
      })
    },
    completeOrder() {
      this.completeLoading = true
      const formData = new FormData()
      formData.append('addressId', this.addresses.selected)
      formData.append('PaymentMethod', this.paymentMethods.selected)
      if (this.voucher.value && this.voucher.value !== '') {
        formData.append('CouponCode', this.voucher.value)
      }
      if (
        this.$store.state.role === 'Merchant' &&
        this.paymentMethods.selected === 'BANK_TRANSFER'
      ) {
        Object.keys(this.bankPaymentInfo).forEach((r) => {
          formData.append(`bankPaymentInfo${r}`, this.bankPaymentInfo[r])
        })
      }
      this.$axios
        .$post('orders/make-order', formData)
        .then(async (r) => {
          await this.$store.dispatch('getCarts')
          this.$router.push(
            this.localePath({ name: 'orders-id', params: { id: r.model.id } })
          )
        })
        .catch((e) => {
          this.errors = e.response.data.errors
        })
        .finally(() => (this.completeLoading = false))
    },
    addToCart(item) {
      if (item.quantity)
        if (item.quantity >= item.product.quantity) {
          this.$notifier.showMessage({
            content: this.$i18n.t('QuantitNotAvailable'),
            color: 'error',
          })
          return
        }
      this.addCart(item).then((re) => {})
    },
    decreaseFromCart(item) {
      this.decreaseCart(item).then((re) => {})
    },
    decreaseTheCart(item) {
      this.deleteCart(item).then((re) => {})
    },
    ...mapMutations(['setLoginDialog', 'setCartTotal']),
    ...mapActions(['addCart', 'decreaseCart', 'deleteCart', 'getCarts']),
  },
}
</script>
