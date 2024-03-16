<template>
  <div class="px-3 px-md-10 py-8">
    <h3 class="mb-2 text-center">
      {{ $t('Welcome To Ajzal Ecommerce') }}
    </h3>
    <div v-if="!isOtp && !isChangingPass">
      <div v-if="formType == 'email'">
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">
          {{ $t('Write your email to send confirmation code') }}
        </h5>
        <p class="text-14 mb-1">
          {{ $t('Email') }}
        </p>
        <v-text-field
          v-model="newEmail"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('Email')"
          class="mb-4"
          :loading="forgetLoading"
        />
      </div>
      <div v-if="formType == 'phone'">
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">
          {{ $t('Write your phone to send confirmation code') }}
        </h5>
        <p class="text-14 mb-1">
          {{ $t('Phone') }}
        </p>
        <VuePhoneNumberInput
          v-model="newPhone"
          clearable
          no-example
          style="direction: ltr"
          size="md"
          color="#0f3460"
          error-color="#D50000"
          valid-color="#0f3460"
          :loader="forgetLoading"
          :translations="phoneNumberInputTranslations"
          default-country-code="SA"
          @update="validateNumberLogIn($event)"
        />
        <br>
      </div>
      <v-btn
        :loading="forgetLoading"
        block
        color="primary"
        class="text-capitalize font-600"
        @click="forgetPassword"
      >
        {{ $t('Confirm') }}
      </v-btn>
    </div>
    <div v-if="isOtp && !isChangingPass">
      <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">
        {{ $t('Write confirmation code') }}
      </h5>
      <p class="text-14 mb-1">
        {{ $t('Otp') }}
      </p>

      <v-otp-input
        v-model="otp"
        :disabled="otpLoading"
        length="4"
      ></v-otp-input>
      <v-btn
        :loading="forgetLoading"
        block
        color="primary"
        class="text-capitalize font-600"
        @click="verifyOtpSubmit"
      >
        {{ $t('Confirm') }}
      </v-btn>
    </div>
    <div v-if="isChangingPass">
      <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">
        {{ $t('Write your new password') }}
      </h5>
      <p class="text-14 mb-1">
        {{ $t('Password') }}
      </p>
      <v-text-field
        v-model="newPassword"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        counter
        @click:append="show = !show"
      ></v-text-field>
      <v-btn
        :loading="forgetLoading"
        block
        color="primary"
        class="text-capitalize font-600"
        @click="resetPasswordSubmit"
      >
        {{ $t('Confirm') }}
      </v-btn>
    </div>
    <div class="text-14 text-center my-3">
      {{ $t('Remembered your account?') }}
      <a class="text-decoration-underline" @click="$emit('login')">
        {{ $t('Log In') }}
      </a>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { mapActions } from 'vuex'
export default {
  components: { VuePhoneNumberInput },
  props: {
    formType: {
      type: String,
      default: 'email',
    },
    forgetLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newEmail: '',
      newPhone: '',
      newPassword: '',
      newSubmitPhone: '',
      token: '',
      isOtp: false,
      show: false,
      isChangingPass: false,
      otp: '',
      otpLoading: false,
    }
  },
  computed: {
    phoneNumberInputTranslations() {
      return {
        countrySelectorLabel: this.$i18n.t('countryCode'),
        countrySelectorError: this.$i18n.t('chooseACountry'),
        phoneNumberLabel: this.$i18n.t('Phone'),
        example: this.$i18n.t('Example'),
      }
    },
  },
  created() {},
  methods: {
    ...mapActions('reset-password', ['sendOtp', 'verifyOtp', 'resetPassword']),
    async forgetPassword() {
      if (this.formType === 'phone') {
        try {
          console.log(this.newSubmitPhone)
          const res = await this.sendOtp(this.newSubmitPhone)
          console.log(res)
          if (res.statusCode === 201) {
            console.log('Success')
            this.isOtp = true
          }
        } catch (e) {
          return e.response
        }
      }
    },
    async verifyOtpSubmit() {
      this.otpLoading = true
      if (this.isOtp) {
        try {
          const res = await this.verifyOtp({
            phone: this.newSubmitPhone,
            otp: this.otp,
          })
          console.log(res)
          if (res.statusCode === 201) {
            this.token = res.model.token
            this.otpLoading = false
            this.isChangingPass = true
          } else {
            this.otpLoading = false
          }
        } catch (e) {
          this.otpLoading = false
          return e.response
        }
      }
    },
    async resetPasswordSubmit() {
      this.otpLoading = true
      if (this.isOtp) {
        try {
          const res = await this.resetPassword({
            phone: this.newSubmitPhone,
            token: this.token,
            password: this.newPassword,
          })
          if (res.statusCode === 201) {
            this.token = res.model.token
            this.otpLoading = false
            this.isChangingPass = true
            this.$emit('login')
            this.$notifier.showMessage({
              content: this.$i18n.t('passwordHasBeenReset'),
            })
          } else {
            this.otpLoading = false
          }
        } catch (e) {
          this.otpLoading = false
          return e.response
        }
      }
    },
    a2e(s) {
      if (s) return s.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      return ''
    },
    validateNumberLogIn(e) {
    //   this.isPhoneValid = e.isValid
    //   this.disablePhoneButton = this.isPhoneValid
      this.newSubmitPhone = this.a2e(e.countryCallingCode + e.phoneNumber)
      console.log(this.newPhone)
    },
  },
}
</script>

<style></style>
