<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn icon color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-lead-pencil</v-icon>
      </v-btn>
    </template>
    <v-container class="py-6 white">
      <v-row>
        <v-col cols="12">
          <v-avatar tile size="25" class="me-3">
            <img src="@/assets/images/icons/pin_filled.svg" alt="" />
          </v-avatar>
          <span class="text-h5 mb-0">{{ $t('Edit Address') }}</span>
        </v-col>
        <v-col v-if="Object.keys(errors).length > 0" cols="12">
          <ul class="error--text text--darken-2">
            <li v-for="(error, index) in Object.keys(errors)" :key="index">
              {{ error }}
              <ul v-if="errors[error].length > 0" class="error--text">
                <li v-for="(spcErr, i) in errors[error]" :key="i">
                  {{ spcErr }}
                </li>
              </ul>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <p class="text-14 mb-1">{{ $t('Name') }}</p>
          <v-text-field
            v-model="formRecord.name"
            outlined
            dense
            hide-details="auto"
            :placeholder="$t('Name')"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <p class="text-14 mb-1">{{ $t('Street') }}</p>
          <v-text-field
            v-model="formRecord.street"
            outlined
            dense
            hide-details="auto"
            :placeholder="$t('Street')"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <p class="text-14 mb-1">{{ $t('Building Number') }}</p>
          <v-text-field
            v-model="formRecord.buildingNumber"
            outlined
            dense
            hide-details="auto"
            type="number"
            :placeholder="$t('Building Number')"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <p class="text-14 mb-1">{{ $t('Floor') }}</p>
          <v-text-field
            v-model="formRecord.floor"
            outlined
            dense
            hide-details="auto"
            type="number"
            :placeholder="$t('Floor')"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <p class="text-14 mb-1">{{ $t('Building Type') }}</p>
          <v-select v-model="apartmentType" dense outlined hide-details="auto" :items="apartmentTypes" item-text="name" item-value="value" />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <p class="text-14 mb-1">{{ $t('Landmark') }}</p>
          <v-text-field
            v-model="formRecord.landmark"
            outlined
            dense
            hide-details="auto"
            :placeholder="$t('Landmark')"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <p class="text-14 mb-1">{{ apartmentType == 'office' ? $t('Office') : $t('Apartment Number') }}</p>
          <v-text-field
            v-model="formRecord.apartment"
            outlined
            dense
            hide-details="auto"
            :placeholder="apartmentType == 'office' ? $t('Office') : $t('Apartment Number')"
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" class="font-600 text-capitalize" :loading="loading" @click="save">
            {{ $t('Save') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  props: {
    item: {type: Object, default: () => {}}
  },
  data() {
    return {
      dialog: false,
      loading: false,
      apartmentTypes: [
        {name: this.$i18n.t("Office"), value: "office"},
        {name: this.$i18n.t("Apartment"), value: "apartmentNumber"},
      ],
      apartmentType: 'apartmentNumber',
      formRecord: {},
      errors: {},
    }
  },
  head: {
    title: 'Add Address',
  },
  watch: {
    dialog(v) {
      if (v) {
        const record = {...this.item}
        if (record.apartmentNumber) {
          this.apartmentType = 'apartmentNumber'
          record.apartment = record.apartmentNumber
        }
        if (record.office) {
          this.apartmentType = 'office'
          record.apartment = record.office
        }
        delete record.apartmentNumber
        delete record.office
        this.formRecord = record;
        } else {
          this.errors = {}
          this.formRecord = {}
      }
    },
    apartmentType(v) {
      if (v === 'office' ) {
        this.formRecord.apartmentNumber = '0'
        this.formRecord.apartment = this.item.office
      } else {
        this.formRecord.office = '0'
        this.formRecord.apartment = this.item.apartmentNumber
      }
    }
  },
  methods: {
    save() {
      this.loading = true
      const formData = new FormData()
      Object.keys(this.formRecord).forEach((r) => {
        if (r === 'apartment') {
          formData.append(this.apartmentType, this.formRecord[r])
        } else if (r === 'name') {
          formData.append('name', this.formRecord[r])
          formData.append('nameEn', this.formRecord[r])
          formData.append('nameAr', this.formRecord[r])
        } else {
          formData.append(r, this.formRecord[r])
        }
      })

      this.$axios
        .$put(`addresses/${this.formRecord.id}`, formData)
        .then((r) => {
          this.$emit('success', r.model);
          this.dialog = false;
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
        }).finally(() => (this.loading = false))
    },
  },
}
</script>
