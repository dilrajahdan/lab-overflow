<template>
  <section>
    <v-card
      color="deep-purple"
      dark
      tile
      class="d-flex align-center flex-column py-3"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="8" offset-md="0" lg="6" xl="4" class="">
            <v-card-title>
              <h1 class="overline">Post a job</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">Thank you</h2>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card v-if="status === 'succeeded'">
            <v-card-title>
              <h1 class="headline">Success!</h1>
            </v-card-title>
            <v-card-subtitle>
              <p class="body-1">
                Payment succeeded! Your job has been posted to our job board.
              </p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer />
              <v-btn color="secondary" href="/">View job post</v-btn>
              <v-btn color="primary" href="/">Share job post</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else-if="status === 'processing'">
            <v-card-title class="mb-2">
              <h1 class="headline">Processing!</h1>
            </v-card-title>
            <v-card-subtitle>
              <p>Payment processing! Thank you for your patience.</p>
            </v-card-subtitle>
            <v-card-text class="d-flexX align-centerX">
              <v-progress-circular
                :size="50"
                :width="7"
                color=""
                indeterminate
              ></v-progress-circular>
            </v-card-text>
          </v-card>
          <v-card v-else-if="status === 'requires_payment_method'">
            <v-card-title class="headline">
              <h1>Hmmm... Something went wrong!</h1>
            </v-card-title>
            <v-card-subtitle>
              <p>Please try again.</p>
            </v-card-subtitle>
            <v-card-actions class="d-flexX align-centerX">
              <v-btn color="primary" href="/post-a-job">Try again</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title class="headline">
              <h1>Something went wrong!</h1>
            </v-card-title>
            <v-card-subtitle>
              <p>Please try again.</p>
            </v-card-subtitle>
            <v-card-actions class="d-flexX align-centerX">
              <v-btn color="primary" href="/post-a-job">Try again</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      status: 'processing',
    }
  },
  mounted() {
    this.status = this.$router.currentRoute.query.redirect_status
    // console.table(this.$router.currentRoute.query)
  },
}
// }
</script>
