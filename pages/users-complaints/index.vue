<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div class="box-wrapper">
          <div
            class="box-overlay"
            :class="{ open: isSidebar }"
            @click="isSidebar = !isSidebar"
          ></div>
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebar />
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
                  <v-icon class="icon mx-2" dark color="blue darken-4">
                    mdi-lightbulb-question-outline
                  </v-icon>

                  <h2 class="mb-0">{{ $t('complaints') }}</h2>
                </div>
                <div >
                  <v-dialog v-model="dialog" max-width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            text
                    color="primary"
                    class="text-capitalize font-weight-bold "
                              v-bind="attrs"
                              v-on="on"
                            >
                              {{ $t('add') }}
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="primary white--text">
                              <span class="text-h5">{{ $t('add') }}</span>
                            </v-card-title>

                            <v-card-text class="mt-2">
                              <v-container>
                                <v-row class="my-3 d-flex justify-space-send">
                                  <v-col
                                    cols="12"
                                    sm="12"
                                    class="d-flex align-end"
                                  >
                                    <v-textarea
                                      v-model="complaintBody"
                                      outlined
                                      name="input-7-43"
                                      :label="$t('theComplaint')"
                                      :value="text"
                                    ></v-textarea>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-4"
                                dark
                                class="my-2 px-3 py-3"
                                @click="add()"
                              >
                                {{ $t('Save') }}
                              </v-btn>

                              <v-btn
                                color="red darken-4"
                                dark
                                class="my-2 mx-2 px-3 py-3"
                                @click="close()"
                              >
                                {{ $t('cancel') }}
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                  </v-dialog>
                </div>
              </div>

              <v-row>
                <v-col cols="12">
                  <v-data-iterator
                    :items="items"
                    :items-per-page.sync="pageSize"
                    :page.sync="pageNumber"
                    hide-default-footer
                  >
                    <template #default="props">
                      <v-row>

                        <v-col
                          v-for="item in props.items"
                          :key="item.name"
                          cols="12"
                        >
                          <v-expansion-panels class="elevation-0">
                            <v-expansion-panel>
                              <v-expansion-panel-header class="my-1 px-3">
                                <template v-slot:actions>
                                  <v-icon
                                    color="error"
                                    @click.stop="removeComplaint(item)"
                                  >
                                    mdi-close-circle-outline
                                  </v-icon>
                                </template>
                                <span>
                                  <v-icon
                                    v-if="item.isRead"
                                    color="blue darken-2"
                                    style="margin: 0px 4px"
                                    >mdi-check-all</v-icon
                                  >
                                  <v-icon
                                    v-if="!item.isRead"
                                    color="gray darken-2"
                                    style="margin: 0px 4px"
                                    >mdi-check-all</v-icon
                                  >
                                  <span
                                    class="text-h6 font-wight-light text--secondary"
                                  >
                                    {{ item.body.slice(0, 20) }}
                                  </span>
                                </span>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content

                                class="my-1 boxSize">
                                  <v-card-text class="mx-2 text-h6 ">
                                  {{ item.body }}
                                </v-card-text>

                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
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
                </v-col>
              </v-row>
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
      dialog: false,
      complaintBody: '',
      pageSize: 20,
      totalCount: 0,
      items: [],
      text: '',
      head: {
        title: 'here',
      },
    }
  },
  head: {
    title: 'Users Complaints',
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
        .$get('complain', { params })
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

    add() {
      this.loading = true
      const formData = new FormData()
      formData.append('Body', this.complaintBody)

      this.$axios
        .$post('complain/users-complain', formData)
        .then((r) => {
          if (r.statusCode == 201 || r.success == true) {
            this.$notifier.showMessage({
              content: this.$i18n.t('sendSuccess'),
              color: 'blue darken-4',
              textColor: 'white',
            })
          }
        })
        .catch((e) => {
          if (e) {
            this.$notifier.showMessage({
              content: this.$i18n.t('sendError'),
              color: 'orange',
              textColor: 'white',
            })
          }
        })
        .finally(() => {
          this.loading = false
          setTimeout(this.close(), 2000)
          this.getData()
        })
    },
    removeComplaint(item) {
      this.loading = true

      this.$axios
        .$delete(`complain/${item.id}`)
        .then((r) => {
          if (r.statusCode == 200 || r.success == true) {
            this.$notifier.showMessage({
              content: this.$i18n.t('deleteSuccuess'),
              color: 'blue darken-4',
              textColor: 'white',
            })
          }
        })
        .catch((e) => {
          if (e) {
            this.$notifier.showMessage({
              content: this.$i18n.t('sendError'),
              color: 'orange',
              textColor: 'white',
            })
          }
        })
        .finally(() => {
          this.loading = false
          this.getData()
        })
    },

    close() {
      this.dialog = false
      this.complaintBody = ''
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
