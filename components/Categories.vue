<template>
  <div>
    <div v-for="(category, index) in categories" :key="index">
      <div class="d-flex flex-column">
        <nuxt-link
          v-if="category.subCategories.length == 0"
          :to="localePath({ name: 'products', query: { categoryid: category.id } })"
          class="px-6 py-2 text-decoration-none home-two-sidebar-link"
        >
          <v-avatar size="24" tile class="me-3">
            <img
              v-if="category.imageUrl"
              class="icon mr-2"
              :src="category.imageUrl"
              alt=""
            />
            <v-icon v-else>mdi-shape</v-icon>
          </v-avatar>
          <span class="font-600">{{ category.name }}</span>
        </nuxt-link>
      </div>
      <template v-if="category.subCategories.length">
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="d-flex align-center">
                <v-avatar size="24" tile class="me-3">
                  <img
                    v-if="category.imageUrl"
                    class="icon mr-2"
                    :src="category.imageUrl"
                    alt=""
                  />
                  <v-icon v-else>mdi-shape</v-icon>
                </v-avatar>
                <span class="font-600">{{ category.name }}</span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mb-2">
                <nuxt-link
                  :to="
                    localePath({
                      name: 'products',
                      query: { categoryid: category.id },
                    })
                  "
                  class="px-6 py-2 text-decoration-none home-two-sidebar-link"
                >
                  <v-avatar size="24" tile class="me-3">
                    <img
                      v-if="category.imageUrl"
                      class="icon mr-2"
                      :src="category.imageUrl"
                      alt=""
                    />
                    <v-icon v-else>mdi-shape</v-icon>
                  </v-avatar>
                  <span>{{ $t("All") }} {{ category.name }}</span>
                </nuxt-link>
              </div>
              <categories :categories="category.subCategories" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: { categories: { type: Array, default: () => [] } },
};
</script>
<style lang="scss" scoped>
.home-two-sidebar-link {
  color: rgb(75, 86, 107);
  &:hover {
    color: #d23f57;
  }
}
</style>
