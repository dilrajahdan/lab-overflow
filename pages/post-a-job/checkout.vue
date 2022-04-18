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
              <h2 class="display-1">Checkout</h2>
            </v-card-subtitle>
            <!-- <v-card-text
              >Enter your payment details to post your job</v-card-text
            > -->
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <!-- <live-preview :job="job"></live-preview> -->

          <v-card>
            <v-card-title class="d-flex align-end justify-space-between">
              Basket
            </v-card-title>
            <!-- job: {{ job }} -->

            <!-- <v-card-text> -->
            <!-- <v-divider></v-divider> -->
            <v-list color="" class="mt-0 pt-0">
              <v-list-item>
                <!-- <v-list-item-avatar>
                  <v-icon dark>mdi-check-outline </v-icon>
                </v-list-item-avatar> -->

                <v-list-item-content>
                  <v-list-item-title>Job post - 1 month</v-list-item-title>

                  <v-list-item-subtitle
                    >12 Feb 2022 - 12 March 2022</v-list-item-subtitle
                  >
                  <!-- job: {{ job }} -->
                  <v-list-item-subtitle>
                    <!-- <v-chip
                      color="primary"
                      text-color="white"
                      class="d-flex align-center justify-center"
                    > -->
                    {{ job.position }} @ {{ job.labName }}
                    <!-- </v-chip> -->
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action> USD $199 </v-list-item-action>
              </v-list-item>
            </v-list>
            <!-- </v-card-text> -->
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title class=""> Payment details </v-card-title>
            <!-- <v-divider></v-divider> -->

            <v-card-text>
              <form id="payment-form">
                <div id="payment-element">
                  <!--Stripe.js injects the Payment Element-->
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </div>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn text to="/post-a-job"> Back </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                color="red white--text"
                @click.prevent.stop="handleSubmit()"
              >
                Pay Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// import LivePreview from '~/components/LivePreview.vue'
export default {
  //   components: { LivePreview },
  asyncData(context) {
    // get jobAd from store
    const jobAd = context.store.state.jobAd
    return {
      job: jobAd,
    }
  },
  data() {
    return {
      loading: false,
      elements: null,
      stripe: null,
      items: [{ id: 'job-post-1-month' }],
    }
  },

  mounted() {
    this.loadStripe()
  },

  methods: {
    async loadStripe() {
      this.stripe = await Stripe(`${process.env.STRIPE_PK}`) // eslint-disable-line no-undef
      this.initialize()
    },

    async initialize() {
      await this.$store.dispatch('createPaymentIntent')

      const clientSecret = await this.$store.getters.clientSecret

      const appearance = {
        theme: 'stripe',
      }

      this.elements = this.stripe.elements({ appearance, clientSecret })

      const paymentElement = this.elements.create('payment')
      paymentElement.mount('#payment-element')
    },

    async handleSubmit(e) {
      this.loading = true

      //   console.warn('EMAIL', this.job.companyEmail) // eslint-disable-line no-console

      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${process.env.baseURL}/post-a-job/thank-you`,
          receipt_email: this.job.companyEmail,
        },
      })

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === 'card_error' || error.type === 'validation_error') {
        console.warn(error.message)
      } else {
        console.error('An unexpected error occured.')
      }

      this.loading = false
    },
  },
}
</script>
