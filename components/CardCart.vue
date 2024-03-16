<template>
  <!-- card-hover-shadow  -->
  <base-card
    class="card-hover text-center"
    :class="cardHoverShadow ? 'card-hover-shadow' : ''"
  >
    <v-chip
      v-if="product.discount"
      class="ma-2 p-absolute"
      color="primary"
      small
    >
      {{ product.discount }}% {{ $t('Off') }}
    </v-chip>
    <div class="card-hover-icon">
      <div
        class="d-flex flex-column p-absolute right-0 z-1 mr-2 mt-1 card-hover-icon"
      >
        <!-- dialog -- modal  -->
        <v-dialog v-model="dialog" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn icon color="secondary" v-bind="attrs" v-on="on">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
          <base-card>
            <v-card-title>
              <v-btn
                class="mt-4"
                absolute
                right
                icon
                color="secondary"
                text
                style="z-index:1000"
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-avatar size="250" tile>
                    <v-img
                      v-if="product.imageUrl"
                      height="250"
                      :src="imageSrc"
                      @error="handleImageError"
                    />
                    <v-img v-else contain :src="imagesUrl + '/uploads/ajzal-uploaded-images/default.jpg'" />
                    </v-avatar>

                </v-col>
                <v-col cols="12" md="6">
                  <h1 class="mt-4 mb-4 leading-tight">{{ product.name }}</h1>
                  <h5 class="grey--text text--darken-5 mb-3">
                    {{ $t('Brand') }}:
                    <span
                      class="grey--text text--darken-1 font-weight-medium ml-2"
                    >
                      {{
                        product.manuFacturer ? product.manuFacturer.name : null
                      }}
                    </span>
                  </h5>
                  <div class="d-flex mb-3">
                    <h5 class="grey--text text--darken-5 mr-2">
                      {{ $t('Rating') }}:
                    </h5>
                    <div class="d-flex mb-1">
                      <v-rating
                        :value="product.rating"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="16"
                      />
                      <div
                        class="grey--text text--darken-1 font-weight-bold ml-1"
                      >
                        ({{ product.rating }})
                      </div>
                    </div>
                  </div>
                  <h2 class="font-weight-bold primary--text mb-2">
                    {{ product.salePrice.toFixed(2) }} {{ $t('SAR') }}
                  </h2>
                  <h5
                    v-if="product.quantity > 0"
                    class="font-weight-light mb-3 success--text"
                  >
                    {{ $t('Stock Available') }}
                  </h5>
                  <h5 v-else class="font-weight-light mb-3 error--text">
                    {{ $t('Out Of Stock') }}
                  </h5>
                  <h5 class="grey--text text--darken-5 mb-3">
                    {{ $t('Sold By') }}:
                    <span
                      class="grey--text text--darken-1 font-weight-medium ml-2"
                    >
                      {{
                        product.manuFacturer ? product.manuFacturer.name : null
                      }}
                    </span>
                  </h5>
                </v-col>
              </v-row>
            </v-card-text>
          </base-card>
        </v-dialog>
        <!-- end dialog end modal  -->
        <v-btn icon @click="favorite">
          <v-img height="20px" :src="require('@/assets/ajzal/fav'+ (product.isFavorite ? '_on' : '') +'.svg')" contain />
        </v-btn>
      </div>
    </div>
    <nuxt-link
      class="mx-2"
      :to="localePath({ name: 'products-id', params: { id: product.id } })"
    >
      <v-img v-if="product.imageUrl" contain :src="imageSrc" @error="handleImageError" />
      <v-img v-else contain :src="imagesUrl + '/uploads/ajzal-uploaded-images/default.jpg'" />
    </nuxt-link>
    <v-card-text class="d-flex justify-content-between align-end">
      <div class="flex-grow-1 my-3">
        <router-link
          :to="localePath({ name: 'products-id', params: { id: product.id } })"
          class="text-decoration-none mb-0 grey--text text--darken-4"
        >
          <h6 class="text-start" style="overflow: hidden; height: 40px">
            {{ product.name }}
          </h6>
        </router-link>
        <div class="d-flex mb-1">
          <v-rating
            :value="product.averageRate"
            color="amber"
            background-color="amber"
            dense
            half-increments
            readonly
            size="14"
          />
          <div class="grey--text ml-1">
            {{ product.averageRate  }}
          </div>
        </div>
        <div class="d-flex">
          <h6 class="primary--text mr-2 mb-0">{{ product.salePrice }} {{ $t("SAR") }}</h6>
          <h6
            v-if="product.discount"
            class="gray--text lighten-4 text-decoration-line-through mb-0"
          >
            ${{ (product.salePrice * product.discount + 100) / 100 }}
          </h6>
        </div>
      </div>
      <div class="d-flex flex-column">
        <v-btn
          v-if="cartItem"
          :class="cartItem.quantity <= 0 ? 'd-none' : 'd-block'"
          class="rounded"
          outlined
          fab
          x-small
          tile
          color="primary"
          @click="removeFromCart"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <div
          v-if="cartItem"
          :class="cartItem.quantity <= 0 ? 'd-none' : 'd-block'"
          class="text-center font-weight-bold"
        >
          {{ cartItem.quantity }}
        </div>
        <v-btn
          v-show="product.quantity > 0"
          class="rounded"
          outlined
          fab
          x-small
          tile
          color="primary"
          @click="addToCart"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </base-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    cardHoverShadow: {
      type: Boolean,
      default: false,
    },
    product: { type: Object, default: () => {} },
  },
  data() {
    return {
      imagesUrl: 'https://api.ajzal.sa/',
      imageSrc: this.imagesUrl+ 'uploads/ajzal-uploaded-images/default.jpg',
      dialog: false,
      favoriteSubmitting: false,
      isFavorite: false
    };
  },
  computed: {
    ...mapGetters({ carts: "getCartProducts" }),
    cartItem() {
      return this.carts.find((p) => p.product.id === this.product.id);
    },
  },
  mounted(){
    this.imageSrc = this.product.imageUrl;
    this.isFavorite = this.product.isFavorite
  },
  methods: {
    addToCart() {
      console.log(this.cartItem)
      if(this.cartItem)
      if (this.cartItem.quantity >= this.product.quantity) {
        this.$notifier.showMessage({
                  content: this.$i18n.t('QuantitNotAvailable'),
                  color: 'error',
                })
        return
      }
      this.$store.dispatch("addCart", { product: this.product });
      this.$emit("cartAdd");
    },
    removeFromCart() {
      this.$store.dispatch("decreaseCart", { product: this.product });
      this.$emit("cartRemove");
    },
    async favorite() {
      this.favoriteSubmitting = true
      await this.$store.dispatch("setFavorite", {prodId: this.product.id});
      this.favoriteSubmitting = false
      this.isFavorite = !this.isFavorite
    },
    handleImageError() {
      console.log('errors')
      this.imageSrc = this.imagesUrl + '/uploads/ajzal-uploaded-images/default.jpg'
    },
  },
};
</script>
<style lang="scss" scoped>
.br-t-8 {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
.card-hover {
  &:hover {
    .card-hover-icon {
      display: block;
    }
  }
  .card-hover-icon {
    display: none;
  }
}
</style>
