<template>
  <v-container>
    <v-row align="center">
      <v-col cols="8" md="8" class="text-body-2 text-md-h4 font-weight-bold">
        {{ $t('Our Projects') }}
      </v-col>
      <v-col cols="4" md="4" class="text-end">
        <v-btn text to="#">
          <span class="text-body-2 text-md-h5 font-weight-bold">
            {{ $t('More') }}
          </span>
        </v-btn>
      </v-col>
      <v-col xs="12" md="12" class="text-center">
        <v-row>
          <v-col xs="12" sm="12" md="4">
            <v-img
              :src="require('@/assets/ajzal/placeholder_article.svg')"
            />
            <v-btn plain>
              project name
            </v-btn>
          </v-col>
          <v-col xs="12" sm="12" md="8">
            <v-row>
              <v-col v-for="item in 4" :key="item" xs="12" sm="6" md="6">
                <v-img
                  :src="require('@/assets/ajzal/placeholder_article.svg')"
                  contain
                />
                <v-btn
                  plain
                >
                  project name
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
