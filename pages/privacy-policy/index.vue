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
                  <v-icon  dark color="blue darken-4 ">mdi-lock-alert-outline</v-icon>
                  <h2 class="mb-0 mx-2">{{ $t('Privacy') }}</h2>
                </div>
              </div>
         <div>
          <v-card  shaped>
            <v-card-title class="d-flex justify-center " >
              <h5 class="font-weight-bold blue--text text--darken-4" >
               {{ $t('ourPrivacy') }}
              </h5>
            </v-card-title>
              <v-responsive :aspect-ratio="16/8">
                <v-card-text v-html="privacy">




                </v-card-text>
              </v-responsive>
            </v-card>
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

      Info: '',
      text:  `<p class=' darken-3 '>سياسة الخصوصية هنا</p>`,

    }
  },
  head: {
    title: 'Privacy policy',
  },

  computed: {
   privacy() {
    return this.Info[0] ? this.Info[0].value : this.text
   }
  },
  watch:{
    privacy (val) {
       console.log(val)
    }
  },
  created() {
    this.getData()

    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getData() {

this.$axios
  .$get('/settings/group/POLICY_SETTING')
  .then((r) => {
  console.log(r.model)
  this.Info = r.model

  })
  .finally(() => (this.loading = false))
},
  },
}
</script>
