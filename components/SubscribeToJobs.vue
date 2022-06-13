<template>
  <form
    v-show="!subscribed"
    ref="subscribe"
    method="POST"
    name="subscribe"
    data-netlify
    data-netlify-honeypot="bot-field"
    class="sticky-sm"
  >
    <input type="hidden" name="form-name" value="subscribe" />

    <v-banner
      app
      rounded
      sticky
      color="deep-orange darken-1"
      class="white--text"
    >
      <!-- <p class="body-1 pb-0 mb-0 d-flex align-center justify-center">
        Get a <v-select in label="daily"></v-select> email of the best cannabis
        lab jobs in
        <v-autocomplete color="white" label="Location"></v-autocomplete>
        <v-text-field label="Email"></v-text-field>
      </p> -->
      <p class="body-1 pb-0 mb-0">
        <!-- Get the latest jobs, articles and discussions straight to your inbox -->
        Get the latest cannabis lab jobs straight to your inbox
      </p>
      <!-- <template #icon>
        <v-icon class="" color="white" dark>mdi-email-plus</v-icon>
      </template> -->
      <template #actions class="">
        <v-text-field
          v-model="subscribeToJobsEmail"
          prepend-inner-icon="mdi-email"
          filled
          rounded
          required
          class="pa-0 ma-0 white"
          placeholder="Email"
          hide-details
          name="email"
          type="email"
          dense
        />
        <v-text-field
          v-model="subscribeToJobsLocation"
          prepend-inner-icon="mdi-pin"
          filled
          rounded
          required
          class="pa-0 my-0 mx-2 white"
          placeholder="Location"
          hide-details
          name="location"
          dense
        />

        <v-btn
          type="submit"
          dark
          color="deep-purple accent-4"
          :disabled="subscribeToJobsEmail === ''"
          @click.prevent="submitSubscribe($event)"
        >
          Subscribe
        </v-btn>
      </template>
    </v-banner>
  </form>
</template>

<script>
export default {
  data() {
    return {
      subscribeToJobsEmail: '',
      subscribeToJobsLocation: '',
      subscribed: false,
    }
  },

  methods: {
    submitSubscribe(event) {
      // console.log('submitSubscribe', this.subscribeToJobsEmail)
      this.loading = true
      this.$fire.firestore
        .collection('subscribers')
        .add({
          email: this.subscribeToJobsEmail,
          location: this.subscribeToJobsLocation,
          url: this.$route.path,
          created: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          this.loading = false
          this.subscribed = true
          this.subscribeToJobsEmail = ''
          this.subscribeToJobsLocation = ''
        })
        .catch((error) => {
          this.loading = false
          console.error('Error adding document: ', error) // eslint-disable-line no-console
        })

      const form = this.$refs.subscribe
      form.submit()
    },
  },
}
</script>
