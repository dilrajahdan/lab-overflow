<template>
  <v-row justify="center" align="center" class="mt-6">
    <v-col cols="12" sm="8" md="6">
      <!-- <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card> -->
      <v-card>
        <v-card-title class="headline">
          The Cannabis Testing Forum for Lab Professionals
        </v-card-title>
        <v-card-text>
          <p>
            Talk anonymously with other professionals to improve your methods
          </p>
          <p>Connect with other Labs and industry professionals</p>
          <p>Find reliable suppliers</p>
          <p>Power up you next carear move</p>

          <hr class="my-3" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/cannabis-testing-labs">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
