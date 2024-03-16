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
            <DashboardSidebar />
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
                    <img src="@/assets/images/icons/user_filled.svg" alt="" />
                  </v-avatar>
                  <h2 class="mb-0">{{ $t('My Profile') }}</h2>
                </div>
                <!-- <ProfileEdit /> -->
              </div>
              <v-row v-if="profileData">
                <v-col cols="12" md="12" lg="4">
                  <base-card>
                    <div class="pa-5">
                      <div
                        class="d-flex justify-space-between align-center flex-wrap"
                      >
                        <div class="d-flex align-center">
                          <v-avatar size="64" class="me-4">
                            <img
                              v-if="profileData.imageUrl"
                              :src="profileData.imageUrl"
                              alt=""
                            />
                            <img
                              v-else
                              :src="require('@/assets/images/faces/avatar.png')"
                              alt=""
                            />
                          </v-avatar>
                          <div>
                            <h4 v-if="profileData" class="font-600">
                              {{ profileData.name }}
                            </h4>
                            <p class="mb-0 grey--text text--darken-1">
                              {{ $t('Balance') }}:
                              <span
                                v-if="Math.sign(profileData.balance) == -1"
                                class="m-0 red--text"
                              >
                                {{ Math.abs(profileData.balance).toFixed(2) }}
                                {{ $t('SAR') }}
                              </span>
                              <span
                                v-if="Math.sign(profileData.balance) == 1"
                                class="m-0 success--text text--darken-2"
                              >
                                {{ Math.abs(profileData.balance).toFixed(2) }}
                                {{ $t('SAR') }}
                              </span>
                              <span
                                v-if="Math.sign(profileData.balance) == 0"
                                class="m-0 deep-orange--text text--darken-4"
                              >
                                {{ Math.abs(profileData.balance).toFixed(2) }}
                                {{ $t('SAR') }}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p
                          v-if="profileData.merchantDetail"
                          class="mt-4 grey--text text--darken-1"
                        >
                          {{ profileData.merchantDetail.companyName }}
                          <br />
                          <span v-if="profileData.merchantDetail.priceCategory">
                            <span>{{
                              profileData.merchantDetail.priceCategory.name
                            }}</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card
                    class="h-100 pa-4 d-flex flex-column text-center align-center justify-center"
                  >
                    <h3 class="font-600 primary--text mb-0">
                      {{ profileData.orderCount }}
                    </h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      {{ $t('All') + ' ' + $t('Orders') }}
                    </p>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card
                    class="h-100 pa-4 d-flex flex-column text-center align-center justify-center"
                  >
                    <h3 class="font-600 primary--text mb-0">
                      {{ profileData.awaitingPaymentCount }}
                    </h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      {{ $t('Awaiting Payments') }}
                    </p>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card
                    class="h-100 pa-4 d-flex flex-column text-center align-center justify-center"
                  >
                    <h3 class="font-600 primary--text mb-0">
                      {{ profileData.awaitingShipmentCount }}
                    </h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      {{ $t('Awaiting Shipment') }}
                    </p>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card
                    class="h-100 pa-4 d-flex flex-column text-center align-center justify-center"
                  >
                    <h3 class="font-600 primary--text mb-0">
                      {{ profileData.awaitingDeliveryCount }}
                    </h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      {{ $t('Awaiting Delivery') }}
                    </p>
                  </base-card>
                </v-col>

                <v-col cols="12">
                  <base-card>
                    <div
                      class="pa-4 d-flex justify-space-between flex-wrap flex-column flex-sm-row"
                    >
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          {{ $t('Name') }}
                        </p>
                        <span>{{ profileData.name }}</span>
                      </div>
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          {{ $t('Email') }}
                        </p>
                        <div>
                          <span>{{ profileData.email }}</span>
                          <span>
                            <v-dialog v-model="editDialog" max-width="500">
                              <template #activator="{ on, attrs }">
                                <v-btn


                                  icon
                                  color="primary"
                                  class="text-capitalize font-weight-bold"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon
                                    class="icon mx-2"
                                    dark

                                    color="blue darken-4"
                                  >
                                    mdi-pencil
                                  </v-icon>
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title class="primary white--text">
                                  <span class="text-h5">{{
                                    $t('editEmail')
                                  }}</span>
                                </v-card-title>

                                <v-card-text class="mt-2">
                                  <v-container>
                                    <v-form ref="editForm1" v-model="isValid1">
                                      <v-row
                                        class="my-3 d-flex justify-space-send"
                                      >
                                        <v-col
                                          cols="12"
                                          sm="12"
                                          class="d-flex align-end"
                                        >
                                          <v-text-field
                                            v-model="email.Email"
                                            outlined
                                            :label="$t('Email')"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="12"
                                          class="d-flex align-end"
                                        >
                                          <v-text-field
                                            v-model="email.newEmail"
                                            outlined
                                            :label="$t('verifyEmail')"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="12"
                                          class="d-flex align-end"
                                        >
                                          <v-text-field
                                            v-model="email.otp"
                                            outlined
                                            :rules="[rules.required]"
                                            :label="$t('Otp')"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-form>
                                    <div class="mb-1 d-flex justify-center">
                                      <p
                                        v-if="
                                          error1 == false && finish1 === true
                                        "
                                        class="text-subtitle-1 mb-1 green--text"
                                      >
                                        {{ successText1 }}
                                      </p>
                                      <p
                                        v-if="
                                          finish1 == false && error1 === true
                                        "
                                        class="text-subtitle-1 mb-1 red--text"
                                      >
                                        {{ errorEmail }}
                                        <br />
                                        {{ errorEmail2 }}
                                      </p>
                                    </div>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-4"
                                    dark
                                    :disabled="!isValid1"
                                    @click="changeEmail()"
                                    class="my-2 px-3 py-3"
                                  >
                                    {{ $t('Edit') }}
                                  </v-btn>

                                  <v-btn
                                    color="red darken-4"
                                    dark
                                    class="my-2 mx-2 px-3 py-3"
                                    @click="editDialog = false"
                                  >
                                    {{ $t('cancel') }}
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </span>
                        </div>
                      </div>
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          {{ $t('Phone') }}
                        </p>
                        <div>
                          <span>{{ profileData.phone }}</span>
                          <span>
                            <v-dialog v-model="editDialog2" max-width="500">
                              <template #activator="{ on, attrs }">
                                <v-btn
                                icon
                                  color="primary"
                                  class="text-capitalize font-weight-bold"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon
                                    class="icon mx-2"
                                    dark
                                    color="blue darken-4"
                                  >
                                    mdi-pencil
                                  </v-icon>
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title class="primary white--text">
                                  <span class="text-h5">{{
                                    $t('editPhone')
                                  }}</span>
                                </v-card-title>

                                <v-card-text class="mt-2">
                                  <v-container>
                                    <v-form ref="editForm2" v-model="isValid2">
                                      <v-row
                                        class="my-3 d-flex justify-space-send"
                                      >
                                        <v-col
                                          cols="12"
                                          sm="12"
                                          class="d-flex align-end"
                                        >
                                          <v-text-field
                                            v-model="phone.Phone"
                                            outlined
                                            type="number"
                                            :label="$t('Phone')"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="12"
                                          class="d-flex align-end"
                                        >
                                          <v-text-field
                                            v-model="phone.newPhone"
                                            outlined
                                            type="number"
                                            :label="$t('verifyPhone')"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="12"
                                          class="d-flex align-end"
                                        >
                                          <v-text-field
                                            v-model="phone.otp"
                                            outlined
                                            :rules="[rules.required]"
                                            :label="$t('Otp')"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-form>
                                    <div class="mb-1 d-flex justify-center">
                                      <p
                                        v-if="
                                          error2 == false && finish2 === true
                                        "
                                        class="text-subtitle-1 mb-1 green--text"
                                      >
                                        {{ successText2 }}
                                      </p>
                                      <p
                                        v-if="
                                          finish2 == false && error2 === true
                                        "
                                        class="text-subtitle-1 mb-1 red--text"
                                      >
                                        {{ errorPhone }}
                                        <br />
                                        {{ errorPhone2 }}
                                      </p>
                                    </div>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-4"
                                    dark
                                    :disabled="!isValid2"
                                    type="submit"
                                    @click="changePhone()"
                                    class="my-2 px-3 py-3"
                                  >
                                    {{ $t('Edit') }}
                                  </v-btn>

                                  <v-btn
                                    color="red darken-4"
                                    dark
                                    class="my-2 mx-2 px-3 py-3"
                                    @click="editDialog2 = false"
                                  >
                                    {{ $t('cancel') }}
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </span>
                        </div>
                      </div>
                      <!--    <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          {{ $t('Birth Date') }}
                        </p>
                        <span>{{ profileData.birthDay }}</span>
                      </div> -->
                    </div>
                  </base-card>
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
import { async } from 'vue-phone-number-input/dist/vue-phone-number-input.common'
export default {
  name: 'Profile',
  data() {
    return {
      isSidebar: false,
      profileData: null,
      isValid1: false,
      isValid2: false,
      successText1: '',
      successText2: '',
      errorPhone: '',
      errorPhone2: '',
      errorEmail2: '',
      error1: false,
      error2: false,
      finish1: false,
      finish2: false,
      errorEmail: '',
      email: {
        Email: '',
        otp: '',
        newEmail: '',
      },
      phone: {
        Phone: '',
        otp: '',
        newPhone: '',
      },
      rules: {
        required: (value) => !!value || this.$t('required'),
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('Invalid')
        },
      },
      editDialog: false,
      editDialog2: false,
    }
  },
  head: {
    title: 'View Profile',
  },
  computed: {},
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$axios.$get('auth/shared/me').then((res) => {
        this.profileData = res.model
      })
    },
    verifyEmail() {
      const data = new FormData()
      data.append('Email', this.email.newEmail)
      data.append('OTP', this.email.otp)

      this.$axios
        .$post('auth/pe/verify-email', data)
        .then((res) => {
          console.log(res)
          if (res.success) {
            this.error1 = false
            this.finish1 = true
            this.successText1 = this.$i18n.t('editSuccuess')
          } else this.successText1 = ''
          return res
        })
        .catch((err) => {
          console.error(err)
          if (err.name == 'AxiosError' || err) {
            this.error1 = true
            this.finish1 = false
            this.errorEmail2 = err.response.data.message
            //    this.errorEmail = this.$i18n.t('Something Gone Wrong')
          } else this.errorEmail2 = ''
        })


    },
    verifyPhone() {
      const data = new FormData()
      data.append('Phone', this.phone.newPhone)
      data.append('OTP', this.phone.otp)
      this.$axios
        .$post('auth/pe/verify-phone', data)
        .then((res) => {
          if (res.success) {
            this.error2 = false
            this.finish2 = true
            this.successText2 = this.$i18n.t('editSuccuess')
          } else this.successText2 = ''
          return res
        })
        .catch((err) => {
          console.error(err)
          if (err.name == 'AxiosError' || err) {
            this.error2 = true
            this.finish2 = false
            this.errorPhone2 = err.response.data.message
            //    this.errorEmail = this.$i18n.t('Something Gone Wrong')
          } else this.errorPhone2 = ''
        })
    },
    changeEmail() {
      const data = new FormData()
      data.append('Email', this.email.Email)
      this.$axios
        .$post('auth/pe/update-email', data)
        .then((res) => {
          return res
        })
        .catch((err) => {
          console.error(err)
          if (err.name == 'AxiosError' || err) {
            this.error1 = true
            this.finish1 = false
            this.errorEmail = err.response.data.message
            //    this.errorEmail = this.$i18n.t('Something Gone Wrong')
          } else this.errorEmail = ''
        })
        .finally( () => {
          this.verifyEmail()
          this.getProfile()


          //this.close()
        })


        setTimeout(() => {
          this.close()
        }, 4000)
    },
    changePhone() {
      const data = new FormData()
      data.append('Phone', this.phone.Phone)
      this.$axios
        .$post('auth/pe/update-phone', data)
        .then((res) => {
          return res
        })
        .catch((error) => {
          console.log(error)
          if (
            error.name == 'AxiosError' ||
            error ||
            error.response.status === 400
          ) {
            this.error2 = true
            this.finish2 = false
            this.errorPhone = error.response.data.message
          } else this.errorPhone = ''
        })
        .finally( () => {
          this.verifyPhone()
          this.getProfile()

          //  this.close()
        })

        setTimeout(() => {
          this.close()
        }, 4000)
    },
    close() {
      this.errorEmail = ''
      this.error1 = false
      this.finish1 = false
      this.finish2 = false
      this.error2 = false
      this.errorPhone = ''
      this.editDialog = false
      this.editDialog2 = false
      this.email.otp = ''
      this.email.Email = ''
      this.successText1 = ''
      this.successText2 = ''
      this.phone.Phone = ''
      this.email.newEmail = ''
      this.errorPhone2 = ''
      this.errorEmail2 = ''
      this.phone.otp = ''
      this.phone.newPhone = ''
    },
  },
}
</script>
