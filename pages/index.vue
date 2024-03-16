<template>
  <div>
    <!-- top carousel -->
    <VueSlickCarousel
      v-if="carouselTop.length > 0"
      :rtl="$vuetify.rtl"
      class="slick-secondary mb-6"
      :arrows="false"
      :dots="true"
      v-bind="slickSettingsSingleItem"
    >
      <div v-for="item in carouselTop" :key="item.id" class="mb-10 mt-3">
        <v-img class="mx-auto" :src="item.imageUrl" max-height="500px" contain/>
      </div>
    </VueSlickCarousel>

<VueSlickCarousel
      v-else
      :rtl="$vuetify.rtl"
      class="slick-secondary mb-6"
      :arrows="false"
      :dots="true"
      v-bind="slickSettingsSingleItem"


    >
    <div v-for="img in carouselDefault" :key="img.id" class="mb-10 mt-3">
        <v-img class="mx-auto" :src="img.url" max-height="500px" contain/>
      </div>

    </VueSlickCarousel>

    <!-- end top carousel -->
    <!--   <v-row no-gutters justify="center" align-content="center">
          <v-col v-for="(feature, index) in features" :key="index" cols="12" md="3" class="pa-1">
            <v-card class="text-center rounded mx-auto" elevation="4">
              <v-avatar size="80" class="mt-2" tile>
                <v-img :src="feature.image" contain />
              </v-avatar>
              <v-card-text>
                {{ feature.subtitle }}
                <br />
                <span class="text-body-2 text-md-h5 font-weight-bold">
                  {{ feature.title }}
                </span>
              </v-card-text>
            </v-card>
          </v-col>
      </v-row> -->
    <v-row>
      <v-col xs="12" md="12">
        <img width="100%" src="@/assets/ajzal/banner_2.png" />
      </v-col>
    </v-row>
    <v-row no-gutters align="center" justify="center">
      <v-col
        v-for="(carouselView, index) in carouselViews"
        :key="index"
        :class="[carouselView.backgroundColor]"
        xs="12"
        md="12"
      >
        <v-container>
          <v-row align="center">
            <v-col
              xs="12" md="10"
              class="text-body-2 text-md-h4 font-weight-bold"
              :class="[carouselView.textColor + '--text']"
            >
              {{ carouselView.name }}
            </v-col>
            <v-col xs="12" md="2" class="text-end">
              <v-btn
                text
                :color="carouselView.moreTextColor"
                nuxt
                :to="carouselView.moreLink"
              >
                <span class="text-body-2 text-md-h5 font-weight-bold">
                  {{ carouselView.moreText }}
                </span>
              </v-btn>
            </v-col>
            <v-col xs="12" md="12">
              <VueSlickCarousel
                v-if="topProducts.length > 0"
                :rtl="$vuetify.rtl"
                class="slick-secondary slick-button-hover"
                v-bind="slickCarouselSettings"
              >
                <v-col
                  v-for="item in topProducts"
                  :key="item.id"
                  xs="12" md="12"
                  :dir="$i18n.localeProperties.dir"
                >
                  <lazy-card-cart :product="item" />
                </v-col>

                <template #prevArrow>
                  <v-btn class="slick-arrow" fab dark small color="primary">
                    <v-icon dark> mdi-arrow-left </v-icon>
                  </v-btn>
                </template>
                <template #nextArrow>
                  <v-btn class="slick-arrow" fab dark small color="primary">
                    <v-icon dark> mdi-arrow-right </v-icon>
                  </v-btn>
                </template>
              </VueSlickCarousel>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
     <!--    <v-col cols="12" class="primary">
          <brands-section />
        </v-col>
      <v-col cols="12">
        <articles-section />
      </v-col>
      <v-col xs="12" md="12" class="accent">
        <our-projects-section />
      </v-col>
      <v-col xs="12" md="12">
        <app-section />
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      isSidebar: false,
      slickSettingsSingleItem: {
        infinite: true,
        arrows: true,
        autoplay: true,

        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-youtube',
        'mdi-google',
        'mdi-instagram',
      ],
      slickCarouselSettings: {
        arrows: true,
        infinite: true,
        autoplay: true,

        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1904,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 2,
              infinite: true,
            },
          },
          {
            breakpoint: 1263,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
            },
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      features: [
        {
          image: require('@/assets/ajzal/design.svg'),
          title: this.$i18n.t('Free'),
          subtitle: this.$i18n.t('Installation'),
        },
        {
          image: require('@/assets/ajzal/delivery-van.svg'),
          title: this.$i18n.t('Free'),
          subtitle: this.$i18n.t('Design'),
        },
        {
          image: require('@/assets/ajzal/brand-positioning.svg'),
          title: this.$i18n.t('Variant'),
          subtitle: this.$i18n.t('Browse Our Brand'),
        },
      ],
      carouselViews: [
        {
          name: this.$i18n.t('Best Selling Items'),
          placeholder: require('@/assets/ajzal/placeholder_product.svg'),
          backgroundColor: '',
          textColor: 'black',
          moreText: this.$i18n.t('More'),
          moreTextColor: 'primary',
          moreLink: this.localePath({ name: 'products' }),
          items: [],
        },
        {
          name: this.$i18n.t('Ceramic and porcelain'),
          placeholder: require('@/assets/ajzal/placeholder_product.svg'),
          backgroundColor: '',
          textColor: 'black',
          moreText: this.$i18n.t('More'),
          moreTextColor: 'primary',
          moreLink: this.localePath({ name: 'products' }),
          items: [],
        },
        {
          name: this.$i18n.t('Sanitary ware'),
          placeholder: require('@/assets/ajzal/placeholder_product.svg'),
          backgroundColor: '',
          textColor: 'black',
          moreText: this.$i18n.t('More'),
          moreTextColor: 'primary',
          moreLink: this.localePath({ name: 'products' }),
          items: [],
        },
      ],
      featuredCategories: [],
      carouselTop: [],
      carouselDefault: [
        {
          id: 1,
          url: require('@/assets/ajzal/banner.png')
        }
      ],
      carouselBot: [],
    }
  },
  head: {
    title: 'Home',
  },
  computed: {
    categoriesNav() {
      return this.$store.state.categories
    },
    topProducts() {
      const data = this.getProducts
      if (data) {
        return data.model
        // return data data.model : [];
      } else {
        return []
      }
    },
    ...mapGetters(['getProducts']),
  },
  mounted() {
    this.$store.dispatch('getCategories')
    this.getFeaturedCategories()
    this.getCarousels()
    this.$store.dispatch('getProducts')
  },
  created() {
    if (process.browser) {
      // window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getFeaturedCategories() {
      this.$axios
        .$get('categories/featured-categories')
        .then((r) => (this.featuredCategories = r.model))
    },

    getCarousels() {
      this.$axios.$get('carousels/TopCarousel/').then((r) => {
        this.carouselTop = r.model.images
      })
      this.$axios.$get('carousels/BotCarousel/').then((r) => {
        this.carouselBot = r.model.images
      })
    },
    ...mapActions(['getCategories']),
    // handleScroll(event) {
    //   const scrolled = window.scrollY
    //   const Sidebar = document.querySelector('.home-two-sidebar')
    //   if (scrolled > 68) {
    //     Sidebar.classList.add('scroll-home-two')
    //   } else {
    //     Sidebar.classList.remove('scroll-home-two')
    //   }
    // },
  },
}
</script>

<style lang="scss" scoped>
.quote-open {
  margin-top: -39px;
}
.quote-open-bottom {
  margin-top: 65px;
}
a.footer-link-hover {
  color: #bdbdbd !important;
  &:hover {
    color: #fff !important;
  }
}

.box-sidebar {
  &.home-two-sidebar {
    position: absolute;
    padding-top: 20px;
    overflow-y: scroll;
    height: 100vh;
    scrollbar-width: thin;
    @media (max-width: 959px) {
      position: fixed;
      top: 0;
    }
    &.scroll-home-two {
      position: fixed;
      height: 87vh;
      top: 80px;
      @media (max-width: 959px) {
        position: fixed;
        height: 100vh;
        top: 0px;
      }
    }
  }
}

.home-two-color {
  color: rgb(75, 86, 107);
}
.home-two-sidebar-link {
  color: rgb(75, 86, 107);
  &:hover {
    color: #d23f57;
  }
}
</style>
