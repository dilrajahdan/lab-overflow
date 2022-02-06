<template>
  <section class="section">
    <v-card
      color="deep-purple"
      dark
      tile
      class="d-flex align-center flex-column py-3"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="10"
            offset-sm="1"
            md="8"
            offset-md="0"
            lg="6"
            xl="4"
            class=""
          >
            <v-card-title class="display-1">Post a job</v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card tile class="d-flex align-center flex-column py-3">
      <v-container>
        <v-row>
          <v-col>
            <v-stepper v-model="formStepper">
              <v-stepper-header>
                <v-stepper-step :complete="formStepper > 1" step="1">
                  Name of step 1
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="formStepper > 2" step="2">
                  Name of step 2
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Name of step 3 </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-12" color="grey lighten-4">
                    <v-card-title>Jobs details</v-card-title>
                    <v-card-text>
                      <v-form ref="form" v-model="jobForm" lazy-validation>
                        <v-text-field
                          v-model="job.title"
                          label="Job title"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="job.description"
                          label="Job description"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="job.location"
                          label="Job location"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="job.salary"
                          label="Job salary"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="job.email"
                          label="Contact email"
                          required
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                  </v-card>

                  <v-btn color="primary" @click="formStepper = 2">
                    Continue
                  </v-btn>

                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-12" color="grey lighten-1"
                    ><v-card-title>Confirm</v-card-title>
                    <v-card-text>Job: {{ job }}</v-card-text>
                  </v-card>

                  <v-btn color="primary" @click="loadStripe()">
                    Continue
                  </v-btn>

                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card class="mb-12" color="grey lighten-1"
                    ><v-card-title>Pay</v-card-title>
                    <form id="payment-form">
                      <!-- <input
                        id="email"
                        type="text"
                        placeholder="Enter email address"
                      /> -->
                      <div id="payment-element">
                        <!--Stripe.js injects the Payment Element-->
                      </div>

                      <button id="submit">
                        <div id="spinner" class="spinner hidden"></div>
                        <span id="button-text">Pay now</span>
                      </button>

                      <div id="payment-message" class="hidden"></div>
                    </form>
                  </v-card>

                  <v-btn color="primary" @click="formStepper = 1">
                    Continue
                  </v-btn>

                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
import Stripe from 'stripe'

export default {
  data() {
    return {
      formStepper: 1,
      jobForm: null,
      job: {
        title: '',
        description: '',
        location: '',
        salary: '',
        email: '',
      },
      loading: false,
      elements: null,
      items: [{ id: 'xl-tshirt' }],
      stripe: Stripe('pk_test_mWF4dQC0ElTGLo2j8wV4beS7'),
      e1: 1,
    }
  },
  mounted() {},
  methods: {
    loadStripe() {
      this.initialize()
      this.formStepper = 3
    },

    async initialize() {
      const items = this.items
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const { clientSecret } = await response.json()

      const appearance = {
        theme: 'night',
      }
      this.elements = this.stripe.elements({ appearance, clientSecret })

      const paymentElement = this.elements.create('payment')
      paymentElement.mount('#payment-element')
    },

    async handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      const elements = this.stripe.elements()

      const { error } = await this.stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: 'http://localhost:4242/checkout.html',
          // receipt_email: document.getElementById('email'),
          // receipt_email: this.$refs.job.email.value,
        },
      })

      console.log(error)
    },
  },
}
</script>
