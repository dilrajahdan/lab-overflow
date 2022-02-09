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
            <v-card-title class="display-1">Post a Job</v-card-title>
            <!-- clientSecret: {{ clientSecret }} <br />
            loading: {{ loading }} <br /> -->
            <!-- elements: {{ elements }} <br />stripe: {{ stripe }} -->
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-card>
            <v-card-title>Why post a job with Lab Overflow?</v-card-title>
            <v-card-text>
              <p>
                We are the only Cannabis focused job board for Laboratory
                Professionals.
              </p>
              <p>
                We are spending all our energy on marketing and SEO so you dont
                have to.
              </p>
              <p>We email your role to our growing list every week</p>
              <p>
                Your role will be posted in the Lab Directory section of the
                site under your labs region
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="9" md="6">
          <v-card>
            <v-card-title>Let's start</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="job.labName"
                hint="Name of laboratory"
                label="Lab name"
                required
              ></v-text-field>

              <v-text-field
                v-model="job.position"
                hint="Job title"
                label="Position"
                required
              ></v-text-field>

              <v-select
                hint=""
                :v-model="1"
                label="Job type"
                :items="['Full-time', 'Part-time', 'Contract/Temp', 'Intern']"
              ></v-select>

              <v-combobox
                v-model="selectedSkills"
                :items="skillsList"
                chips
                clearable
                label="Primary skills/experience"
                hint="Example: HPLC, GC (for Instruments) or Pesticide, Potency (Assay)"
                multiple
              >
                <!-- <template #selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeSkill(item)"
                  >
                    <strong>{{ item }}</strong
                    >&nbsp;
                    <span>(interest)</span>
                  </v-chip>
                </template> -->
              </v-combobox>

              <v-text-field
                v-model="job.location"
                hint="Example: Remote or San Diago, CA, USA"
                label="Location"
                required
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>Job details</v-card-title>
            <v-card-subtitle class="">Salary range</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="job.salaryFrom"
                    v-col
                    type="number"
                    hint="Example: $60K USD"
                    label="Minimum per year"
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="job.salaryTo"
                    v-col
                    type="number"
                    hint="Example: $110K USD"
                    label="Maximum per year"
                    required
                  />
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text>
              <v-textarea
                v-model="job.description"
                label="Job description"
                required
                auto-grow
              ></v-textarea>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>How to apply</v-card-title>

            <v-card-text>
              <v-textarea
                v-model="job.howToApply"
                label="How to apply"
                required
                auto-grow
              ></v-textarea>

              <v-text-field
                v-model="job.applyURL"
                type="url"
                hint="Example: http://www.mylab.com/jobs/123"
                label="Apply URL"
              ></v-text-field>
              or

              <v-text-field
                v-model="job.applyEmail"
                type="email"
                label="Apply email"
                hint="This email is public, the Apply button links to it if you do not supply an Apply URL above."
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>Company</v-card-title>

            <v-card-text>
              <v-text-field
                v-model="job.companyEmail"
                hint="Appears on invoice"
                label="Company email (stays private)"
                required
                auto-grow
              ></v-text-field>

              <v-text-field
                v-model="job.invoiceEmail"
                label="Invoice email (stays private)"
                required
                auto-grow
              ></v-text-field>

              <v-text-field
                v-model="job.invoiceNotes"
                v-card-text
                hint="Appears on invoice"
                label="Invoice notes / PO Number"
                required
                auto-grow
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>Feedback</v-card-title>

            <v-card-text>
              <v-textarea
                v-model="job.feedback"
                hint="This isn't part of the job post."
                label="How could we make this experience better?"
                auto-grow
              ></v-textarea>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-card color="yellow buy-footer">
      <v-container>
        <v-row align="center">
          <v-col>
            <v-card> <v-card-text>LIVE PREVIEW</v-card-text> </v-card>
          </v-col>
          <v-col class="flex-grow-0"
            ><v-btn color="red" class="white--text"
              >Start Hiring – $199</v-btn
            ></v-col
          >
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
                      <!-- 
                      <button id="submit">
                        <div id="spinner" class="spinner hidden"></div>
                        <span id="button-text">Pay now</span>
                      </button>

                      <div id="payment-message" class="hidden"></div> -->
                    </form>
                  </v-card>

                  <v-btn
                    id="button-text"
                    color="primary"
                    @click.prevent.stop="handleSubmit()"
                  >
                    Pay Now
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
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_PK)

export default {
  data() {
    return {
      skillsList: [
        'Programming',
        'Playing video games',
        'Watching movies',
        'Sleeping',
      ],
      selectedSkills: ['Streaming', 'Eating'],

      clientSecret: null,
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
      stripe: null,
    }
  },
  mounted() {},
  methods: {
    async loadStripe() {
      this.stripe = await Stripe(process.env.STRIPE_PK) // eslint-disable-line no-undef
      // this.$store.dispatch('createPaymentIntent')
      this.initialize()
      this.formStepper = 3
    },

    async initialize() {
      // const items = this.items
      // const response = await fetch(
      //   '/.netlify/functions/create-payment-intent',
      //   {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ items }),
      //   }
      // )
      // const { clientSecret } = await response.json()
      await this.$store.dispatch('createPaymentIntent')

      const clientSecret = this.$store.getters.clientSecret

      const appearance = {
        theme: 'stripe',
      }

      this.elements = this.stripe.elements({ appearance, clientSecret })

      const paymentElement = this.elements.create('payment')
      paymentElement.mount('#payment-element')
    },

    async handleSubmit(e) {
      // e.preventDefault()
      this.loading = true
      // const elements = this.elements

      console.warn('EMAIL', this.job.email) // eslint-disable-line no-console

      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: 'http://localhost:8888/post-job-success',
          // receipt_email: document.getElementById('email'),
          receipt_email: this.job.email,
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

    removeSkill(item) {
      this.selectedSkills.splice(this.selectedSkills.indexOf(item), 1)
      this.selectedSkills = [...this.selectedSkills]
    },
  },
}
</script>

<style lang="scss">
.buy-footer {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
}
</style>
