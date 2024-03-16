<template>
  <v-dialog :value="loginDialog" width="500" @input="setDialog($event)">
    <template #activator="{ on, attrs }">
      <v-btn
        text
        class="font-weight-bold"
        v-bind="attrs"
        v-on="on"
      >
        <span class="mx-1 text-caption text-md-h6 font-weight-bold hidden-sm-and-down grey--text text--darken-3">{{ $t('Sign in') }}</span>
        <img src="@/assets/ajzal/user.svg">
      </v-btn>
    </template>
    <base-card v-if="formState === 'sign in'">
      <div class="px-3 px-md-10 py-8">
        <h3 class="mb-2 text-center">
          {{ $t("Welcome To ajzal Ecommerce") }}
        </h3>
        <h5  v-if="formRecord.type === 'User'" class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">
          {{ $t('Log in with Phone & Password') }}
        </h5>
        <h5 v-if="formRecord.type === 'Merchant'" class="font-600 lime--text text--darken-4 text-sm mb-9 text-center" >
          {{ $t('Enter crediantals of your company account') }}
        </h5>
        
        <p  v-if="formRecord.type === 'User'" class="text-14 mb-1">{{ $t('Phone') }}</p>
        <p  v-if="formRecord.type === 'Merchant'" class="lime--text text--darken-4 text-14 mb-1" >{{ $t('Company Phone') }}</p>
        <VuePhoneNumberInput
          v-model="LoginPhone"
          clearable
          no-example
          style="direction: ltr"
          size="md"
          color="#0f3460"
          error-color="#D50000"
          valid-color="#0f3460"
          :error="!!errors.Phone"
          :loader="loginLoading"
          :translations="phoneNumberInputTranslations"
          default-country-code="SA"
          @update="validateNumberLogIn($event)"
        />
        <ul v-if="errors.Phone" class="error--text" style="direction: ltr">
          <li v-for="e in errors.Phone" :key="e">
            {{ e }}
          </li>
        </ul>
        <p class="text-14 mb-1">{{ $t('Password') }}</p>
        <v-text-field
          v-model="formRecord.password"
          outlined
          dense
          :type="inputType"
          hide-details="auto"
          :append-icon="showPassIcon"
          @click:append="showPassword"
          :error-messages="errors.password"
          :placeholder="$t('Password')"
          :loading="loginLoading"
          class="mb-4"
        />
        <v-btn
          block
          color="primary"
          :loading="loginLoading"
          class="text-capitalize font-600"
          @click="login"
        >
          {{ $t('Login') }}
        </v-btn>
        <!-- <v-col cols="10" lg="8" class="mx-auto">
          <div class="d-flex align-center my-1">
            <v-divider />
            <span class="mx-4">{{ $t('Or') }}</span>
            <v-divider />
          </div>
        </v-col> -->
        <div class="text-14 text-center my-3">
          {{ $t("Don't have account?") }}
          <a class="" @click="formState = 'sign up'; restShowPassword()">
            {{ $t('Sign Up') }}
          </a>
        </div>
        <div class="text-14 text-center my-3">
          <a
            v-if="formRecord.type === 'User'"
            @click="formRecord.type = 'Merchant'"
          >
            {{ $t('Are you a Merchant Log in here') }} 
          </a>
          <a
            v-if="formRecord.type === 'Merchant'"
            class="lime--text text--darken-4"  
            @click="formRecord.type = 'User'"
          >
            {{ $t('Log in as') }} {{ $t('User') }}
          </a>
        </div>
        <!-- <v-btn block dark color="indigo" class="text-capitalize font-600 mb-4">
          <v-icon left class="me-3">mdi-facebook</v-icon>
          {{ $t('Continue with facebook') }}
        </v-btn>
        <v-btn
          block
          dark
          color="blue darken-2"
          class="text-capitalize font-600 mb-4"
        >
          <v-icon left class="me-3">mdi-google</v-icon>
          {{ $t('Continue with Google') }}
        </v-btn> -->
        
        <div class="text-14 text-center my-3">
          <a class="" @click="formState = 'sign up';formRecord.type = 'Merchant'; restShowPassword()">
            {{ $t('Join us as a Merchant') }}
          </a>
        </div>
      </div>
      <div class="py-4 grey lighten-2">
        <div class="text-center">
          <span class="grey--text text--darken-1">
            {{ $t('Forgot Your Password') }}
            <a
              class=""
              @click="formState = 'forget password'; restShowPassword()"
            >
              {{ $t('Reset It') }}
            </a>
          </span>
        </div>
      </div>
    </base-card>

    <base-card v-if="formState === 'sign up'">
      <div class="px-3 px-md-10 py-8">
        <h3 class="mb-2 text-center">
          {{ $t('Welcome To Ajzal Ecommerce') }}
        </h3>
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">
          {{ $t('Sign up New Account') }}
        </h5>
        <div class="text-14 text-center my-3">
          {{ $t('sign up as') }}
          <a
            v-if="formRecord.type === 'User'"
            class=""
            @click="formRecord.type = 'Merchant'"
          >
            {{ $t('Merchant') }}
          </a>
          <a
            v-if="formRecord.type === 'Merchant'"
            class=""
            @click="
              formRecord.type = 'User'
              more()
            "
          >
            {{ $t('User') }}
          </a>
        </div>
        <!-- <ul v-if="Object.keys(errors).length > 0" class="error--text text--darken-2">
            <li v-for="(error, index) in Object.keys(errors)" :key="index">
              {{ error }}
              <ul v-if="errors[error].length > 0" class="error--text">
                <li v-for="(spcErr, i) in errors[error]" :key="i">
                  {{ spcErr }}
                </li>
              </ul>
            </li>
          </ul> -->
        <p class="text-14 mb-1">
          {{ $t('Name') }}
        </p>
        <v-text-field
          v-model="signRecord.name"
          :error-messages="errors.Name"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('Name')"
          class="mb-4"
        />

        <p class="text-14 mb-1">
          {{ $t('Phone') }}
        </p>

        <VuePhoneNumberInput
          v-model="SignPhone"
          clearable
          no-example
          style="direction: ltr"
          size="md"
          color="#0f3460"
          :error="!!errors.Phone"
          error-color="#D50000"
          valid-color="#0f3460"
          :translations="phoneNumberInputTranslations"
          default-country-code="SA"
          @update="validateNumberSignUp($event)"
        />
        <ul v-if="errors.Phone" class="error--text" style="direction: ltr">
          <li v-for="e in errors.Phone" :key="e">
            {{ e }}
          </li>
        </ul>
        <p v-if="formRecord.type === 'User'" class="text-14 mb-1">
          {{ $t('Password') }}
        </p>
        <v-text-field
          v-if="formRecord.type === 'User'"
          v-model="signRecord.password"
          :error-messages="errors.Password"
          :loading="signupLoading"
          outlined
          dense
          :append-icon="showPassIcon"
          @click:append="showPassword"
          :type="inputType"
          hide-details="auto"
          :placeholder="$t('Password')"
          class="mb-4"
          @change="log"
        />
        <p class="text-14 mb-1">
          {{ $t('Email') }}
        </p>
        <v-text-field
          v-model="signRecord.email"
          :error-messages="errors.Email"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          placeholder="example@mail.com"
          class="mb-4"
        />
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('CompanyName') }}
        </p>
        <v-text-field
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.CompanyName"
          :error-messages="errors.CompanyName"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('CompanyName')"
          class="mb-4"
        />
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('Address') }}
        </p>
        <v-text-field
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.Address"
          :error-messages="errors.Address"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('Address')"
          class="mb-4"
        />
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('Activity') }}
        </p>
        <v-text-field
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.Activity"
          :error-messages="errors.Activity"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('Activity')"
          class="mb-4"
        />
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('RequestType') }}
        </p>
        <v-autocomplete
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.RequestType"
          clearable
          :label="$t('RequestType')"
          :items="
            getRequestType.map(({ name, id }) => ({
              text: name,
              value: id,
            }))
          "
          :error-messages="errors.RequestType"
          :loading="signupLoading"
          outlined
          dense
          style="margin: 18px 0 0 0"
          class="mb-4"
          hide-details="auto"
        ></v-autocomplete>

        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('Country') }}
        </p>
        <v-autocomplete
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.Country"
          clearable
          :label="$t('Country')"
          :items="
            getCountries.map(({ name, id }) => ({
              text: name,
              value: id,
            }))
          "
          :error-messages="errors.Country"
          :loading="signupLoading"
          outlined
          dense
          style="margin: 18px 0 0 0"
          class="mb-4"
          hide-details="auto"
          @change="fetchRegion(signRecord)"
        ></v-autocomplete>

        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('Region') }}
        </p>
        <v-autocomplete
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.Region"
          clearable
          :disabled="signRecord.Country == null ? true : false"
          :label="$t('Region')"
          :items="
            getRegion.map(({ name, id }) => ({
              text: name,
              value: id,
            }))
          "
          :error-messages="errors.Region"
          :loading="signupLoading"
          outlined
          dense
          style="margin: 18px 0 0 0"
          class="mb-4"
          hide-details="auto"
          @change="fetchCities(signRecord)"
        ></v-autocomplete>

        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('City') }}
        </p>
        <v-autocomplete
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.City"
          :disabled="signRecord.Region == null ? true : false"
          clearable
          :label="$t('City')"
          :items="
            getCities.map(({ name, id }) => ({
              text: name,
              value: id,
            }))
          "
          :error-messages="errors.City"
          :loading="signupLoading"
          outlined
          dense
          style="margin: 18px 0 0 0"
          class="mb-4"
          hide-details="auto"
        ></v-autocomplete>

        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('TaxNumber') }}
        </p>
        <v-text-field
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.TaxNumber"
          :error-messages="errors.TaxNumber"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('TaxNumber')"
          class="mb-4"
        />
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('CommercialRegisterNumber') }}
        </p>
        <v-text-field
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.CommercialRegisterNumber"
          :error-messages="errors.CommercialRegisterNumber"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('CommercialRegisterNumber')"
          class="mb-4"
        />
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('MunicipalLicenseNumber') }}
        </p>
        <v-text-field
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.MunicipalLicenseNumber"
          :error-messages="errors.MunicipalLicenseNumber"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('MunicipalLicenseNumber')"
          class="mb-4"
        />
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('attach') }}
        </p>
        <v-file-input
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.attachment"
          :rules="[rules.file]"
          class="mb-4"
          prepend-icon="mdi-paperclip"

          :placeholder="$t('attach')"
          dense
          show-size
          :error-messages="errors.attachment"
          multiple
          :loading="signupLoading"
          outlined
          hide-details="auto"
        ></v-file-input>
        <p v-if="formRecord.type === 'Merchant'" class="text-14 mb-1">
          {{ $t('Details') }}
        </p>
        <v-textarea
          v-if="formRecord.type === 'Merchant'"
          v-model="signRecord.Details"
          :loading="signupLoading"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('Details')"
          class="mb-4"
        />
        <div class="mb-1 d-flex justify-center">
          <p
            v-if="
              formRecord.type === 'Merchant' &&
              error == false &&
              finish === true
            "
            class="text-14 mb-1 green--text"
          >
            {{ successText }}
          </p>
          <p
            v-if="
              formRecord.type === 'Merchant' &&
              finish == false &&
              error === true
            "
            class="text-14 mb-1 red--text"
          >
            {{ errorText }}
          </p>
        </div>

        <v-btn
          block
          :loading="signupLoading"
          color="primary"
          class="text-capitalize font-600"
          @click="signup"
        >
          {{ $t('Sign Up') }}
        </v-btn>
        <div class="text-14 text-center my-3">
          {{ $t('Already have an account?') }}
          <a class="" @click="formState = 'sign in'; restShowPassword()">
            {{ $t('Log In') }}
          </a>
        </div>
      </div>
    </base-card>
    <base-card v-if="formState === 'validate'">
      <div class="px-3 px-md-10 py-8">
        <h3 class="mb-2 text-center">
          {{ $t('Welcome To Ajzal Ecommerce') }}
        </h3>
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">
          {{ $t('Write the code sent to your mobile') }}
        </h5>
        <ul
          v-if="Object.keys(errors).length > 0"
          class="error--text text--darken-2"
        >
          <li v-for="(error, index) in Object.keys(errors)" :key="index">
            {{ error }}
            <ul v-if="errors[error].length > 0" class="error--text">
              <li v-for="(spcErr, i) in errors[error]" :key="i">
                {{ spcErr }}
              </li>
            </ul>
          </li>
        </ul>
        <p class="text-14 mb-1">
          {{ $t('Code') }}
        </p>
        <v-text-field
          v-model="ValidationCode"
          outlined
          dense
          hide-details="auto"
          :placeholder="$t('Code 4 digits')"
          class="mb-4"
          :loading="validateLoading"
        />
        <v-btn
          :loading="validateLoading"
          block
          color="primary"
          class="text-capitalize font-600"
          @click="validate"
        >
          {{ $t('Confirm') }}
        </v-btn>
        <div class="text-14 text-center my-3">
          {{ $t("Didn't receive a code ?") }}
          <a class="" @click="resendCode">
            {{ $t('Resend Code') }}
          </a>
        </div>
        <div class="text-14 text-center my-3">
          {{ $t("Don't want to validate?") }}
          <a class="" @click="cancelUser">
            {{ $t('Log In') }}
          </a>
        </div>
      </div>
    </base-card>
    <base-card v-if="formState === 'forget password'">
      <reset-password 
        formType="phone"
        @login="() => formState = 'sign in'"
      />
    </base-card>
  </v-dialog>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import VuePhoneNumberInput from 'vue-phone-number-input'
