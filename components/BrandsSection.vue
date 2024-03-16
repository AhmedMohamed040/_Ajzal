<template>
  <v-container>
    <v-row align="center">
      <v-col  md="8" class="text-body-2 text-md-h4 white--text font-weight-bold">
        {{ $t('Brands') }}
      </v-col>
      <v-col  md="4" class="text-end">
        <v-btn text to="#">
          <span class="text-body-2 text-md-h5 white--text font-weight-bold">
            {{ $t('More') }}
          </span>
        </v-btn>
      </v-col>
      <v-col v-if="brandsLoading" xs="12" md="12">
        <v-progress-circular indeterminate size="100" />
      </v-col>
      <v-col v-else xs="12" md="12">
        <v-row>
          <v-col
            v-for="(brand, index) in brands"
            :key="index"
            xs="12" md="3"
            :dir="$i18n.localeProperties.dir"
          >
            <v-card class="text-center" height="150">
              <v-avatar size="150" tile>
                <v-img
                  v-if="brand.imageUrl"
                  :src="brand.imageUrl"
                  contain
                />
                <v-img
                  v-else
                  :src="require('@/assets/ajzal/placeholder_product.svg')"
                  contain
                />
              </v-avatar>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      brands: [],
      brandsLoading: false,
    }
  },
  mounted() {
    this.getFeaturedBrands()
  },
  methods: {
    getFeaturedBrands() {
      this.brandsLoading = true
      this.$axios
        .$get('manufacturers/featured')
        .then((r) => {
          if (r.model.length > 4) {
            this.brands = r.model.slice(0, 3)
          } else {
            this.brands = r.model
          }
        })
        .finally(() => (this.brandsLoading = false))
    },
  },
}
</script>
