<template>
  <v-container>
    <v-row align="center">
      <v-col  cols="8" class="text-body-1 text-md-h4 font-weight-bold">
        {{ $t('News & Articles') }}
      </v-col>
      <v-col  cols="4" class="text-end">
        <v-btn text to="#">
          <span class="text-body-1 text-md-h5 font-weight-bold">
            {{ $t('More') }}
          </span>
        </v-btn>
      </v-col>
      <v-col xs="12" md="12">
        <v-row>
          <v-col
            v-for="item in 3"
            :key="item"
            xs="12" md="3"
          >
            <v-card>
              <v-card-title class="justify-center">
                <v-avatar size="150" rounded>
                  <v-img
                    :src="require('@/assets/ajzal/placeholder_article.svg')" contain
                  />
                </v-avatar>
              </v-card-title>
              <v-card-subtitle class="text-start">Augest 22, 2022</v-card-subtitle>
              <v-card-text>
                <b>{{ $t('Lorem') }}</b>
                <dir class="text-end">
                  <v-btn text color="primary" x-small>
                  {{ $t('More') }}
                </v-btn>
                </dir>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
