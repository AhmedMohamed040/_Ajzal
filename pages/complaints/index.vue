<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div
          :class="{
            'box-content': $i18n.locale == 'en',
            'box-content-rtl': $i18n.locale == 'ar',
          }"
        >
          <div class="box-container">
            <div class="d-flex justify-space-between flex-wrap mb-5">
              <div class="d-flex align-center">
                <v-icon dark color="blue darken-4">
                  mdi-lightbulb-question-outline
                </v-icon>
                <h2 class="mb-0 mx-2">{{ $t('complaints') }}</h2>
              </div>
            </div>
            <v-card class="rounded-lg">
              <v-card-text class="mt-2">
                <v-container>
                  <v-row class="my-3 d-flex justify-space-start">
                    <v-col cols="12" sm="12" md="6" class="d-flex align-start">
                      <v-text-field
                        v-model="userInfo.fullName"
                        :label="$t('Name')"
                        outlined
                        :value="userInfo.fullName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" class="d-flex align-start">
                      <v-text-field
                        v-model="userInfo.phone"
                        :label="$t('Phone')"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="my-3 d-flex justify-space-start">
                    <v-col cols="12" sm="12" md="6" class="d-flex align-start">
                      <v-text-field
                        v-model="userInfo.email"
                        :label="$t('Email')"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" class="d-flex align-end">
                      <v-textarea
                        v-model="userInfo.body"
                        outlined
                        name="input-7-43"
                        :label="$t('theComplaint')"
                        :value="userInfo.body"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>
              <v-card-actions class="">
                <v-btn color="blue darken-4" dark class="ma-5" @click="save()">
                  {{ $t('send') }}
                </v-btn>
              </v-card-actions>
            </v-card>
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

      userInfo: {
        fullName: '',
        email: '',
        phone: '',
        body: '',
      },
    }
  },
  head: {
    title: 'Complaints',
  },
  computed: {},

  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    save() {
      this.loading = true
      const formData = new FormData()
      formData.append('FullName', this.userInfo.fullName)
      formData.append('Email', this.userInfo.email)
      formData.append('Phone', this.userInfo.phone)
      formData.append('Body', this.userInfo.body)

      this.$axios
        .$post('complain', formData)
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
          this.loading = false ;
          setTimeout(this.close(), 2000);
        })
    },
    close() {
      this.dialog = false
      this.userInfo = {
        fullName: '',
        email: '',
        phone: '',
        body: '',
      }
    },
  },
}
</script>
