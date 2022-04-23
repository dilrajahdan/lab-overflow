<template>
  <form
    v-show="!subscribed"
    ref="subscribe"
    method="POST"
    name="subscribe"
    data-netlify
    data-netlify-honeypot="bot-field"
    class="sticky-sm"
    action="/thank-you"
  >
    <input type="hidden" name="form-name" value="subscribe" />

    <v-banner
      app
      :single-line="$vuetify.breakpoint.smAndUp"
      rounded
      sticky
      color="deep-orange darken-1"
      class="white--text"
    >
      <p class="body-1 pb-0 mb-0 flex-grow-0">
        Send me awesome cannabis lab jobs here
      </p>
      <template #icon>
        <v-icon class="" color="white" dark>mdi-email-plus</v-icon>
      </template>
      <template #actions class="">
        <v-text-field
          v-model="subscribeToJobsEmail"
          filled
          rounded
          required
          class="pa-0 ma-0 white"
          placeholder="Your email"
          hide-details
          name="email"
          type="email"
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
          url: this.$route.path,
          created: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          this.loading = false
          this.subscribed = true
          this.subscribeToJobsEmail = ''
        })
        .catch((error) => {
          this.loading = false
          console.error('Error adding document: ', error)
        })

      const form = this.$refs.subscribe
      form.submit()
    },
  },
}
</script>
