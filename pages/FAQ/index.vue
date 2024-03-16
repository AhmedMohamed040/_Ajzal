<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">


          <div :class="{
            'box-content': $i18n.locale == 'en',
            'box-content-rtl': $i18n.locale == 'ar',
          }">

            <div class="box-container">
              <div class="d-flex justify-space-between flex-wrap mb-5">
                <div class="d-flex align-center">
                  <img class="icon mx-3 primary--text cyan-text text-darken-4" src="@/assets/images/icons/message-question-outline.svg" alt="" />
                  <h2 class="mb-0">{{ $t('faq') }}</h2>
                </div>
              </div>

              <v-data-iterator :items="items" :items-per-page.sync="pageSize" :page.sync="pageNumber" hide-default-footer>
                <template #default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.name" cols="12">
                        <div>
                        <base-card>
                            <v-expansion-panels class="elevation-0" >
                            <v-expansion-panel>
                              <v-expansion-panel-header class="my-1 px-3 text-subtitle-1 ">

                                <h6 class="text-h6 font-weight-medium">{{ item.title }}
                                </h6>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content class="my-2 text-body-2 boxSize">
                                <v-divider></v-divider>
                                <v-card-text class="mx-2 text-h6 ">
                                  {{ item.answer }}
                                </v-card-text>

                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </base-card>
                        </div>
                      </v-col>
                  </v-row>
                </template>
                <template v-if="items.length > 0" #footer>
                  <v-row class="my-5 me-1" align="center" justify="center">
                    <v-spacer></v-spacer>


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
      pageNumber: 1,
      totalPages: 1,
      pageSize: 20,
      totalCount: 0,
      items: [],

      head: {
        title: 'here'
      }
    }
  },
  head: {
    title: 'FAQ',
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
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
      const params = { pageSize: 20 }
      if (pageNumber) params.pageNumber = pageNumber
      this.$axios
        .$get('question', { params })
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

<style>
.boxSize {
  box-sizing: border-box;
  word-wrap: break-word;
}
</style>
