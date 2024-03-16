<template>
  <v-dialog v-model="dialog">
    <template #activator="{ on, attrs }">
      <v-btn
        outlined
        color="primary"
        class="text-capitalize font-600"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t("Edit Profile") }}
      </v-btn>
    </template>
    <v-container fluid class="white">
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between flex-wrap mb-5">
            <div class="d-flex align-center">
              <v-avatar tile size="25" class="me-3">
                <img src="@/assets/images/icons/user_filled.svg" alt="" />
              </v-avatar>
              <h2 class="mb-0">{{ $t("Edit Profile") }}</h2>
            </div>
          </div>
        </v-col>
        <v-col cols="12" align="center">
          <v-avatar size="150">
            <img src="@/assets/images/faces/ralph.png" alt="" />
          </v-avatar>
        </v-col>
        <v-col cols="12">
          <base-card>
            <div class="pa-5">
              <v-row>
                <v-col cols="12" lg="6">
                  <p class="text-14 mb-1">First Name</p>
                  <v-text-field outlined dense hide-details="auto" />
                </v-col>
                <v-col cols="12" lg="6">
                  <p class="text-14 mb-1">Last Name</p>
                  <v-text-field outlined dense hide-details="auto" />
                </v-col>
                <v-col cols="12" lg="6">
                  <p class="text-14 mb-1">Email</p>
                  <v-text-field outlined dense hide-details="auto" />
                </v-col>
                <v-col cols="12" lg="6">
                  <p class="text-14 mb-1">Phone</p>
                  <v-text-field outlined dense hide-details="auto" />
                </v-col>
                <v-col cols="12" lg="6">
                  <p class="text-14 mb-1">Birth Date</p>
                  <v-text-field type="date" outlined dense hide-details="auto" />
                </v-col>
                <v-col cols="12">
                  <v-btn color="primary" class="text-capitalize font-600">
                    Save Changes
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </base-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
import DashbordSidebar from "@/components/DashboardSidebar";
export default {
  components: {
    DashbordSidebar,
  },
  data() {
    return {
      dialog: false,
      isSidebar: false,
      rules: [
        (value) =>
          !value || value.size < 2000000 || "Avatar size should be less than 2 MB!",
      ],
    };
  },
  head: {
    title: "Edit Profile",
  },
};
</script>