import ResetPassword from './ResetPassword.vue'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
export default {
  components: { VuePhoneNumberInput, ResetPassword },
  data() {
    return {
      formState: 'sign in',
      loginLoading: false,
      error: false,
      finish: false,
      rules: {
        file: (v) => (
          !v || v.some(file => file.size / 1024 / 1024 < 2) || this.$t('attachSize')),
      },
      errorText: this.$i18n.t('merchantRequestErrors'),
      successText: this.$i18n.t('merchantRequestSuccess'),
      signupLoading: false,
      validateLoading: false,
      showPassIcon: 'mdi-eye',
      inputType: 'password',
      forgetLoading: false,
      errors: {},
      signRecord: {
        name: null,
        phone: null,
        email: null,
        password: null,
        CompanyName: null,
        Address: null,
        Activity: null,
        RequestType: null,
        Country: null,
        attachment: null,
        Region: null,
        TaxNumber: null,
        City: null,
        CommercialRegisterNumber: null,
        MunicipalLicenseNumber: null,
        Details: null,
      },
      isPhoneValid: true,
      formRecord: {
        phone: null,
        password: null,
        type: 'User',
      },
      forgetRecord: {
        email: null,
      },
      LoginPhone: '',
      SignPhone: '',
      ValidationCode: null,
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
    ...mapGetters([
      'loginDialog',
      'getCountries',
      'getRegion',
      'getCities',
      'getRequestType',
    ]),
  },
  watch: {
    loginDialog(v) {
      if (v) {
        this.getFormState()
        this.fetchCountries()
        this.fetchRequestType()
      } else {
        this.resetForm()
      }
    },
    formState() {
      this.errors = {}
    },
  },
  mounted() {
    // this.fetchCountries()
    // this.fetchRequestType()
  },
  methods: {
    ...mapMutations(['setLoginDialog']),
    ...mapActions([
      'fetchCountries',
      'fetchRegion',
      'fetchCities',
      'fetchRequestType',
    ]),
    log(){
    },
    signup() {
      if (this.formRecord.type === 'User') {
        const user = localStorage.getItem('user')
        if (user) {
          this.formState = 'validate'
          this.resendCode()
          return
        }
        if (
          !this.signRecord.name ||
          !this.signRecord.phone ||
          !this.signRecord.email ||
          !this.signRecord.password
        )
          return
        this.signupLoading = true

        const formdata = new FormData()
        formdata.append('name', this.signRecord.name)
        formdata.append('phone', this.signRecord.phone)
        formdata.append('email', this.signRecord.email)
        formdata.append('password', this.signRecord.password)

        this.$axios
          .$post('auth/register', formdata)
          .then((res) => {
            this.completeLogin(res.model.role, res.model.user, res.model.tokens)
            this.formState = 'validate'
          })
          .catch((e) => {
            this.errors = e.response.data.errors
          })
          .finally(() => {
            this.signupLoading = false
          })
      }

      if (this.formRecord.type == 'Merchant') {
        if (
          !this.signRecord.name ||
          !this.signRecord.phone ||
          !this.signRecord.email
        )
          return

        this.signupLoading = true

        const Mformdata = new FormData()
        Mformdata.append('Name', this.signRecord.name)
        Mformdata.append('Phone', this.signRecord.phone)
        Mformdata.append('Email', this.signRecord.email)
        Mformdata.append('CompanyName', this.signRecord.CompanyName)
        Mformdata.append('Address', this.signRecord.Address)
        Mformdata.append('Activity', this.signRecord.Activity)
        Mformdata.append('CountryId', this.signRecord.Country)
        Mformdata.append('RegionId', this.signRecord.Region)
        Mformdata.append('CityId', this.signRecord.City)
        if (this.signRecord.attachment) {
          for (let i = 0; i < this.signRecord.attachment.length; i++) {
            Mformdata.append('Attachments', this.signRecord.attachment[i])
          }
        }

        Mformdata.append('Details', this.signRecord.Details)
        Mformdata.append('RequestTypeId', this.signRecord.RequestType)
        Mformdata.append(
          'CommercialRegisterNumber',
          this.signRecord.CommercialRegisterNumber
        )
        Mformdata.append('TaxNumber', this.signRecord.TaxNumber)
        Mformdata.append(
          'MunicipalLicenseNumber',
          this.signRecord.MunicipalLicenseNumber
        )

        this.$axios
          .$post('merchants/create-request', Mformdata)
          .then((res) => {
            if (res.statusCode == 201 || res.success == true) {
              this.finish = true
              this.error = false
              setTimeout(() => {
              this.$store.commit('setLoginDialog', false)
              this.$notifier.showMessage({
                content: this.$i18n.t('merchantRequestSuccess'),
              })
            }, 2000)
            }
          })
          .catch((e) => {
            if (e.name == 'AxiosError' || e) {
              this.error = true
              this.finish = false
            }
            this.errors = e.response.data.errors
          })
          .finally(() => {
            this.signupLoading = false

          })
      }
    },
    showPassword() {
      this.inputType === 'password'?
      this.inputType = 'text' :
      this.inputType = 'password';
      this.showPassIcon === 'mdi-eye' ?
      this.showPassIcon = 'mdi-eye-off':
      this.showPassIcon = 'mdi-eye'
    },
    restShowPassword() {
      this.inputType = 'password';
      this.showPassIcon = 'mdi-eye'
    },
    login() {
      if (!this.formRecord.phone || !this.formRecord.password) return
      this.loginLoading = true
      const formdata = new FormData()
      formdata.append('phone', this.formRecord.phone)
      formdata.append('password', this.formRecord.password)
      formdata.append('type', this.formRecord.type)
      this.$axios
        .$post('auth/signin', formdata)
        .then((res) => {
          this.completeLogin(res.model.role, res.model.user, res.model.tokens)
        })
        .catch((e) => {
          if (e.response.data.errors) {
            this.errors = e.response.data.errors
          } else {
            this.errors = { Phone: [e.response.data.message] }
          }
        })
        .finally(() => {
          this.loginLoading = false
        })
    },

    async completeLogin(role, user, tokens) {
      this.$notifier.showMessage({
        content: this.$i18n.t('Logged in successfully'),
      })
      this.$store.commit('setUser', user)
      if(!tokens) return;
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken))
      this.$store.commit('setRole', role)
      this.$store.dispatch('getProducts')
      this.$store.commit('setLoginDialog', false)
      this.$store.commit('setSignedIn', true)
      await this.$store.dispatch('getCarts')
    },
    validate() {
      if (!this.ValidationCode) return
      this.validateLoading = true
      let user = localStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        const formData = new FormData()
        formData.append('phone', user.phone)
        formData.append('otp', this.ValidationCode)
        this.$axios
          .$post('auth/verify-phone', formData)
          .then((res) => {
            this.completeLogin(res.model.role, res.model.user, res.model.tokens)
          })
          .finally(() => (this.validateLoading = false))
      }
    },
    resendCode() {
      let user = localStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        const formData = new FormData()
        const eformData = new FormData()
        // phone resend
        formData.append('phone', user.phone)
        formData.append('type', 'phone')
        this.$axios.$post('auth/pe/resend-otp', formData)
        // email resend
        eformData.append('email', user.email)
        eformData.append('type', 'email')
        this.$axios.$post('auth/pe/resend-otp', eformData)
      }
    },
    forgetPassword() {
      this.resetForm()
    },
    a2e(s) {
      if(s)
      return s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      return '';
    },
    validateNumberSignUp(e) {
      this.isPhoneValid = e.isValid
      this.disablePhoneButton = this.isPhoneValid
      this.signRecord.phone = this.a2e(e.countryCallingCode + e.phoneNumber)
    },
    validateNumberLogIn(e) {
      this.isPhoneValid = e.isValid
      this.disablePhoneButton = this.isPhoneValid
      this.formRecord.phone = this.a2e(e.countryCallingCode + e.phoneNumber)
    },
    cancelUser() {
      this.$store.commit('setUser', null)
      this.resetForm()
    },
    getFormState() {
      const user = localStorage.getItem('user')
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        this.$store.commit('setLoginDialog', false)
        return
      }
      if (!accessToken && user) {
        this.resendCode()
        this.formState = 'validate'
      }
    },
    resetForm() {
      this.formState = 'sign in'
      this.signRecord = {
        name: null,
        phone: null,
        email: null,
        password: null,
        CompanyName: null,
        Address: null,
        Activity: null,
        RequestType: null,
        Country: null,
        Region: null,
        TaxNumber: null,
        City: null,
        attachment: null,
        CommercialRegisterNumber: null,
        MunicipalLicenseNumber: null,
        Details: null,
      }
      this.formRecord = {
        phone: null,
        password: null,
        type: 'User',
      }
      this.isPhoneValid = true
      this.LoginPhone = ''
      this.SignPhone = ''
      this.ValidationCode = null
    },

    setDialog(event) {
      this.$store.commit('setLoginDialog', event)
    },
    more() {
      this.fetchCountries()
    },
  },
}
</script>
