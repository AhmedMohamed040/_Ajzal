<template>
  <v-container class="my-6" fluid>
    <v-row v-if="product">
      <v-col cols="12" md="4">
        <div v-if="product.productImages.length > 0" class="product-slider">
          <v-row>
            <v-col cols="12">
              <VueSlickCarousel
                ref="c1"
                :rtl="$i18n.locale == 'ar'"
                autoplay
                focus-on-select
                :as-nav-for="$refs.c2"
              >
                <div
                  v-for="item in product.productImages"
                  :key="item.id"
                  class="text-center"
                >
                  <v-img
                    v-if="item.imageUrl"
                    class="mx-auto"
                    width="300"
                    height="auto"
                    :src="item.imageUrl"
                    @error="item.imageUrl = defaultImage"
                  />
                  <img v-else height="250" :src="defaultImage" />
                </div>
              </VueSlickCarousel>
            </v-col>
            <v-col cols="12">
              <VueSlickCarousel
                ref="c2"
                :rtl="$i18n.locale == 'ar'"
                class="product-slider-click"
                :as-nav-for="$refs.c1"
                :slides-to-show="product.productImages.length"
                focus-on-select
              >
                <div v-for="item in product.productImages" :key="item.id">
                  <v-avatar class="white rounded" tile size="78">
                    <v-img v-if="item.imageUrl" :src="item.imageUrl" alt="" />
                    <img
                      v-else
                      height="250"
                      :src="defaultImage"
                    />
                  </v-avatar>
                </div>
              </VueSlickCarousel>
            </v-col>
          </v-row>
        </div>
        <div v-else class="text-center">
          <v-row>
            <v-col cols="12" align="center">
              <VueSlickCarousel
                ref="c1"
                :rtl="$i18n.locale == 'ar'"
                focus-on-select
                :as-nav-for="$refs.c2"
              >
                <div v-for="(item, index) in [0]" :key="index">
                  <img
                    height="250"
                    class="white rounded"
                    draggable="false"
                    :src="defaultImage"
                  />
                </div>
              </VueSlickCarousel>
            </v-col>
            <v-col cols="12">
              <VueSlickCarousel
                ref="c2"
                :rtl="$i18n.locale == 'ar'"
                class="product-slider-click"
                :as-nav-for="$refs.c1"
                focus-on-select
              >
                <div v-for="(item, index) in [0]" :key="index">
                  <v-avatar class="white rounded" tile size="78">
                    <img
                      height="250"
                      draggable="false"
                      :src="defaultImage"
                    />
                  </v-avatar>
                </div>
              </VueSlickCarousel>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6" md="4">
        <h1 class="mb-4">{{ product.name }}</h1>
        <div class="d-flex mb-4">
          <p class="grey--text text--grey-lighten-1 me-3 mb-0">
            {{ $t('Brand') }}:
          </p>
          <p class="font-600 mb-0">
            {{ product.manufacturer ? product.manufacturer.name : null }}
          </p>
        </div>
        <div class="d-flex mb-4">
          <p class="grey--text text--grey-lighten-1 me-3 mb-0">
            {{ $t('Category') }}:
          </p>
          <p class="font-600 mb-0">
            {{ product.category ? product.category.name : null }}
          </p>
        </div>
        <div class="d-flex">
          <p class="grey--text text--grey-lighten-1 me-3">
            {{ $t('Short Description') }}:
          </p>
          <p class="font-600" v-html="product.shortDetails" />
        </div>
        <div class="d-flex">
          <p class="grey--text text--grey-lighten-1 me-3 mb-0">
            {{ $t('Rating') }}:
          </p>
          <div class="d-flex align-center justify-center align-center mb-1">
            <v-rating
              :value="product.averageRate"
              color="amber"
              dense
              half-increments
              readonly
              size="16"
            />
            <div class="grey--text text--darken-4 ml-1">
              ({{ product.averageRate ? product.averageRate : 0 }})
            </div>
          </div>
        </div>
        <div>
          <h2 class="primary--text my-3">
            {{ product.salePrice }} {{ $t('SAR') }}
          </h2>
          <p v-if="product.quantity <= 0" class="error--text">
            <span class="display-1">{{ $t('Out of Stock') }}</span>
          </p>
          <p v-else class="success--text">{{ $t('Stock Available') }}</p>
        </div>
        <div
          v-if="product.quantity > 0 && cart.product"
          class="d-flex align-center"
        >
          <v-btn
            :class="cart.quantity <= 0 ? 'd-none' : 'd-block'"
            class="br-8"
            outlined
            icon
            tile
            color="primary"
            @click="removeFromCart"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <base-editable-element 
            :min="0"
            :value="`${cart.quantity}`"
            :max="product.quantity" 
            @input="setQuantity"
          />
          <v-btn
            v-show="product.quantity > 0"
            class="br-8"
            outlined
            icon
            tile
            color="primary"
            @click="addToCart"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div v-if="product.quantity > 0 && notAvailable == false" class="mb-6">
          <v-btn
            color="primary"
            class="text-capitalize mb-3"
            :class="!cart.product ? 'd-block' : 'd-none'"
            @click="addToCart"
          >
            {{ $t('Add To Cart') }}
          </v-btn>
        </div>
        <div v-else class="mb-6">
          <v-btn
            color="gray"
            class="text-capitalize mb-3"
            :class="!cart.product ? 'd-block' : 'd-none'"
            disabled
          >
            {{ $t('QuantitNotAvailable') }}
          </v-btn>
        </div>
        <div class="d-flex mb-4"></div>
      </v-col>
      <v-col cols="6" md="4">
        <v-row dense align="center" justify="start">
          <v-col cols="3">
            <v-avatar size="64" tile class="rounded">
              <img src="@/assets/ajzal/logo_small.svg" />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <h3>
              <span class="text-h6 font-weight-bold">{{ $t('Sold By') }} :</span>
              <span class="text-h4 grey--text text--darken-2">{{ $t('Ajzal') }}</span>
            </h3>
          </v-col>
          <v-col cols="3">
            <v-avatar size="64" tile>
              <img
                class="icon"
                src="@/assets/images/quality.png"
                alt=""
              />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <h3 class="font-weight-bold">
              {{ $t('Good Quality') }}
              <p class="text-14 grey--text text--darken-1">
                {{ $t('Garenteed') }}
              </p>
            </h3>
          </v-col>
          <v-col cols="3">
            <v-avatar size="64" tile>
              <img
                class="icon"
                src="@/assets/images/delivery.png"
                alt=""
              />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <h3 class="font-weight-bold">
              {{ $t('Free Delivery') }}
            </h3>
            <p class="text-14 grey--text text--darken-1">
              {{ $t('To Any Place') }}
            </p>
          </v-col>
          <v-col cols="3">
            <v-avatar size="64" tile>
              <img
                class="icon"
                src="@/assets/images/credit-card.png"
                alt=""
              />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <h3 class="font-weight-bold mb-0">
              {{ $t('Secure Payment') }}
            </h3>
            <p class="text-14 mb-0 grey--text text--darken-1">
              {{ $t('100% Secure') }}
            </p>
          </v-col>
          <v-col cols="3">
            <v-avatar size="64" tile>
              <img
                class="icon mx-2"
                src="@/assets/images/product-return.png"
                alt=""
              />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <h3 class="font-weight-bold mb-0">
              {{ $t('Easy Returns') }}
            </h3>
            <p class="text-14 mb-0 grey--text text--darken-1">
              {{ $t('In any Senario') }}
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="primary"
          class=""
        >
          <v-tab class="font-600 text-capitalize">
            {{ $t('Description') }}
          </v-tab>
          <v-tab v-if="product.productReviews" class="font-600 text-capitalize">
            {{ $t('Reviews') }} ({{ product.productReviews.length }})
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="transparent my-6 pb-6">
          <v-tab-item>
            <h3 class="mb-4">{{ $t('Specification') }} :</h3>
            <div class="Typography-sc-1nbqu5-0 ebXTOD" v-html="product.details">
            </div>
          </v-tab-item>
          <v-tab-item v-if="product">
            <div
              v-for="(review, index) in product.productReviews"
              :key="index"
              class="mb-8"
            >
              <div class="d-flex flex-wrap mb-4">
                <v-avatar class="me-3" size="48">
                  <img
                    :src="
                      review.imageUrl ||
                      require('@/assets/images/faces/avatar.png')
                    "
                    alt=""
                  />
                </v-avatar>
                <div>
                  <h5 class="font-600">{{ review.userName }}</h5>
                  <div class="d-flex align-center justify-center mb-1">
                    <v-rating
                      :value="Number(review.rate)"
                      color="amber"
                      class="me-2"
                      dense
                      half-increments
                      readonly
                      size="16"
                    />

                    <div class="font-600 me-2">{{ String(review.rate) }}</div>
                    <!-- <div class="grey--text text--darken-2">{{ review.date }}</div> -->
                  </div>
                </div>
                <span  v-if="review.userId == userInfo.userId">
                  <v-btn
                    text
                    color="primary"
                    class="text-capitalize font-600"
                    @click="
                      edit = !edit
                      reviewEdit(review)
                    "
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </span>
              </div>
              <v-row>
                <v-col cols="12" sm="7" md="6" lg="4">
                  {{ review.comment }}
                </v-col>
              </v-row>
            </div>
            <div v-if="edit">
              <v-row class="d-flex flex-colmun justify-start align-end">
                <v-col cols="12" md="5" class="d-flex flex-wrap mb-4">
                  <v-avatar>
                    <img :src="userAvatar" alt="user" />
                  </v-avatar>
                  <div>
                    <h4 class="font-600 mx-3">{{ newReview.userName }}</h4>
                    <div class="d-flex align-center justify-center mb-1 mx-1">
                      <v-rating
                        v-model="newReview.rate"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$ratingFull"
                        hover
                        size="32"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="1" sm="12">
                  <v-btn
                    text
                    :loading="reviewLoading"
                    color="primary"
                    class="text-capitalize font-600"
                    @click="submitReview()"
                  >
                    {{ btnName }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="5" class="">
                  <v-textarea
                    v-model="newReview.comment"
                    outlined
                    name="input-7-4"
                    label="Outlined textarea"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
            <!-- <div class="mb-8">
              <div class="d-flex flex-wrap mb-4">
                <v-avatar class="me-3" size="48">
                  <img src="@/assets/images/faces/6.png" alt="" />
                </v-avatar>
                <div>
                  <h5 class="font-600">Joe Kenan</h5>
                  <div class="d-flex align-center justify-center mb-1">
                    <v-rating
                      :value="4.5"
                      color="amber"
                      class="me-2"
                      dense
                      half-increments
                      readonly
                      size="16"
                    ></v-rating>

                    <div class="font-600 me-2">4.7</div>
                    <div class="grey--text text--darken-2">1.9 years ago</div>
                  </div>
                </div>
              </div>
              <v-row>
                <v-col cols="12" sm="7" md="6" lg="4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Varius massa id ut mattis. Facilisis vitae gravida egestas ac
                  account.
                </v-col>
              </v-row>
            </div>
            <div class="mb-8">
              <div class="d-flex flex-wrap mb-4">
                <v-avatar class="me-3" size="48">
                  <img src="@/assets/images/faces/8.png" alt="" />
                </v-avatar>
                <div>
                  <h5 class="font-600">Jenifer Tulio</h5>
                  <div class="d-flex align-center justify-center mb-1">
                    <v-rating
                      :value="4.5"
                      color="amber"
                      class="me-2"
                      dense
                      half-increments
                      readonly
                      size="16"
                    />

                    <div class="font-600 me-2">4.7</div>
                    <div class="grey--text text--darken-2">1.9 years ago</div>
                  </div>
                </div>
              </div>
              <v-row>
                <v-col cols="12" sm="7" md="6" lg="4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Varius massa id ut mattis. Facilisis vitae gravida egestas ac
                  account.
                </v-col>
              </v-row>
            </div> -->
          </v-tab-item>
        </v-tabs-items>

        <h3 class="mb-6">{{ $t('Related Products') }}</h3>
        <v-row v-if="relatedProducts.length > 0">
          <v-col
            v-for="item in relatedProducts.filter((p) => p.id != product.id)"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <LazyCardCart card-hover-shadow :product="item" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tab: null,
      notAvailable: false,
      product: null,
      imagesUrl: 'https://api.ajzal.sa/',
      defaultImage: 'https://api.ajzal.sa/uploads/ajzal-uploaded-images/default.jpg',
      userAvatar: null,
      reviewLoading: false,
      userInfo: {
        userName: '',
        userId: '',
      },
      edit: false,
      btnName: this.$i18n.t('add review'),
      relatedProducts: [],

      newReview: {
        productId: null,
        comment: null,
        rate: null,
        reviewId: null,
      },
    }
  },
  head: {
    title: 'ProductDetails',
  },
  computed: {
    ...mapGetters(['getRole', 'user']),
    cart() {
      const cart = this.$store.state.cart.find(
        (c) => c.product.id === this.product.id
      )
      if (cart) {
        return cart
      } else {
        return { quantity: 0 }
      }

    },
  },
  created() {
    this.getProduct()
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      if (this.user) {
        this.$axios.$get('auth/shared/me').then((res) => {
          console.log(res)

          this.userInfo.userName = res.model.name
          this.userInfo.userId = res.model.id

          res.model.imageUrl == null
            ? (this.userAvatar = require('@/assets/images/faces/avatar.png'))
            : (this.userAvatar = res.model.imageUrl)
        })
      } else {
        this.userAvatar = require('@/assets/images/faces/avatar.png')
      }
    },
    setQuantity(e) {
      let quantity = e
      const newItem = { ...this.cart }
      console.log(this.product.quantity <= quantity)
      if (typeof quantity === 'object') {
        quantity = parseInt(e.target.value)
      }
      if (quantity <= 0) {
        newItem.quantity = 1
      } else if (quantity >= this.product.quantity) {
        newItem.quantity = this.product.quantity
        
      } else {
        newItem.quantity = quantity
      }
      this.$store.dispatch('setCartQuantity', newItem)
    },
    async addToCart() {
      if(this.cart)
      if (this.cart.quantity >= this.product.quantity) {
        this.$notifier.showMessage({
                  content: this.$i18n.t('QuantitNotAvailable'),
                  color: 'error',
                })
        return
      }
      await this.$store
        .dispatch('addCart', { product: this.product })
        .then((re) => {
          this.$notifier.showMessage({
            content: this.$i18n.t('Added To Cart Successfully'),
          })
        })
        .catch((e) => {
          if (e.response.data.message.toLowerCase() == 'quantity not enough') {
            this.getRole == 'Merchant'
              ? this.$notifier.showMessage({
                  content: this.$i18n.t('QuantityExcceeded'),
                  color: 'error',
                })
              : this.$notifier.showMessage({
                  content: this.$i18n.t('QuantitNotAvailable'),
                  color: 'error',
                })

            //    this.$notifier.showMessage({ content: this.$i18n.t('QuantitNotAvailable'), color: 'error' });
          }
        })
    },
    removeFromCart() {
      this.$store.dispatch('decreaseCart', { product: this.product })
    },
    getProduct() {
      this.$axios.$get('products/' + this.$route.params.id).then((res) => {
        if (res.model.quantity <= 0 || res.model.quantity) {
          this.notAvailable = true
        }
        this.notAvailable = false
        this.product = res.model
        this.getProducts(res.model.category.id)
      })
    },
    getProducts(cat) {
      this.$axios
        .$get('products/', { params: { categoryid: cat, pageSize: 10 } })
        .then((res) => {
          this.relatedProducts = res.model.products.model
        })
    },
    reviewEdit(item) {
        this.newReview.comment = item.comment
        this.newReview.productId = this.product.id

        this.newReview.rate = Number(item.rate)
        this.newReview.reviewId = item.id
        this.btnName = this.$i18n.t('Save')

    },
    submitReview() {

        const review = {
        //  'productId': this.newReview.productId,
          'comment': this.newReview.comment,
          'rate': this.newReview.rate,
        'reviewId': this.newReview.reviewId
        }
        this.$axios
          .$put('products/review', review)
          .then((res) => {
            console.log(res)
            return res
          })
          .then(() => {
            this.$notifier.showMessage({
              content: this.$i18n.t('Submitted Review Successfully'),
            })
            setTimeout(()=>{

              this.edit = false
            }, 500)
              this.getProduct()
          })
          .catch(() => {
            this.$notifier.showMessage({
              content: this.$i18n.t('Something Gone Wrong'),
              color: 'error',
            })
          })
          .finally(() => {
            this.reviewLoading = false
            this.editReview = {
              reviewId: null,
              comment: null,
              rate: null,
              reveiwId: null,
            }
          })

    },
  },
}
</script>
<style lang="scss" scoped>
.product-slider {
  .product-slider-click {
    display: flex;
    justify-content: center;
    ::v-deep .slick-slide {
      width: 80px !important;
      margin-right: 16px;
      border: 1px solid rgb(218, 225, 231);
      border-radius: 5px;
    }
    ::v-deep .slick-current {
      border-radius: 5px;
      border: 1px solid rgb(0, 0, 0);
    }
  }
}
</style>
