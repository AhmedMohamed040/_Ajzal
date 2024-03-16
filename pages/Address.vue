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
            <dashbord-sidebar />
          </div>
          <div
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
                    <img src="@/assets/images/icons/pin_filled.svg" alt="" />
                  </v-avatar>
                  <h2 class="mb-0">{{ $t('My Addresses') }}</h2>
                </div>
                <lazy-add-address @success="addToData" />
              </div>

              <v-data-iterator
                :items="items"
                :items-per-page.sync="pageSize"
                :page.sync="pageNumber"
                hide-default-footer
              >
                <template #default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12">
                      <base-card>
                        <div class="pa-4 d-flex align-center flex-wrap">
                          <div class="flex-1 mr-3">
                            <p class="mb-0">
                              {{
                                $i18n.locale == 'ar' ? item.nameAr : item.nameEn
                              }}
                            </p>
                          </div>
                          <div class="flex-1 mr-3">
                            <p class="mb-0">
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
                                item.apartmentNumber == '0'
                                  ? `${$t('Office')} ${item.office}`
                                  : ''
                              }}
                              {{
                                item.floor ? `${$t('Floor')} ${item.floor}` : ''
                              }}
                              {{
                              item.apartmentNumber != '0'
                                  ? `${$t('Apartment Number')} ${
                                      item.apartmentNumber
                                    }`
                                  : ''
                              }}
                              {{
                                item.landmark
                                  ? `${$t('Landmark')} ${item.landmark}`
                                  : ''
                              }}
                            </p>
                          </div>
                          <!-- <div class="flex-1 mr-3">
                            <p class="mb-0">+1927987987498</p>
                          </div> -->

                          <div class="mr-3">
                            <lazy-edit-address
                              :item="item"
                              @success="editAddress"
                            />
                            <v-btn
                              icon
                              color="danger"
                              @click="deleteAddress(item)"
                            >
                              <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </base-card>
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
                          $i18n.locale == 'ar' ? 'right' : 'left'
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
                          $i18n.locale == 'ar' ? 'left' : 'right'
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
      pageSize: 10,
      totalCount: 0,
      items: [],
      editDialog: false,
      instance: {},
    }
  },
  head: {
    title: 'List Address',
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(pageNumber = null) {
      const params = {}
      if (pageNumber) params.pageNumber = pageNumber
      this.$axios.$get('addresses', { params }).then((r) => {
        this.items = r.model
        this.pageNumber = r.currentPage
        if (r.totalPages !== 0) {
          this.totalPages = r.totalPages
        }
      })
    },
    addToData(e) {
      this.items.push(e)
    },
    editAddress(e) {
      this.items = this.items.map((i) => {
        if (e.id === i.id) {
          i = e
        }
        return i
      })
    },
    deleteAddress(address) {
      this.$axios.$delete(`addresses/${address.id}`).then(() => {
        this.items = this.items.filter((i) => i.id !== address.id)
      })
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

<style lang="scss" scoped>
.dashboard-nav-link {
  color: #2b3445 !important;
  text-decoration: none;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-left: 4px solid #fff;
  margin-bottom: 20px;
  svg {
    width: 20px;
  }
  &:hover,
  &.active {
    color: #d23f57 !important;
    border-left: 4px solid #d23f57;
  }
}
</style>
