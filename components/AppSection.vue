<template>
  <v-container class="mb-8">
    <v-card max-width="80%" class="mx-auto" color="#EBEAE4">
      <v-row dense no-gutters>
        <v-col  xs="12" md="8" class="text-center px-5 py-2" align-self="center">
          <b class="text-md-h2 text-h6">{{ $t('Download Our App Now') }}</b>
          <br />
          <v-row class="my-2">
            <v-col xs="12" md="6">
              <v-row dense no-gutters class="black white--text rounded">
                <v-col cols="8" class="text-body-2 text-md-h5" align-self="center">
                  {{ $t('Download On') }}
                </v-col>
                <v-col cols="3">
                  <v-icon size="60" color="white">mdi-google-play</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row dense no-gutters class="black white--text rounded">
                <v-col cols="8" class="text-body-2 text-md-h5"   align-self="center">
                  {{ $t('Download On') }}
                </v-col>
                <v-col cols="3">
                  <v-icon size="60" color="white">mdi-apple-ios</v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col xs="12" md="4">
          <v-img
            height="200"
            position="relative"
            :src="require('@/assets/ajzal/app.png')"
            contain
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
